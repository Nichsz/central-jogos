/*
 * Modo Concord — só ativa quando o jogo é aberto com ?concord=1
 * (o app Concord abre os jogos assim, dentro de um iframe).
 * Fora do Concord (link direto, hub) NADA muda.
 *
 * O que faz:
 *  1. Esconde o botão de microfone (a conversa fica na call do Concord) e o link "Central".
 *  2. Avisa o Concord quando você cria uma sala (para os amigos da call entrarem com 1 clique).
 *  3. Preenche o apelido com o nome do Concord (?name=...), se o campo estiver vazio.
 *  4. Intrigas da Corte: dispensa a senha da corte (quem está no Concord já foi liberado).
 */
(function () {
  'use strict';
  var params;
  try { params = new URLSearchParams(location.search); } catch (e) { return; }
  if (params.get('concord') !== '1') return;

  // Só conversa com o Concord (nunca com qualquer página que embutir o jogo).
  var ALLOWED_PARENTS = ['https://concord-steel.vercel.app', 'http://localhost:5173'];
  var parentOrigin = params.get('origin') || '';
  var canTalk = window.parent !== window && ALLOWED_PARENTS.indexOf(parentOrigin) !== -1;

  function post(msg) {
    if (!canTalk) return;
    msg.source = 'central-jogos';
    try { window.parent.postMessage(msg, parentOrigin); } catch (e) { /* ignora */ }
  }

  // ---------- 1. Visual: sem microfone próprio e sem "voltar para a Central" ----------
  var st = document.createElement('style');
  st.textContent =
    '#mic,#toggleMicBtn,a[href="../../"]{display:none!important}';
  (document.head || document.documentElement).appendChild(st);

  // ---------- 4. Intrigas da Corte: libera o portão ----------
  if (/\/intrigas-da-corte\//.test(location.pathname) && !params.get('key')) {
    try {
      params.set('key', 'CORTE');
      history.replaceState(null, '', location.pathname + '?' + params.toString() + location.hash);
    } catch (e) { /* ignora */ }
  }

  // ---------- 2. Avisar o Concord quando esta pessoa cria (hospeda) uma sala ----------
  // Os jogos hospedam com um Peer de id "<jogo>-<CÓDIGO>" (os convidados têm "-<uid>" no fim).
  var HOST_ID = /^(truco|vidabr|fechou|intrigas-corte-sala)-([A-Z0-9]{3,10})$/;
  var GAME_BY_PREFIX = {
    'truco': 'truco',
    'vidabr': 'jogo-da-vida-br',
    'fechou': 'fechou-a-conta',
    'intrigas-corte-sala': 'intrigas-da-corte'
  };
  var current = null; // { game, room, peer }

  function wrapPeer() {
    var Orig = window.Peer;
    if (typeof Orig !== 'function' || Orig.__concordWrapped) return;

    function CPeer(id, opts) {
      var p = new Orig(id, opts);
      var m = typeof id === 'string' ? HOST_ID.exec(id) : null;
      if (m) {
        var info = { game: GAME_BY_PREFIX[m[1]], room: m[2], peer: p };
        p.on('open', function () {
          current = info;
          post({ type: 'room', game: info.game, room: info.room });
        });
        var origDestroy = p.destroy;
        p.destroy = function () {
          var r = origDestroy.apply(p, arguments);
          if (current && current.peer === p) {
            current = null;
            // O jogo recria o peer em reconexões: só avisa "fechou" se ninguém reabrir.
            setTimeout(function () { if (!current) post({ type: 'room-closed' }); }, 4000);
          }
          return r;
        };
      }
      return p;
    }
    CPeer.prototype = Orig.prototype;
    for (var k in Orig) { if (Object.prototype.hasOwnProperty.call(Orig, k)) CPeer[k] = Orig[k]; }
    CPeer.__concordWrapped = true;
    window.Peer = CPeer;
  }
  wrapPeer();

  window.addEventListener('pagehide', function () { if (current) post({ type: 'room-closed' }); });

  // ---------- 3. Apelido ----------
  var wanted = (params.get('name') || '').trim();
  function fillName() {
    if (!wanted) return;
    ['nm', 'playerNameInput'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && !el.value) {
        el.value = wanted.slice(0, el.maxLength > 0 ? el.maxLength : 14);
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    fillName();
    // Alguns jogos desenham a tela de entrada depois (render dinâmico).
    var n = 0;
    var mo = new MutationObserver(function () { fillName(); if (++n > 40) mo.disconnect(); });
    mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 15000);
  });

  post({ type: 'ready' });
})();
