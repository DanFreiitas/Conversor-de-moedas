// MAP
let moedaOrigem = document.querySelector('#moeda-origem');
let moeda = document.querySelector('#moeda-convertida');

// EVENTOS
document.querySelector('#botao').addEventListener('click', converter);
document.querySelector('#moeda-convertida').addEventListener('change', selectMoeda);

// FUNÇÕES
async function converter() {

    let moedas = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL").then(function(resposta){
        return resposta.json();
    });

    let dolar = moedas.USDBRL.high;
    let euro = moedas.EURBRL.high;

    let inputValor = Number(document.querySelector('#input').value);
    if (!inputValor) return;

    document.querySelector('#secundaria').style.display = 'block';

    if(moedaOrigem.value === moeda.value){
        alert('Você escolheu a mesma moeda para conversão, escolha opções diferentes!');
    }

    // Conversão de Real para outras moedas
    if (moedaOrigem.value === 'R$ Real Brasileiro') {
        document.querySelector('#bandeira-origem').src = './img/brasil.png';
        if (moeda.value === 'US$ Dólar americano') {
            let valorDolares = inputValor / dolar;
            document.querySelector('#input-moedas').innerHTML = valorDolares.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }

        if (moeda.value === '€ Euro') {
            let valorEuro = inputValor / euro;
            document.querySelector('#input-moedas').innerHTML = valorEuro.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
        }
    }
    
    // Conversão de Dólar para Real
    if (moedaOrigem.value === 'US$ Dólar americano') {
        document.querySelector('#bandeira-origem').src = './img/eua.png';
        if (moeda.value === 'R$ Real Brasileiro') {
            let valorReal = inputValor * dolar;
            document.querySelector('#input-moedas').innerHTML = valorReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
        
        if (moeda.value === '€ Euro') {
            let valorEuro = (inputValor * dolar) / euro;
            document.querySelector('#input-moedas').innerHTML = valorEuro.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
        }
    }
    
    // Conversão de Euro para Real
    if (moedaOrigem.value === '€ Euro') {
        document.querySelector('#bandeira-origem').src = './img/euro.png';
        if (moeda.value === 'R$ Real Brasileiro') {
            let valorReal = inputValor * euro;
            document.querySelector('#input-moedas').innerHTML = valorReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }

        if (moeda.value === 'US$ Dólar americano') {
            let valorDolares = (inputValor * euro) / dolar;
            document.querySelector('#input-moedas').innerHTML = valorDolares.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }
    }

    document.querySelector('#input-real').innerHTML = inputValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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

    if (moeda.value === 'R$ Real Brasileiro') {
        document.querySelector('#bandeira-convertida').src = './img/brasil.png';
        document.querySelector('#moeda').innerHTML = 'Real Brasileiro';
    }

    document.querySelector('#input-moedas').innerHTML = '';
}
