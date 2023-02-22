let contador = 0;
let input = document.getElementById("inputTarefa");
let btnAdd = document.getElementById("btn-add");
let main = document.getElementById("areaLista");
let res = document.getElementById("res");
let valor = document.getElementById("valor");
let inserir = document.getElementById("inserir");
let totalCompra= document.getElementById("totalCompra");
let itens= document.getElementById("itens");



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
   
    let novoItem = `<div id="${contador}" class="item">
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


let valores = []

inserir.addEventListener('click',adicionarValor);

let inputs = document.getElementById("valor");

 function adicionarValor(){ 
  
  let inputs = document.getElementById("valor").value;

  let values= inputs.replace(/\D/g,"")  //Remove tudo o que não é dígito

  itens.innerHTML+=`<option>R$ ${inputs}</option>`
  

  valores.push(parseInt(values))

  // Salva os valores no localStorage
  localStorage.setItem('valores', JSON.stringify(valores));
 
 }

 

 let botao = document.getElementById("calcular");

 botao.addEventListener('click',somarValores);


 function somarValores(){
  if(valor.value==0){
    alert('Insira um valor!')
    return;


  }
  

  adicionarValor()  
  
  let total = valores.reduce(function(acumulador, atual) {
    return acumulador + atual

    
  });

  let centavos=total/100

  totalCompra.innerHTML=`R$${centavos.toFixed(2)}`
  
  valor.focus()
  valor.value=''
  
 }
 let apagar = document.getElementById('apagar')

 apagar.addEventListener('click',()=>{

  let select= document.getElementById("itens");

  if(select.value===''){
    
    alert('Nada para apagar!')
    totalCompra.innerHTML='R$ 0.00'
   return;
   
  }
  
  valores.pop()
 
  select.options[select.options.length-1].remove()
  let total = valores.reduce(function(acumulador, atual) {
    return acumulador + atual


  });

  let centavos=total/100

  totalCompra.innerHTML=`R$${centavos.toFixed(2)}`
    

  
  
 })
    

 



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

