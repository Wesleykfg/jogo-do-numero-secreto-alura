// Criando a variavel e editando o titulo mostrado no site
/*let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do número secreto';*/

// criando variavel e editando a mensagem mostrada no site
/*let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';*/

let listaDeNumerosSorteados =[];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Criando Função de exibir texto na tela e ler o texto com audio
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Criando função da mensagem inicial
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 100');
}

exibirMensagemInicial();

// Criar função do chute informando a quantidade de chutes
function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
        }else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

// Criando função do número aleatorio com o return para informar o numero aleatorio
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

// Criando função de limpar o campo de digitar
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Criando função de reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}