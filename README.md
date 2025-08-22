Board de Tarefas – Projeto DNC

Aplicação simples de lista de tarefas (To-Do) desenvolvida em HTML5, CSS3 e JavaScript puro, seguindo boas práticas de programação, convenção BEM e responsividade mobile-first.

✨ Funcionalidades

✅ Carregamento automático de tarefas salvas no localStorage

✅ Lista inicial de tarefas exibida ao abrir a aplicação (quando não há dados salvos)

✅ Cadastro de novas tarefas pelo formulário

✅ Marcar tarefas como concluídas com o botão Concluir

✅ Substituição do botão Concluir por ícone ✔️ quando a tarefa está concluída

✅ Descrição da tarefa riscada (strikethrough) ao ser concluída

✅ Contador de tarefas concluídas exibido no rodapé

✅ Remoção de todas as tarefas concluídas em um clique (apesar de não estar nos requisitos, adicionei essa funcionalidade)

🖼️ Layout e Responsividade

Mobile-first: todos os elementos são otimizados para telas pequenas.

Desktop (≥768px):

Formulário exibido em linha (inputs e botão lado a lado).

Cards de tarefas organizados com detalhes à esquerda e botão de ação à direita.

Paleta de cores clean, com destaques em azul (#2D70FD) para ações e cinzas para textos auxiliares.

🏗️ Estrutura do Projeto
HTML (semântico)

<header> → título da aplicação

<main> → conteúdo principal

<section> → formulário de criação e board de tarefas

<footer> → contador e botão para remover concluídas

CSS – Convenção BEM

Este projeto segue a metodologia BEM (Block, Element, Modifier) para nomear classes, garantindo clareza e escalabilidade:

Bloco: .task (representa um card de tarefa)

Elementos:

.task__container

.task__desc

.task__label

.task__date

.task__action

Modificadores:

.task--done → estado do card concluído

.task__action--done → estado do botão concluído

Exemplo de card no DOM:

<li class="task task--done">
  <div class="task__container">
    <span class="task__desc">Estudar JavaScript</span>
    <span class="task__label">Estudos</span>
    <span class="task__date">Criado em: 22/08/2025</span>
  </div>
  <button class="task__action task__action--done">
    <img src="./assets/iconChecked.png" alt="Tarefa concluída" class="task__action-icon">
  </button>
</li>

🧑‍💻 JavaScript

Uso de funções com responsabilidade única:

createTaskListItem() → renderiza item no DOM

toggleTaskDone() → altera estado concluído

removeDoneTasks() → limpa concluídas

renderTasksProgressData() → atualiza contador

getTasksFromLocalStorage() / setTasksInLocalStorage() → persistência

Tarefas salvas no localStorage, garantindo persistência entre sessões.

📱 Exemplo de Uso

Digite uma tarefa e uma etiqueta no formulário.

Clique em + para adicionar ao board.

Clique em Concluir → a tarefa fica riscada e o botão vira um ícone ✔️.

Clique em Remover tarefas concluídas no rodapé para limpar todas as concluídas.

📂 Estrutura de Pastas
📦 projeto-tarefas
 ┣ 📂 assets
 ┃ ┗ 📄 iconChecked.png
 ┣ 📄 index.html
 ┣ 📄 style.css
 ┗ 📄 index.js

🚀 Tecnologias Utilizadas

HTML5 (semântica, acessibilidade)

CSS3 (flexbox, media queries, convenção BEM)

JavaScript ES6+ (DOM, eventos, localStorage)

📌 Requisitos atendidos

Lista de tarefas carregada automaticamente na renderização inicial

Inclusão de novas tarefas pelo formulário

Marcação de tarefas como concluídas

Substituição do botão "Concluir" por ícone ✔️

Nome da tarefa riscado ao ser concluída

Contador de tarefas atualizado dinamicamente

Uso de tags semânticas <header>, <main>, <footer>

Responsividade garantida para mobile e desktop

Funcionalidades: carregar, adicionar, concluir e atualizar estados

Boas práticas: código legível, funções coesas, nomes claros, convenção BEM aplicada

👨‍💻 Autor

Projeto desenvolvido para a DNC como parte da avaliação final do módulo de JavaScript.
