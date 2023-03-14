let contador = 0;
let input = document.getElementById("inputTarefa");
let btnAdd = document.getElementById("btn-add");
let main = document.getElementById("areaLista");
let res = document.getElementById("res");
var valor = document.getElementById("valor");
let inserir = document.getElementById("inserir");
let totalCompra= document.getElementById("totalCompra");
let itens= document.getElementById("itens");
let itenResultado = document.getElementById("itenResultado");
let details =document.querySelector('details')
let AbrirOrcamento =document.querySelector('#AbrirOrcamento')

const cart = []


// Carrega as tarefas salvas no localStorage
window.addEventListener('load', () => {
  let tarefas = JSON.parse(localStorage.getItem('tarefas'));
  if (tarefas) {
   main.innerHTML = tarefas;
    contador = main.children.length;
  }
});



function addTarefa() {
 

  //PEGAR O VALOR DIGITADO NO INPUT
  let valorInput = input.value;
   if(input.value==0){  
  alert('Digite um item')
}



  //SE NÃO FOR VAZIO, NEM NULO, NEM INDEFINIDO
  if ((valorInput !== "") &&( valorInput !== null) && (valorInput !== undefined)) {
    ++contador;
   
    var novoItem = `<div id="${contador}" class="item">
        <div onclick="marcarTarefa(${contador})" class="item-icone">
            <i id="icone_${contador}" class="mdi mdi-circle-outline"></i>
        </div>
        <div onclick="marcarTarefa(${contador})" class="item-nome">
        
            ${valorInput}

           
        </div>
       
        <button onclick="deletar(${contador})" class="delete"><i class="mdi mdi-delete"></i></button>
    </div>`;

    //ADICIONAR NOVO ITEM NO MAIN
    main.innerHTML += novoItem;

    //ZERAR OS CAMPINHOS
    input.value = "";
    input.focus();
  }

 // Salva as tarefas no localStorage

 localStorage.setItem('tarefas', JSON.stringify(main.innerHTML));

}



function deletar(id) {

  var tarefa = document.getElementById(id);
  tarefa.remove();

  // Salva as tarefas no localStorage
  localStorage.setItem('tarefas', JSON.stringify(main.innerHTML));
}


function marcarTarefa(id) {
 
  var item = document.getElementById(id);
 
  var classe = item.getAttribute("class");
  console.log(classe);

  if (classe == "item") {
    item.classList.add("clicado");

    var icone = document.getElementById("icone_" + id);
    icone.classList.remove("mdi-circle-outline");
    icone.classList.add("mdi-check-circle");

    item.parentNode.appendChild(item);
  } else {
    item.classList.remove("clicado");

    var icone = document.getElementById("icone_" + id);
    icone.classList.remove("mdi-check-circle");
    icone.classList.add("mdi-circle-outline");
    
  }

// Salva as tarefas no localStorage
localStorage.setItem('tarefas', JSON.stringify(main.innerHTML));
}

 let botao = document.getElementById("calcular");

 botao.addEventListener('click',somarValores);
 let acumulador = 0;

 function somarValores( ){
 
  itenResultado.innerHTML+= `<p>${inserir.value}: R$ ${valor.value}</p>`;
  contador = itenResultado.children.length;
  if(valor.value==0){
    alert('Insira um valor!')
    return;


  }
  const cart2 = {
    nome: inserir.value,
    valor1: Number(valor.value)
  };
 
  cart.push(cart2);
  valor.value = "";

  acumulador = atualizarSoma(acumulador.toFixed(2));
 
  
  console.log(cart);
  function atualizarSoma() {
    acumulador = 0;
   
  for (let i = 0; i < cart.length; i++) {
    acumulador += cart[i].valor1;
  }
  totalCompra.innerHTML=`R$${acumulador}`;
 return acumulador;

}


  
  valor.focus()
  valor.value=''
  
 }


 const orcamento = document.querySelector('.orcamento')
 const div = document.querySelector('#itenResultado');
 const button = document.querySelector('#salvar');
// adicionar um ouvinte de evento de mudança à div
div.addEventListener('input', () => {
  // salvar o conteúdo da div no localStorage
  localStorage.setItem('itenResultado', div.innerHTML);
});

// adicionar um ouvinte de evento "click" ao botão
button.addEventListener('click', () => {

  // salvar o conteúdo da div no localStorage0localStorage.setItem('itenResultado', div.innerHTML); 
  itenResultado.innerHTML += `R${acumulador}`
  localStorage.setItem('itenResultado', div.innerHTML);
 
});

// verificar se já há um conteúdo salvo no localStorage
const savedContent = localStorage.getItem('itenResultado');
if (savedContent) {
  // se houver um conteúdo salvo, atualize o conteúdo da div
  div.innerHTML = savedContent;
  div.parentElement.setAttribute('close', true);
}


input.addEventListener("keyup", function (event) {
  //SE TECLOU ENTER (13)
  if (event.keyCode === 13) {
    event.preventDefault();
    btnAdd.click();
  }
});

valor.addEventListener("keyup", function (e) {
  //SE TECLOU ENTER (13)
  if (e.keyCode === 13) {
    e.preventDefault();
    botao.click() 
  }
});

AbrirOrcamento.addEventListener('click',()=>{
  orcamento.style.display='block'
})

document.addEventListener('click', (event) => {
  // Verifica se o clique foi fora do botão e da caixa de orçamento
  if (!event.target.closest('#AbrirOrcamento') && !event.target.closest('.orcamento')) {
    orcamento.style.display = 'none'
  }
})
