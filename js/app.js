var urlApi = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json';
var items = [];
var elements = ['data','dimessi_guariti','totale_positivi','ricoverati_con_sintomi'];

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
        documentEle(elements,items);
    } else{
        console.log('errore nella chiamata');
    }
}

function documentEle(elements,items){
    for(const element of elements){
        var ele = document.querySelector('#' + element);
        ele.innerHTML = items[0][element];
    }
}