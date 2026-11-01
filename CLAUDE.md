# CLAUDE.md

## Sobre o projeto
App mobile em **React Native com Expo**, escrito em **JavaScript** (não TypeScript). Projeto de faculdade feito em grupo, então o código deve ser simples, claro e fácil de explicar.

## Idioma
Responder e comentar o código em **português**. Nomes de pastas, arquivos e componentes em português também (ex.: `Entrada`, `Botao`).

## Arquitetura de pastas

O projeto usa **Expo Router** (rotas por arquivo). Cada arquivo dentro de `src/app/` é uma tela; `_layout.jsx` define navegação. Componentes e estilos ficam fora de `src/app/`.

```
src/
├── app/
│   ├── index.jsx                # tela inicial
│   └── ...                      # outras telas/rotas
├── components/
│   ├── Entrada/
│   │   ├── Entrada.jsx          # JSX do componente
│   │   └── Entrada.styles.js    # estilos só desse componente
│   ├── Botao/
│   │   ├── Botao.jsx
│   │   └── Botao.styles.js
│   └── ...
└── styles/
    ├── global.js                # espaçamentos, fontes, containers base
    └── theme.js                 # somente as cores
```

## Regras de organização
- **Trabalhar com componentes:** sempre que um trecho de tela puder virar componente, separar. O objetivo é manter as telas em `src/app/` curtas.
- Telas em `src/app/` ficam enxutas: só montam a tela chamando componentes.
- **Uma pasta por componente**, com o arquivo do componente e o arquivo de estilo lado a lado.
- Pastas e componentes em **PascalCase** (`Entrada`, não `entrada`).
- Extensão **`.jsx`** em todo arquivo com JSX (componentes, telas em `src/app/`); **`.js`** nos arquivos sem JSX (estilos, `theme.js`, `global.js`).
- Se o projeto crescer, criar `src/app/` com subpastas por rota (já é o padrão do Expo Router) e deixar `components/` só para peças reutilizáveis.

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