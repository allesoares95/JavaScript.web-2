const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
  criaElement(elemento);
});

form.addEventListener("submit", (event) => {
  event.preventDefault()

  const nome = event.target.elements['nome']
  const quantidade = event.target.elements['quantidade']

  const addItemExistente = itens.find(elemento => elemento.nome === nome.value);
  const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
  };

  if (addItemExistente) {
    itemAtual.id = addItemExistente.id

    atualizaElemento(itemAtual);
    itens[itens.findIndex(
      elemento => elemento.id === addItemExistente.id
    )] = itemAtual
  } else {
    itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0;

    criaElement(itemAtual);

    itens.push(itemAtual);
  }

  localStorage.setItem("itens", JSON.stringify(itens));

  nome.value = ""
  quantidade.value = ""
});

function criaElement(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = item.quantidade

  numeroItem.dataset.id = item.id

  novoItem.appendChild(numeroItem)
  novoItem.innerHTML += item.nome

  novoItem.appendChild(removeList(item.id))

  lista.appendChild(novoItem);
};

function atualizaElemento(item) {
  document.querySelector(
    "[data-id='" +item.id+ "']"
  ).innerHTML = item.quantidade
};

function removeList(id) {
  const elementDelete = document.createElement("button")
  elementDelete.innerText = "X"

  elementDelete.addEventListener("click", function(){
    deleteElement(this.parentNode, id)
  })

  return elementDelete
};

function deleteElement(tag, id) {
  tag.remove()

  itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

  localStorage.setItem("itens", JSON.stringify(itens));
};