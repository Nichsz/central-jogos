# 👑 Intrigas da Corte: Blefe & Influência (Fan-Made Web Project)

> ⚠️ **Aviso Legal / Disclaimer (Projeto Fan-Made Sem Fins Lucrativos)**  
> Este repositório contém um projeto **fan-made, experimental e educacional**, desenvolvido com o auxílio de **IA Generativa** exclusivamente para diversão casual entre amigos.  
> O projeto é inspirado nas mecânicas clássicas do jogo de cartas *Coup* (criado por Rikki Tahta e publicado originalmente pela Indie Boards & Cards / Galápagos Jogos no Brasil). **Não possui qualquer vínculo oficial, comercial ou endosso dos detentores da marca.** Todas as ilustrações vetoriais (SVGs), interface e efeitos sonoros sintéticos foram gerados em código próprio. Se você gosta da mecânica, apoie os criadores adquirindo o jogo físico oficial!

---

## 🎭 Sobre o Projeto

**Intrigas da Corte** é uma aplicação web *Single-File* (`index.html`) que permite jogar partidas rápidas de blefe, dedução e eliminação com amigos diretamente pelo navegador, sem necessidade de instalar aplicativos ou manter um servidor backend dedicado.

### ✨ Principais Funcionalidades
- 🌐 **Salas Online P2P (PeerJS / WebRTC):** Conecte de **2 a 6 jogadores** em redes Wi-Fi diferentes usando apenas um código de 5 letras ou um **Link de Convite Direto**.
- 📹 **Câmera e Chat de Voz na Mesa:** Ligue sua webcam e seu microfone se quiser! O vídeo aparece ao vivo na moldura do seu assento na mesa (com indicador luminoso de quem está falando), perfeito para tentar ler a expressão de blefe dos seus amigos.
- 🤖 **Bots Inteligentes:** Quer testar sozinho ou completar a mesa quando faltar gente? Adicione ou remova Bots na sala de espera com um clique.
- 🎨 **8 Personagens Renascentistas & Cartas Ilustradas em SVG:** Toda a arte dos avatares e das cartas é renderizada em SVG puro dentro do próprio código.
- 😂 **Reações Flutuantes & Crônicas da Corte:** Envie emojis que flutuam sobre o seu assento em tempo real, converse no chat lateral e acompanhe todo o histórico de jogadas e contestações.
- 🔐 **Portão de Acesso Privado:** Tela inicial com palavra-passe da galera (padrão: `CORTE`) e desbloqueio automático quando seus amigos entram pelo seu Link de Convite.

---

## 🚀 Como Jogar com Seus Amigos (GitHub Pages)

1. **Acesse o link do GitHub Pages** deste repositório.
2. Caso peça a senha do Portão da Corte na primeira vez, digite **`CORTE`** (ou entre diretamente pelo Link de Convite enviado pelo anfitrião).
3. Escolha seu **Nome na Corte** e um dos **8 Nobres Ilustrados**.
4. Clique em **"Criar Nova Sala"** (ou em **"Partida Rápida c/ Bots"** para jogar imediatamente).
5. No topo da tela (ou no banner da Sala de Espera), clique no botão verde **"Copiar Link de Convite"** e envie no Discord ou WhatsApp para seus amigos.
6. Quando todos estiverem na sala (e se quiserem, com **Câmera** e **Voz** ativadas no topo), o anfitrião clica em **"Iniciar Partida"**!

---

## 📜 Resumo das Regras e Personagens

Cada jogador inicia a partida com **2 moedas de ouro** e **2 cartas de Influência secretas**. O objetivo é ser o último nobre com pelo menos uma carta de influência ativa.

### Ações Básicas (Qualquer um pode fazer no seu turno)
| Ação | Custo / Efeito | Pode ser bloqueada? |
| :--- | :--- | :--- |
| **Renda** | **+1 moeda** do Tesouro Central | ❌ Não (Ação segura) |
| **Ajuda Externa** | **+2 moedas** do Tesouro Central | 🛡️ Sim, qualquer jogador pode declarar **Duque** para bloquear |
| **Golpe de Estado** | Paga **-7 moedas** para forçar um alvo a perder 1 influência | ❌ Não (Defesa impossível • **Obrigatório com 10+ moedas!**) |

### Os 5 Personagens da Corte (15 Cartas no Baralho — 3 de cada)
> 💡 **Regra de Ouro do Blefe:** No seu turno (ou ao bloquear), você pode declarar **qualquer personagem**, mesmo que não tenha a carta na mão! A ação acontece normalmente a menos que outro jogador clique em **Contestar (Duvidar)**.

| Personagem | Ação no Turno | Habilidade de Bloqueio |
| :--- | :--- | :--- |
| 👑 **Duque** | **Taxar:** Pega **+3 moedas** do Tesouro Central. | Bloqueia a **Ajuda Externa** de qualquer jogador. |
| 🗡️ **Assassino** | **Assassinar:** Paga **-3 moedas** para eliminar 1 influência de um alvo. | *Não bloqueia ações.* |
| 🎭 **Condessa** | *Sem ação ativa de turno.* | Bloqueia uma tentativa de **Assassinato** contra si mesma. |
| 🧭 **Capitão** | **Extorquir:** Rouba até **2 moedas** de outro jogador. | Bloqueia tentativas de roubo de outro **Capitão**. |
| 📜 **Embaixador** | **Trocar c/ a Corte:** Olha 2 cartas do baralho, troca com a mão e devolve 2. | Bloqueia tentativas de roubo de outro **Capitão**. |

### ⚡ Como Funcionam as Contestações (Duvidar)
Sempre que alguém declara usar a ação ou o bloqueio de um personagem:
- **Se ninguém contestar:** A ação ou bloqueio é considerado verdadeiro e prossegue.
- **Se alguém contestar e o jogador ESTAVA BLEFANDO:** A ação/bloqueio falha imediatamente e o blefador perde 1 carta de influência!
- **Se alguém contestar e o jogador DIZIA A VERDADE:** O jogador revela a carta, embaralha-a de volta no Baralho da Corte, compra uma carta nova secreta, e **quem duvidou perde 1 influência**!

---

## 🛠️ Tecnologias Utilizadas
- **HTML5 + Tailwind CSS (CDN):** Interface responsiva para Desktop e Mobile com estética renascentista.
- **JavaScript Vanilla:** Motor completo de regras, estados de reação, trocas do Embaixador e IA dos Bots.
- **PeerJS + WebRTC Nativo:** Sincronização de estado P2P entre navegadores e streaming de vídeo/voz em tempo real sem servidor intermediário de mídia.
- **Web Audio API:** Efeitos sonoros sintetizados em tempo real diretamente pelo navegador (sem arquivos MP3 externos).
