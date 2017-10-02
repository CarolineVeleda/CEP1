const form = document.querySelector('form');
const divResultado = document.querySelector('div#resultado');
const scriptTemplate = document.querySelector('#template');
const cep1 = document.querySelector('#cep');
const enviar = document.getElementById('enviar');
const apagar=document.querySelector('button')[1];
const aviso =  document.querySelector('div.alert-danger');


form.addEventListener('submit', function(e) {
  busca(form.cep.value);
  e.preventDefault();
});

form.cep.value="oooooooo";

form.cep.addEventListener('keydown',function(e){
	
	console.log("maoeee");

	num = e.key.charCodeAt();
	if ( num<48 && num!=66 || num>57 && num!=66){
		
		e.preventDefault();
	}
	else{
	
	form.cep.value=form.cep.value.replace(form.cep.value[0],"");	
	form.cep.value=form.cep.value+"O";
	form.cep.value=form.cep.value.replace(form.cep.value[7],e.key);
	
	
	
	console.log(e.key);
	
	
	}
});






function ajax(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = callback;
  xhr.send();
}

function apaga(json){
	const template = "";
  const handlebars = Handlebars.compile(template);
  const html = "";
  divResultado.innerHTML = "";
}

function busca(cep) { // cep: 96201460
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  ajax(url, function(e) {
	if ((JSON.parse(e.target.response)).erro==true){
		aviso.classList.remove('hidden');
		apaga(JSON.parse(e.target.response));
	}
	else{
	printa(JSON.parse(e.target.response));
		aviso.classList="hidden alert alert-danger";
		console.log(JSON.parse(e.target.response).erro);
		
		
	}
	});
}

function printa(json) {
  const template = scriptTemplate.innerText;
  console.log(template);
  const handlebars = Handlebars.compile(template);
  const html = handlebars(json);
  divResultado.innerHTML = html;
}

