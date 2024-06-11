const listaTarefas = document.getElementById('lista-tarefas');
const adicionarTarefaBtn = document.getElementById('adicionar-tarefa');

let tarefas = [];

function carregarTarefas() {
    tarefas.forEach(tarefa => {
        const itemLista = document.createElement('li');
        itemLista.innerHTML = `
            <span class="texto-tarefa"><span class="math-inline">\{tarefa\.texto\}</span\>
<span class\="emoji concluida" onclick\="concluirTarefa\(</span>{tarefa.id})">✅</span>
            <span class="emoji editar" onclick="editarTarefa(<span class="math-inline">\{tarefa\.id\}\)"\>✏️</span\>
<span class\="emoji remover" onclick\="removerTarefa\(</span>{tarefa.id})">️</span>
        `;
        itemLista.id = tarefa.id;
        itemLista.draggable = true;

        listaTarefas.appendChild(itemLista);
    });
}

function adicionarStatus() {
    const textoTarefa = prompt("Digite sua tarefa:");

    if (textoTarefa) {
        const novaTarefa = {
            id: gerarId(),
            texto: textoTarefa,
            concluida: false
        };

        tarefas.push(novaTarefa);
        carregarTarefas();
    }
}

function concluirTarefa(idTarefa) {
    const tarefa = tarefas.find(tarefa => tarefa.id === idTarefa);
    tarefa.concluida = !tarefa.concluida;

    carregarTarefas();
}

function editarTarefa(idTarefa) {
    const tarefa = tarefas.find(tarefa => tarefa.id === idTarefa);
    const novoTexto = prompt("Editar tarefa:", tarefa.texto);

    if (novoTexto) {
        tarefa.texto = novoTexto;
        carregarTarefas();
    }
}

function removerTarefa(idTarefa) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== idTarefa)
}

function gerarId() {
    return Math.floor(Math.random() * 1000000); // Gera um ID aleatório entre 0 e 1 milhão
  }

  function removerTarefa(idTarefa) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== idTarefa);
    carregarTarefas();
  }


  listaTarefas.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  });
  
  listaTarefas.addEventListener('dragover', function(event) {
    event.preventDefault();
  });
  
  listaTarefas.addEventListener('drop', function(event) {
    const draggedItemId = event.dataTransfer.getData('text/plain');
    const dropTargetId = event.target.id;
  
    if (draggedItemId !== dropTargetId) {
      const draggedItem = document.getElementById(draggedItemId);
      const dropTarget = document.getElementById(dropTargetId);
  
      dropTarget.parentNode.insertBefore(draggedItem, dropTarget);
  
      // Atualizar a ordem das tarefas no array
      const draggedItemIndex = tarefas.findIndex(tarefa => tarefa.id === draggedItemId);
      const dropTargetIndex = tarefas.findIndex(tarefa => tarefa.id === dropTargetId);
  
      [tarefas[draggedItemIndex], tarefas[dropTargetIndex]] = [tarefas[dropTargetIndex], tarefas[draggedItemIndex]];
  
      carregarTarefas();
    }
  });