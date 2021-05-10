var urlApi = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json';
var items = [];
//const elements = ['data','stato','dimessi_guariti','totale_positivi','ricoverati_con_sintomi','deceduti','tamponi','nuovi_positivi','totale_positivi_test_molecolare','isolamento_domiciliare'];
const elements = ['dimessi_guariti','totale_positivi','ricoverati_con_sintomi','deceduti','tamponi','nuovi_positivi','totale_positivi_test_molecolare','isolamento_domiciliare'];
const daysAgo = 1;

//Invochiamo la classe Ajax
var xhr = new XMLHttpRequest();
// Metodo open per passare i parametri della chiamata asyncrona
xhr.open('GET', urlApi, true);
// Impostazione per la cache
//xhr.setRequestHeader('cache-control', 'max-age=120');
//Inviamo la richiesta al server
xhr.send();
// Metodo per sapere a che punto è la chiamata
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        var resp = xhr.responseText;
        var obj = JSON.parse(resp);
        items = obj;
        timeLampse(daysAgo, items);
    }
}

/**
 * @param {Number} daysAgo - The number
 * @param {Array} items - The array
 */
function timeLampse(daysAgo, items){
    let present,last;

    //Lunghezza array
    let lengthArr = items.length - 1;
    //Recupero indice array temporale
    let arrayTime = lengthArr - daysAgo;
    
    present = items[lengthArr];
    last = items[arrayTime];
    //invoke function
    documentEle(elements, present, last);
}

function documentEle(elements, present, last){
    let message = '';
    let calc;
    for(const element of elements){
        let ele = document.querySelector('#' + element);
        let eleLast = document.querySelector('#' + element + '_last');
        if(element === 'stato' && present[element] === 'ITA'){
            ele.src = 'img/ico/italy.ico';
        }
        ele.innerHTML = present[element];

        if(present[element] > last[element]){
            calc = present[element] - last[element];
            eleLast.classList.add('txt-red');
            message = '+ ' + calc + ' in più rispetto a ' + daysAgo + ' giorno fa';
        }else if(present[element] < last[element]){
            calc = last[element] - present[element];
            eleLast.classList.add('txt-green');
            message = '- ' + calc + ' in meno rispetto a ' + daysAgo + ' giorno fa';
        }
        eleLast.innerHTML = message;
    }
}