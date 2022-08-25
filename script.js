// aqui vou fazer os eventos de cada item da lista de tarefas
// aqui vou fazer a função para quando clicar em um item da lista de tarefa a cor de fundo mude para cinza

const listaTarefas = '#lista-tarefas';

const textoTarefas = '#texto-tarefa';

const background = 'rgb(128, 128, 128)';

function changeBackgroundListItem(e) {
  const pegaTamanho = document.querySelectorAll('.itemList').length;
  // esse for é para todos os outros elementos que não estão selecionados mudarem para a cor original
  for (let contDesfazerSelecao = 0; contDesfazerSelecao < pegaTamanho; contDesfazerSelecao += 1) {
    document.querySelectorAll('.itemList')[contDesfazerSelecao].style.backgroundColor = '';
  }
  e.currentTarget.style.backgroundColor = 'rgb(128,128,128)';
}
// atalho para quantidade de item list
const qtdItemList = document.querySelectorAll('.itemList').length;

// essa variavel armazena a quantidade de duplos cliques que dei em cada item da lista

// aqui to fazendo a função de adicionar risco no texto e retirar
function changeRiskItem(e) {
  for (let contDesfazerSelecao = 0; contDesfazerSelecao < qtdItemList; contDesfazerSelecao += 1) {
    document.querySelectorAll('.itemList')[contDesfazerSelecao].style.backgroundColor = '';
  }
  if (e.target.style.textDecoration === 'none') {
    e.target.style.textDecoration = 'line-through';

    e.target.classList.add('completed');
    alert('=1');
  } else {
    e.target.style.textDecoration = 'none';
    e.target.className = 'itemList';
  }
}

// aqui vou fazer a função de adicionar tarefa na lista
const atalhoListaTarefas = listaTarefas;
function adicionarTarefa() {
  const addTarefa = document.createElement('li');
  addTarefa.className = 'itemList';
  addTarefa.innerHTML = document.querySelector(textoTarefas).value;
  addTarefa.style.textDecoration = 'none';
  document.querySelector(atalhoListaTarefas).appendChild(addTarefa);
  document.querySelector(textoTarefas).value = '';
  // aqui estou adicionando um evento de click para cada li(item da lista de tarefa
  addTarefa.addEventListener('dblclick', changeRiskItem);
  addTarefa.addEventListener('click', changeBackgroundListItem);
  // aqui estou adicionando um evento de dblclick para cada li(item da lista de tarefa)
}

// aqui vou fazer o evento de clicar no botão adicionar-tarefa
document.querySelector('#criar-tarefa').addEventListener('click', adicionarTarefa);

// aqui vou fazer a função para apagar todos os itens
function apagaItens() {
  const qtdElem = document.querySelectorAll('.itemList').length;// Essa variável armazena a quantidade de elementos que tem na lista
  for (let contQuantosElementos = 0; contQuantosElementos < qtdElem; contQuantosElementos += 1) {
    const selecionaItem = document.querySelectorAll('.itemList')[0];
    document.querySelector(atalhoListaTarefas).removeChild(selecionaItem);
  }
}

// aqui estou fazendo o evento para clicar no botão de apagar todos os itens
document.querySelector('#apaga-tudo').addEventListener('click', apagaItens);

// aqui vou fazer a função para apagar todos os itens finalizados;
function apagarFinalizados() {
  const qtdElementosFinalizados = document.querySelectorAll('.completed').length;
  for (let contItensFinali = 0; contItensFinali < qtdElementosFinalizados; contItensFinali += 1) {
    const itensFinalizados = document.querySelector('.completed');
    document.querySelector(atalhoListaTarefas).removeChild(itensFinalizados);
  }
}

// função para salvar itens
function salvarItens() {
  const arr = [];
  const sizeTaskList = document.querySelectorAll('.itemList').length;
  for (let cont = 0; cont < sizeTaskList; cont += 1) {
    arr.push({
      tarefa: document.querySelectorAll('.itemList')[cont].innerHTML,
      textDecoration: document.querySelectorAll('.itemList')[cont].style.textDecoration,
      className: document.querySelectorAll('.itemList').className,
    });
  }
  localStorage.setItem('tarefas', JSON.stringify(arr));
}

