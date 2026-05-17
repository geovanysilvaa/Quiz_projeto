# Projeto Quiz React

Aplicação de Quiz desenvolvida com React + TypeScript + Vite, com foco em experiência visual moderna, gerenciamento de estado entre rotas e persistência de dados utilizando LocalStorage.

---

# Disciplina

Programação para Internet I

# Professor

Jeferson do Nascimento Soares

---

# Objetivo do Projeto

O projeto teve como objetivo modernizar a aplicação original do quiz, implementando melhorias visuais e funcionais solicitadas na atividade.

As principais melhorias incluem:

- Fidelidade ao layout do Figma
- Sistema de rotas dinâmicas
- Tela de resultados personalizada
- Persistência de perguntas com LocalStorage
- Cadastro de novas perguntas
- Interface responsiva e moderna

---

# Tecnologias Utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- CSS Customizado
- LocalStorage

---

# Funcionalidades Implementadas

## 1. Fidelidade ao Design (UI/UX)

A interface foi totalmente reformulada para seguir o padrão visual definido no Figma.

### Ajustes realizados

- Nova paleta de cores
- Tipografia personalizada
- Layout centralizado
- Cards modernos
- Botões estilizados
- Responsividade
- Melhor experiência visual

### Cores utilizadas

```css
:root {
  --quiz-dark: #000000;
  --quiz-purple: #6b3fa0;
  --quiz-yellow: #FFD60A;
}
```

### Fontes utilizadas

- Fredoka
- Merriweather

---

# 2. Gerenciamento de Rotas e Estado Dinâmico

Foi implementada uma tela de resultados responsável por exibir o desempenho do usuário ao finalizar o quiz.

## Fluxo de navegação

Ao responder a última pergunta:

```ts
navigate("/resultado", {
  state: {
    acertos,
    erros,
  },
});
```

Os dados são enviados utilizando o objeto `state` do React Router.

---

## Recuperação dos dados

Na tela de resultados foi utilizado:

```ts
useLocation().state
```

para recuperar:

- Quantidade total de acertos
- Quantidade total de erros

---

## Mensagem motivacional

A aplicação exibe mensagens diferentes conforme o percentual de acertos do aluno.

### Exemplos

- Excelente desempenho!
- Muito bem!
- Continue praticando!

---

# 3. Persistência com LocalStorage

As perguntas deixaram de ser estáticas e passaram a ser carregadas dinamicamente através do LocalStorage.

---

## Chave utilizada

```txt
@quiz_questions
```

---

## Carregamento das questões

As perguntas são carregadas utilizando `useEffect`.

```ts
useEffect(() => {
  const storedQuestions = localStorage.getItem("@quiz_questions");

  if (storedQuestions) {
    setQuestions(JSON.parse(storedQuestions));
  }
}, []);
```

---

# Sistema de Cadastro de Perguntas

Foi criada uma interface administrativa para adicionar novas perguntas ao quiz.

## Funcionalidades

- Cadastro de pergunta
- Cadastro de alternativas
- Seleção da resposta correta
- Salvamento automático no LocalStorage
- Listagem das perguntas cadastradas

---

# Perguntas Mockadas

O sistema possui perguntas iniciais pré-cadastradas para facilitar os testes.

## Conteúdo das perguntas

- Literatura
- Geografia
- Ciências
- História
- Futebol
- Arte
- Cultura Geral

---

# Seed Automática

Foi implementada a função:

```ts
seedQuizQuestionsIfEmpty()
```

Ela verifica se existe conteúdo salvo no LocalStorage.

Caso não exista, o sistema adiciona automaticamente um conjunto inicial de perguntas.

---

# Estrutura do Projeto

```txt
src/
 ├── assets/
 ├── components/
 ├── pages/
 │    ├── Home.tsx
 │    ├── Quiz.tsx
 │    ├── Resultado.tsx
 │    └── Admin.tsx
 │
 ├── data/
 │    └── quizData.ts
 │
 ├── styles/
 │    └── global.css
 │
 └── App.tsx
```

---

# Melhorias Visuais

## Home

- Logo centralizada
- Botões modernos
- Fundo escuro com destaque roxo/amarelo
- Navegação simplificada

---

## Tela de Quiz

- Card estilizado
- Barra de progresso
- Feedback visual
- Alternativas destacadas

---

## Tela de Resultado

- Percentual de desempenho
- Mensagem motivacional
- Estatísticas de acertos e erros
- Botão para reiniciar quiz

---

## Tela de Cadastro

- Formulário organizado
- Inputs estilizados
- Lista de perguntas cadastradas
- Salvamento persistente

---

# Como Executar o Projeto

## Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## Entrar na pasta

```bash
cd projeto_quiz_fork
```

---

## Instalar dependências

```bash
npm install
```

---

## Executar aplicação

```bash
npm run dev
```

---

# Como Testar o LocalStorage

Caso queira reiniciar os dados do quiz:

1. Abra o navegador
2. Vá em:
   - F12 → Application → LocalStorage
3. Remova:
   ```txt
   @quiz_questions
   ```
4. Recarregue a página

As perguntas mockadas serão recriadas automaticamente.

---

# Resultado Final

O projeto agora possui:

✅ Interface moderna baseada no Figma  
✅ Sistema completo de quiz  
✅ Persistência com LocalStorage  
✅ Cadastro dinâmico de perguntas  
✅ Tela de resultados  
✅ Navegação dinâmica  
✅ Perguntas mockadas automáticas  
✅ Melhor organização visual e estrutural  

---

# Autor

Geovany de Oliveira Silva Batista