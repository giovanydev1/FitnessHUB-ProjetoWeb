const tabelaUsuarios = document.querySelector("#tabUsuario tbody");
const tabelaAulas = document.querySelector("#tabAulas tbody");
const tabelaAvaliacoes = document.querySelector("#tabAvaliacoes tbody");

var dadosUsuarios = JSON.parse(localStorage.getItem('dadosUsuarios')) || [];
var agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
var avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];

// Alterna seções
function mostrar(secao) {
  document.querySelectorAll("main section").forEach(s => s.style.display = "none");
  document.getElementById(secao).style.display = "block";
}

// Menu lateral
function toggleMenuLateral() {
  const sidebar = document.querySelector('.menuLateral');
  const main = document.querySelector('main');
  const span = document.querySelectorAll("span");
  sidebar.classList.toggle('colapsar');
  main.classList.toggle('expandir');
  span.forEach(s => s.classList.toggle('none'));
}

// Salvar usuário
function salvarUsuario() {
  event.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const confSenha = document.getElementById("confSenha").value;

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValido) {
    alert("Por favor, insira um e-mail válido (ex: nome@exemplo.com)");
    return;
  }

  if (senha === "" || confSenha === "") {
    alert("As senhas não podem estar vazias.");
    return;
  }

  if (senha !== confSenha) {
    alert("As senhas não conferem.");
    return;
  }

  dadosUsuarios.push({ nome, email, senha });
  localStorage.setItem('dadosUsuarios', JSON.stringify(dadosUsuarios));
  alert("Usuário salvo com sucesso!");
  window.location.reload();
}


// Exibir usuários
function exibirUsuarios() {
  tabelaUsuarios.innerHTML = "";
  dadosUsuarios.forEach((item, i) => {
    tabelaUsuarios.innerHTML += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.email}</td>
        <td>
          <a href="#" onclick="editarUsuario(${i})"><i class="fa-solid fa-pen-to-square"></i></a>
          <a href="#" onclick="removerUsuario(${i})"><i class="fa-solid fa-trash"></i></a>
        </td>
      </tr>`;
  });
}

// Editar usuário
function editarUsuario(i) {
  const novoNome = prompt("Novo nome:", dadosUsuarios[i].nome);
  const novoEmail = prompt("Novo email:", dadosUsuarios[i].email);
  if (novoNome && novoEmail) {
    dadosUsuarios[i].nome = novoNome;
    dadosUsuarios[i].email = novoEmail;
    localStorage.setItem('dadosUsuarios', JSON.stringify(dadosUsuarios));
    exibirUsuarios();
  }
}

// Remover usuário
function removerUsuario(i) {
  if (confirm("Deseja realmente excluir este usuário?")) {
    dadosUsuarios.splice(i, 1);
    localStorage.setItem('dadosUsuarios', JSON.stringify(dadosUsuarios));
    exibirUsuarios();
  }
}

// Exibir agendamentos
function exibirAgendamentos() {
  tabelaAulas.innerHTML = "";
  agendamentos.forEach((item, i) => {
    tabelaAulas.innerHTML += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.email}</td>
        <td>${item.telefone}</td>
        <td>${item.tipoAula}</td>
        <td>${item.data}</td>
        <td>${item.hora}</td>
        <td>${item.observacoes}</td>
        <td>
          <a href="#" onclick="editarAgendamento(${i})"><i class='fa-solid fa-pen-to-square'></i></a>
          <a href="#" onclick="removerAgendamento(${i})"><i class='fa-solid fa-trash'></i></a>
        </td>
      </tr>`;
  });
}

// Editar agendamento
function editarAgendamento(i) {
  const novoTipo = prompt("Novo tipo de aula:", agendamentos[i].tipoAula);
  const novaData = prompt("Nova data (aaaa-mm-dd):", agendamentos[i].data);
  const novaHora = prompt("Novo horário:", agendamentos[i].hora);
  if (novoTipo && novaData && novaHora) {
    agendamentos[i].tipoAula = novoTipo;
    agendamentos[i].data = novaData;
    agendamentos[i].hora = novaHora;
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    exibirAgendamentos();
  }
}

// Remover agendamento
function removerAgendamento(i) {
  if (confirm("Deseja realmente excluir este agendamento?")) {
    agendamentos.splice(i, 1);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    exibirAgendamentos();
  }
}

// Exibir avaliações
function exibirAvaliacoes() {
  tabelaAvaliacoes.innerHTML = "";
  avaliacoes.forEach((item, i) => {
    tabelaAvaliacoes.innerHTML += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.idade}</td>
        <td>${item.peso}</td>
        <td>${item.experiencia}</td>
        <td>${item.dieta}</td>
        <td>${item.objetivos}</td>
        <td>
          <a href="#" onclick="editarAvaliacao(${i})"><i class='fa-solid fa-pen-to-square'></i></a>
          <a href="#" onclick="removerAvaliacao(${i})"><i class='fa-solid fa-trash'></i></a>
        </td>
      </tr>`;
  });
}

// Editar avaliação
function editarAvaliacao(i) {
  const novaExperiencia = prompt("Atualizar experiência:", avaliacoes[i].experiencia);
  const novaDieta = prompt("Atualizar dieta:", avaliacoes[i].dieta);
  const novosObjetivos = prompt("Atualizar objetivos:", avaliacoes[i].objetivos);
  if (novaExperiencia && novaDieta && novosObjetivos) {
    avaliacoes[i].experiencia = novaExperiencia;
    avaliacoes[i].dieta = novaDieta;
    avaliacoes[i].objetivos = novosObjetivos;
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
    exibirAvaliacoes();
  }
}

// Remover avaliação
function removerAvaliacao(i) {
  if (confirm("Deseja realmente excluir esta avaliação?")) {
    avaliacoes.splice(i, 1);
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
    exibirAvaliacoes();
  }
}

// Executa ao carregar
exibirUsuarios();
exibirAgendamentos();
exibirAvaliacoes();