// aqui vou fazer o evento de apagar itens finalizados
document.querySelector('#remover-finalizados').addEventListener('click', apagarFinalizados);

// evento para salvar itens
document.querySelector('#salvar-tarefas').addEventListener('click', salvarItens);

function addClassItemsSaved(itensSavedLocalStorage, cont, addTarefa) {
  if (itensSavedLocalStorage[cont].textDecoration === 'line-through') {
    const a = addTarefa;
    a.className = 'itemList completed';
  } else {
    const a = addTarefa;
    a.className = 'itemList';
  }
}

function LoadLocalStorage() {
  const itensSavedLocalStorage = JSON.parse(localStorage.getItem('tarefas'));
  if (itensSavedLocalStorage !== null) {
    for (let cont = 0; cont < itensSavedLocalStorage.length; cont += 1) {
      const addTarefa = document.createElement('li');
      addClassItemsSaved(itensSavedLocalStorage, cont, addTarefa);
      addTarefa.innerHTML = itensSavedLocalStorage[cont].tarefa;
      addTarefa.style.textDecoration = itensSavedLocalStorage[cont].textDecoration;
      document.querySelector(atalhoListaTarefas).appendChild(addTarefa);
      document.querySelector(textoTarefas).value = '';
      // aqui estou adicionando um evento de click para cada li(item da lista de tarefa
      addTarefa.addEventListener('dblclick', changeRiskItem);
      addTarefa.addEventListener('click', changeBackgroundListItem);
      // aqui estou adicionando um evento de dblclick para cada li(item da lista de tarefa)
    }
  }
}

function moveUpTask() {
  const taskList = [...document.querySelector(listaTarefas).children];
  console.log('111', taskList);
  console.log(taskList[0].style.backgroundColor === background);
  // aqui ele pega o elemento selecionado para encontrar a posição no indexof logo abaixo
  const elementSelected = taskList.find((data) => data
    .style
    .backgroundColor === background);

  const selectedElementPosition = taskList.indexOf(elementSelected, 0);

  if (selectedElementPosition > 0) {
    const aux = taskList[selectedElementPosition - 1];
    taskList[selectedElementPosition - 1] = taskList[selectedElementPosition];
    taskList[selectedElementPosition] = aux;

    taskList.forEach((data) => document.querySelector(listaTarefas).appendChild(data));
  }
}

function moveDownTask() {
  const taskList = [...document.querySelector(listaTarefas).children];

  // aqui ele pega o elemento selecionado para encontrar a posição no indexof logo abaixo
  const elementSelected = taskList.find((data2) => data2
    .style
    .backgroundColor === background);

  const selectedElementPosition = taskList.indexOf(elementSelected, 0);
  if (selectedElementPosition < taskList.length - 1 && selectedElementPosition >= 0) {
    const aux = taskList[selectedElementPosition + 1];
    taskList[selectedElementPosition + 1] = taskList[selectedElementPosition];
    taskList[selectedElementPosition] = aux;

    taskList.forEach((data) => document.querySelector(listaTarefas).appendChild(data));
  }
}

function removeSelectedItem(_e) {
  const taskList = [...document.querySelector(listaTarefas).children];

  // aqui ele pega o elemento selecionado para encontrar a posição no indexof logo abaixo
  const elementSelected = taskList.find((data3) => data3
    .style
    .backgroundColor === background);

  document.querySelector(listaTarefas).removeChild(elementSelected);
}

document.querySelector('#mover-cima').addEventListener('click', moveUpTask);

document.querySelector('#mover-baixo').addEventListener('click', moveDownTask);

document.querySelector('#remover-selecionado').addEventListener('click', removeSelectedItem);

window.addEventListener('load', LoadLocalStorage);
