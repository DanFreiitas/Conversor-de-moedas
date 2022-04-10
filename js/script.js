// MAP
let moeda = document.querySelector('#moeda-convertida');

// EVENTOS
document.querySelector('#botao').addEventListener('click', converter);
document.querySelector('#moeda-convertida').addEventListener('change', selectMoeda);

// FUNÇÕES
async function converter() {

    let moedas = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL").then(function(resposta){
    return resposta.json()
    });
    let dolar = moedas.USDBRL.high;
    let euro = moedas.EURBRL.high;


    document.querySelector('#secundaria').style.display = 'block';
    let inputValorEmReal = Number(document.querySelector('#input').value);

    if (moeda.value === '') {
        document.querySelector('#secundaria').style.display = 'none';
    }
    if (moeda.value === 'US$ Dólar americano') {
        let valorDolares = inputValorEmReal / dolar;
        document.querySelector('#input-moedas').innerHTML = valorDolares.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    
    if (moeda.value === '€ Euro') {
        let valorEuro = inputValorEmReal / euro;
        document.querySelector('#input-moedas').innerHTML = valorEuro.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    }
    document.querySelector('#input-real').innerHTML = inputValorEmReal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    
}

function selectMoeda() {
    if (moeda.value === '') {
        document.querySelector('#secundaria').style.display = 'none';
        document.querySelector('#input').value = '';
    }
    if (moeda.value === 'US$ Dólar americano') {
        document.querySelector('#bandeira-convertida').src = './img/eua.png';
        document.querySelector('#moeda').innerHTML = 'Dólar Americano';
        
    }
    if (moeda.value === '€ Euro') {
        document.querySelector('#bandeira-convertida').src = './img/euro.png';
        document.querySelector('#moeda').innerHTML = 'Euro';
        
    }
    document.querySelector('#input-moedas').innerHTML = '';
}

