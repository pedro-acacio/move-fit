# CLAUDE.md

## Sobre o projeto
App mobile em **React Native com Expo**, escrito em **JavaScript** (não TypeScript). Projeto de faculdade feito em grupo, então o código deve ser simples, claro e fácil de explicar.

## Idioma
Responder e comentar o código em **português**. Nomes de pastas, arquivos e componentes em português também (ex.: `Entrada`, `Botao`).

## Arquitetura de pastas

O projeto usa **Expo Router** (rotas por arquivo). **Todo arquivo dentro de `src/app/` vira uma rota**, inclusive arquivos de estilo, então nada além de rotas e `_layout.jsx` pode ficar lá. O conteúdo das telas fica em `src/telas/`.

```
src/
├── app/                          # SÓ rotas (o "mapa" de navegação do protótipo)
│   ├── _layout.jsx               # pilha principal
│   ├── index.jsx                 # tela inicial (provisória, vira o Login)
│   ├── cadastro.jsx
│   ├── recuperar-senha.jsx
│   ├── aluno/
│   │   ├── _layout.jsx           # pilha do aluno (detalhes abrem por cima das abas)
│   │   ├── (abas)/               # barra inferior: Início, Histórico, Professores, Perfil
│   │   │   ├── _layout.jsx
│   │   │   ├── index.jsx         # Home
│   │   │   ├── historico.jsx
│   │   │   ├── professores.jsx
│   │   │   └── perfil.jsx
│   │   ├── treino/[id].jsx       # Detalhes do treino
│   │   ├── exercicio/[id].jsx    # Detalhes do exercício
│   │   ├── chat/[id].jsx         # Chat com professor
│   │   └── assistente.jsx        # Assistente IA
│   └── professor/
│       ├── _layout.jsx
│       ├── (abas)/               # barra inferior: Início, Treinos, Exercícios, Alunos, Perfil
│       │   ├── _layout.jsx
│       │   ├── index.jsx         # Dashboard
│       │   ├── treinos.jsx
│       │   ├── exercicios.jsx
│       │   ├── alunos.jsx
│       │   └── perfil.jsx
│       ├── treino/cadastro.jsx               # novo ou editar
│       ├── treino/selecionar-exercicios.jsx
│       ├── exercicio/cadastro.jsx            # novo ou editar
│       ├── aluno/[id].jsx                    # Detalhes do aluno
│       └── chat/[id].jsx                     # Chat com aluno
├── telas/                        # conteúdo de cada tela
│   └── Cadastro/
│       ├── Cadastro.jsx
│       └── Cadastro.styles.js
├── components/                   # peças reutilizáveis
│   ├── Botao/
│   │   ├── Botao.jsx             # JSX do componente
│   │   └── Botao.styles.js       # estilos só desse componente
│   └── ...
├── services/                     # acesso ao Firebase e ao Gemini (criar quando for usar)
├── context/                      # estado compartilhado, ex.: usuário logado (criar quando for usar)
└── styles/
    ├── global.js                 # espaçamentos, fontes, containers base
    └── theme.js                  # somente as cores
```

Os parênteses em `(abas)` criam um grupo: ele organiza as pastas mas não aparece no endereço. Assim a Home do aluno é `/aluno` e o Dashboard é `/professor`.

## Como fazer uma tela
1. Criar a pasta da tela em `src/telas/` com os dois arquivos (`Nome.jsx` e `Nome.styles.js`).
2. Trocar o conteúdo da rota correspondente em `src/app/` (hoje ela mostra `EmConstrucao`) por uma linha:
   ```js
   export { default } from "../../telas/Nome/Nome"; // ajustar os ../ conforme a pasta
   ```
3. Navegar com `router.push("/aluno/treino/123")`; na tela, ler o id com `useLocalSearchParams()`.

## Regras de organização
- **Trabalhar com componentes:** sempre que um trecho de tela puder virar componente, separar. O objetivo é manter as telas curtas.
- Rotas em `src/app/` só apontam para a tela em `src/telas/` (ou são `_layout.jsx`).
- **Uma pasta por tela e uma pasta por componente**, com o arquivo `.jsx` e o arquivo de estilo lado a lado.
- Pastas, telas e componentes em **PascalCase** (`Entrada`, não `entrada`). Arquivos de rota em minúsculo com hífen (`recuperar-senha.jsx`), porque viram o endereço.
- Extensão **`.jsx`** em todo arquivo com JSX (componentes, telas, rotas); **`.js`** nos arquivos sem JSX (estilos, `theme.js`, `global.js`, services).
- Chamadas ao Firebase e ao Gemini ficam em `src/services/`, nunca direto na tela.

## Regras de estilo
- Não usar CSS nem `.module.css`. Usar `StyleSheet.create()` do React Native.
- Cada componente tem seu `Nome.styles.js` com `export default StyleSheet.create({ ... })`.
- Importar assim: `import styles from './Nome.styles';` e usar `style={styles.container}`.
- **Só dois estilos globais:** `styles/global.js` e `styles/theme.js`.
- **Cores nunca escritas direto no componente.** Sempre vir do `theme.js` (`import { colors } from '../../styles/theme';`).
- O `StyleSheet` só é importado no arquivo de estilo, não no componente.
- Propriedades em camelCase (`backgroundColor`), números sem "px" (`padding: 12`).

## Lembretes do React Native (diferente da web)
- Não existe herança de estilo entre `View`. Cada componente importa o que precisa. A única herança é `Text` dentro de `Text`.
- Texto sempre dentro de `<Text>`. Texto solto dentro de `View` dá erro.
- Campo de digitar: `<TextInput onChangeText={...} />` (guardar o valor com `useState`).
- Botão: `<Pressable>` ou `<TouchableOpacity onPress={...}>` com um `<Text>` dentro. Evitar `<Button>` quando precisar estilizar.
- Não usar `className`, `onClick`, `<div>`, `<input>` nem `<button>`.

## Fluxo com Git
- Antes de começar: `git pull`.
- Rodar o app: `npx expo start` (se o QR code não conectar no Wi-Fi da faculdade, usar `npx expo start --tunnel`).
- Ao terminar: `git add .`, `git commit -m "..."` e `git push`.
- Nunca commitar a pasta `node_modules`.

## Como o Claude deve ajudar
- Seguir a arquitetura acima ao criar ou alterar arquivos.
- Explicar de forma simples, pois o objetivo também é aprender.
- Ao criar um componente novo, gerar os dois arquivos (`Nome.jsx` e `Nome.styles.js`) dentro da pasta dele.
- Antes de mudar a estrutura de pastas, perguntar.