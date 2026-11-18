/*
 * concord-saves.js — vai no repositório dos jogos (central-jogos), junto do concord-embed.js.
 * Só age quando o jogo roda DENTRO do Concord (?concord=1). Fora dele, não faz nada.
 *
 * Uso, no <head> de cada jogo, ANTES do script do próprio jogo:
 *   <script src="../../concord-saves.js" data-game="truco" data-prefixes="truco_"></script>
 *
 *   data-game     id do jogo (o mesmo de GAMES no GamesPanel.jsx)
 *   data-prefixes prefixos das chaves do localStorage que fazem parte do progresso,
 *                 separados por vírgula (ex.: "truco_" ou "vida_br_,abc_")
 *
 * Como funciona:
 *  1. Ao abrir, pede ao Concord o save da conta. Se houver, grava no localStorage e recarrega
 *     a página UMA vez para o jogo já iniciar com o progresso certo.
 *  2. Se a conta ainda não tem save, envia o que já existe neste navegador (migração).
 *  3. Depois, cada mudança nas chaves do progresso é enviada ao Concord (com pequena espera).
 */
(function () {
  var params = new URLSearchParams(location.search);
  if (params.get('concord') !== '1' || window.parent === window) return;

  var script = document.currentScript;
  var GAME = script && script.getAttribute('data-game');
  var PREFIXES = ((script && script.getAttribute('data-prefixes')) || '').split(',').filter(Boolean);
  if (!GAME || !PREFIXES.length) return;

  // Só conversa com o Concord de verdade (nunca com a origem vinda da URL).
  var CONCORD_ORIGINS = ['https://concord-steel.vercel.app', 'http://localhost:5173'];
  var concordOrigin = params.get('origin');
  if (CONCORD_ORIGINS.indexOf(concordOrigin) === -1) return;

  var RELOAD_FLAG = 'concord_saves_loaded_' + GAME;
  var ready = false; // só começa a enviar depois de sincronizar com a conta
  var timer = null;

  function isSaveKey(k) {
    return PREFIXES.some(function (p) { return k.indexOf(p) === 0; });
  }

  function collect() {
    var out = {};
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (isSaveKey(k)) out[k] = localStorage.getItem(k);
    }
    return out;
  }

  function send(now) {
    clearTimeout(timer);
    timer = null;
    window.parent.postMessage({ source: 'central-jogos', type: 'save', game: GAME, data: collect(), now: !!now }, concordOrigin);
  }

  function schedule() {
    if (!ready || timer) return;
    timer = setTimeout(function () { send(false); }, 1000);
  }

  // Intercepta gravações no localStorage para saber quando o progresso muda.
  var _set = Storage.prototype.setItem;
  var _remove = Storage.prototype.removeItem;
  Storage.prototype.setItem = function (k, v) {
    _set.apply(this, arguments);
    if (this === window.localStorage && isSaveKey(String(k))) schedule();
  };
  Storage.prototype.removeItem = function (k) {
    _remove.apply(this, arguments);
    if (this === window.localStorage && isSaveKey(String(k))) schedule();
  };

  window.addEventListener('message', function (e) {
    if (e.origin !== concordOrigin || e.source !== window.parent) return;
    var d = e.data;
    if (!d || d.source !== 'concord') return;

    if (d.type === 'flush') {
      if (ready) send(true);
      return;
    }

    if (d.type === 'save-data' && d.game === GAME) {
      var cloud = d.data;
      if (d.ok && cloud && typeof cloud === 'object') {
        var changed = false;
        Object.keys(cloud).forEach(function (k) {
          if (isSaveKey(k) && typeof cloud[k] === 'string' && localStorage.getItem(k) !== cloud[k]) {
            _set.call(localStorage, k, cloud[k]);
            changed = true;
          }
        });
        // Recarrega uma vez para o jogo ler o progresso da conta ao iniciar.
        if (changed && !sessionStorage.getItem(RELOAD_FLAG)) {
          sessionStorage.setItem(RELOAD_FLAG, '1');
          location.reload();
          return;
        }
      } else if (d.ok && Object.keys(collect()).length) {
        send(true); // conta sem save: sobe o que já existe neste navegador
      }
      ready = true;
    }
  });

  window.addEventListener('pagehide', function () { if (ready) send(true); });

  // Pede o save da conta assim que a página carrega.
  window.parent.postMessage({ source: 'central-jogos', type: 'save-load', game: GAME }, concordOrigin);
})();
