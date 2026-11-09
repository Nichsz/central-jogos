# 🎲 Central de Jogos

Uma sala de jogos feita para jogar com os amigos direto no navegador. Sem instalar nada e sem servidor: é só abrir o link, criar uma sala e mandar o código para a galera.

> ⚠️ **Aviso legal (projeto fan-made, sem fins lucrativos)**
> Este repositório reúne projetos **experimentais e educacionais**, criados com o auxílio de **IA generativa**, só para diversão casual entre amigos. Alguns jogos são inspirados em mecânicas clássicas (por exemplo, *Intrigas da Corte* é inspirado em *Coup*, de Rikki Tahta, publicado pela Indie Boards & Cards / Galápagos Jogos). **Não há vínculo oficial, comercial ou endosso dos detentores das marcas.** Artes, interface e sons foram gerados em código próprio. Se você curte o jogo, apoie os criadores comprando a versão física oficial!

---

## 🕹️ Jogos disponíveis

| Jogo | Resumo | Jogadores | Destaques |
| :--- | :--- | :--- | :--- |
| 👑 [**Intrigas da Corte**](games/intrigas-da-corte/) | Blefe e influência. Engane, desafie e sobreviva na corte. | 2 a 6 | Online, bots, câmera e voz |
| 🃏 [**Truco**](games/truco/) | Duplas, manilha pela vira, sinais secretos e modo caos. | 2x2 ou 2x2x2 (até 6) | Online, bots, voz, modo caos |
| 💼 [**Jogo da Vida BR**](games/jogo-da-vida/) | Empregos, estudos e boletos. Quem chega melhor aos 40? | Solo ou até 4 | Online, bots, carreira, troféus |
| 🍻 [**Fechou a Conta**](games/fechou-a-conta/) | Monte mãos de pôquer, junte amuletos e pague as contas do boteco. | Solo ou até 6 | Co-op ou disputa, chefões, relíquias, troféus |

A página inicial (`index.html`) é o hub com a lista de todos os jogos.

---

## 🚀 Como jogar com os amigos

1. Abra o link do **GitHub Pages** deste repositório e escolha um jogo.
2. Quem vai hospedar cria uma sala (ou escolhe o modo solo / treino com bots para testar sozinho).
3. Copie o **código da sala** ou o **link de convite** e mande no Discord ou WhatsApp.
4. Quando todos estiverem na sala, o anfitrião inicia a partida.

Quando faltar gente, dá para completar a mesa com **bots**.

> 💡 **Dica:** as salas online usam conexão P2P (PeerJS / WebRTC), então todo mundo precisa manter a aba aberta durante a partida. Se o anfitrião fechar, a sala acaba.

---

## 🎮 Sobre cada jogo

### 👑 Intrigas da Corte: Blefe & Influência
Jogo de blefe e dedução inspirado em *Coup*. Cada jogador começa com 2 moedas e 2 cartas de influência secretas, e vence o último nobre que ainda tiver influência.

- Salas online de **2 a 6 jogadores**, com código de sala ou link de convite direto
- **Câmera e chat de voz** na mesa, com indicador de quem está falando
- **Bots** para completar a mesa
- **8 personagens** renascentistas ilustrados em SVG, reações flutuantes e chat lateral
- 🔐 Tem um **portão de acesso** com senha da galera (padrão: `CORTE`). Quem entra pelo link de convite é liberado automaticamente.

**Regras resumidas**

| Ação | Efeito | Pode ser bloqueada? |
| :--- | :--- | :--- |
| **Renda** | +1 moeda | ❌ Não |
| **Ajuda Externa** | +2 moedas | 🛡️ Sim, pelo **Duque** |
| **Golpe de Estado** | Paga 7 moedas e o alvo perde 1 influência (**obrigatório com 10+ moedas**) | ❌ Não |

| Personagem | Ação no turno | Bloqueio |
| :--- | :--- | :--- |
| 👑 **Duque** | Taxar: +3 moedas | Bloqueia Ajuda Externa |
| 🗡️ **Assassino** | Paga 3 moedas para eliminar 1 influência de um alvo | — |
| 🎭 **Condessa** | — | Bloqueia Assassinato contra si |
| 🧭 **Capitão** | Extorquir: rouba até 2 moedas de outro jogador | Bloqueia roubo |
| 📜 **Embaixador** | Troca cartas com o baralho da corte | Bloqueia roubo |

Você pode declarar **qualquer personagem**, mesmo sem ter a carta. Se alguém **contestar** e você estiver blefando, perde 1 influência. Se você estiver falando a verdade, quem duvidou perde 1 influência.

### 🃏 Truco
Truco com mesa de bar, em **duplas (2x2)** ou **trios de duplas (2x2x2, até 6 jogadores)**. Os parceiros sentam sempre de frente, e as vagas vazias viram bots.

- Manilha definida pela vira
- **Sinais secretos** entre parceiros
- **Modo caos**: às vezes a mão vem com uma regra maluca (manilha velha, truco dobrado, ordem invertida, às cegas...)
- Voz ao vivo, sistema de **XP e níveis** salvo no seu navegador
- Modo de **treino contra bots (offline)**

### 💼 Jogo da Vida BR
Uma corrida até os 40 anos, com empregos, cursos e boletos. Vence quem chega melhor.

- Escolha sua **origem de vida**
- Gerencie **trabalho, estudo, comida, saúde, felicidade e estresse**
- Suba de cargo (precisa de curso, horas de experiência e até roupa social)
- **Mural de conquistas** da vida (troféus)
- Jogue **solo** ou **online com até 4 jogadores**, com bots

### 🍻 Fechou a Conta
Jogo de cartas em que você monta **mãos de pôquer** para pagar as contas do boteco ao longo de **12 rodadas**.

- Dois modos online: **Co-op (Rachando a Conta)** e **Disputa (mesma semente para todos)**
- Até **6 pessoas** na mesa
- **Chefões**, pacotes de cartas e **relíquias** colecionáveis
- **Troféus** que desbloqueiam novas toalhas e baralhos
- Também dá para jogar **solo**

> 💾 O progresso de troféus, relíquias e XP fica salvo no `localStorage` do navegador. Se você trocar de aparelho ou limpar os dados do navegador, ele é perdido.

---

## 🛠️ Tecnologias

- **HTML5 + JavaScript puro** (cada jogo é um único arquivo `index.html`)
- **Tailwind CSS (CDN)** em alguns jogos
- **PeerJS + WebRTC** para salas online P2P e voz/vídeo, sem servidor de mídia
- **Web Audio API** para efeitos sonoros sintetizados no navegador
- **SVG** para as ilustrações

---

## 📁 Estrutura do repositório

```
central-jogos/
├── index.html              # Hub com a lista de jogos
└── games/
    ├── intrigas-da-corte/  # Blefe e influência
    ├── truco/              # Truco 2x2 e 2x2x2
    ├── jogo-da-vida/       # Jogo da Vida BR
    └── fechou-a-conta/     # Pôquer de boteco
```

### ➕ Adicionando um novo jogo
1. Crie uma pasta em `games/<nome-do-jogo>/` com um `index.html`.
2. Adicione uma entrada na lista `games` dentro do `index.html` da raiz (título, descrição, link e tags).
3. Atualize a tabela de jogos deste README.
