const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((element) => {
  criarElemento(element);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = event.target.elements["nome"];
  const quantidade = event.target.elements["quantidade"];

  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  const existe = itens.find(
    (element) => element.nome.toLowerCase() === itemAtual.nome.toLowerCase()
  );

  if (existe) {
    itemAtual.id = existe.id;

    itens[itens.findIndex((element) => element.id === itemAtual.id)] =
      itemAtual;

    atualizaElemento(itemAtual);
  } else {
    itemAtual.id = itens.length > 0 ? itens[itens.length - 1].id + 1 : 0;

    criarElemento(itemAtual);

    itens.push(itemAtual);
  }

  localStorage.setItem("itens", JSON.stringify(itens));

  nome.value = "";
  quantidade.value = "";
});

function criarElemento(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = item.quantidade;
  numeroItem.dataset.id = item.id;

  novoItem.appendChild(numeroItem);
  novoItem.innerHTML += item.nome;

  novoItem.appendChild(botaoDeleta(item.id));

  lista.appendChild(novoItem);
}

function atualizaElemento(item) {
  document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade;
}

function deletaElemento(tag, id) {
  tag.remove();

  itens.splice(
    itens.findIndex((element) => element.id === id),
    1
  );

  console.log(itens);

  localStorage.setItem("itens", JSON.stringify(itens));
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button");
  elementoBotao.innerText = "X";

  elementoBotao.addEventListener("click", function () {
    deletaElemento(this.parentNode, id);
  });

  return elementoBotao;
}
