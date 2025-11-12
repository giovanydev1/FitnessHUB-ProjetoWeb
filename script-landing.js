// menu e login
const menu = document.querySelectorAll('nav a li');
const btnLogin = document.getElementById('btnLogin');
const btnFechar = document.getElementById('btnFechar');
const login = document.getElementById('login');

document.querySelector('#login form').addEventListener('submit', function(event) {
  event.preventDefault();
  logar();
});


var dadosUsuarios = JSON.parse(localStorage.getItem('dadosUsuarios')) || [];

// cria usuários iniciais
if (dadosUsuarios.length === 0) {
  let novosUsuarios = [
    { nome: "user", email: "email@email.com", senha: "123" },
    { nome: "aluno", email: "aluno@email.com", senha: "aluno" },
    { nome: "root", email: "root@email.com", senha: "root" },
  ];
  localStorage.setItem('dadosUsuarios', JSON.stringify(novosUsuarios));
}

// scroll suave
document.querySelectorAll('nav ul a').forEach(link => {
  link.addEventListener('click', evento => {
    evento.preventDefault();
    const href = link.getAttribute('href');
    const alvo = document.querySelector(href);
    if (alvo) {
      window.scroll({
        top: alvo.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// login modal
btnLogin.onclick = function () { login.showModal(); }
btnFechar.onclick = function () { login.close(); }

// login administrador
function logar() {
  let usuario = document.getElementById('usuario').value;
  let senha = document.getElementById('senha').value;
  let msgErro = document.querySelector('.erro');
  if (msgErro) login.removeChild(msgErro);

  let usuarioValido = dadosUsuarios.find(u => u.nome === usuario && u.senha === senha);
  if (usuarioValido) {
    sessionStorage.setItem('usuarioLogado', 'true');
    sessionStorage.setItem('nomeUsuario', usuario);
    window.location.href = "./admin/index.html";
  } else {
    const erro = document.createElement('label');
    erro.classList.add('erro');
    erro.innerText = 'Login ou senha inválido';
    login.insertBefore(erro, login.firstChild.nextSibling);
    document.querySelector('#login form').reset();
  }
}

// formulario de aula experimental
function enviarAgendamento(event) {
  event.preventDefault();

  const agendamento = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value,
    tipoAula: document.getElementById('tipo-aula').value,
    data: document.getElementById('data').value,
    hora: document.getElementById('hora').value,
    observacoes: document.getElementById('observacoes').value
  };

  let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  agendamentos.push(agendamento);
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

  alert("Aula experimental agendada com sucesso!");
  document.querySelector("#aula-exp form").reset();
}

// formulario de avaliação inicial
function enviarAvaliacao(event) {
  event.preventDefault();

  const avaliacao = {
    nome: document.getElementById('nome-avaliacao').value,
    idade: document.getElementById('idade').value,
    peso: document.getElementById('peso').value,
    experiencia: document.getElementById('experiencia').value,
    dieta: document.getElementById('dieta').value,
    objetivos: document.getElementById('objetivos').value
  };

  let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
  avaliacoes.push(avaliacao);
  localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));

  alert("Avaliação enviada com sucesso!");
  document.querySelector("#avaliacao-aluno form").reset();
}

//fatorial adicionado no html
function calcularFatorial(event) {
  event.preventDefault();
  const n = parseInt(document.getElementById("numero").value);
  let resultado = 1;

  for (let i = 1; i <= n; i++) {
    resultado *= i;
  }

  document.getElementById("resultado-fatorial").innerText = 
    `O fatorial de ${n} é ${resultado}`;
}

