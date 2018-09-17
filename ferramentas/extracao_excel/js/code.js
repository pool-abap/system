/* Configs TRELLO */
var key = '0fa63ab5014f860756dcb239e5b03c96';
var token = '8325824adff62c2db66bfd6ab8ee51cff7ceea5f4248c586c7d013a481fe9b7a';

/*Delações de variaveis*/
var url = ""; //Variavel onde vai receber todos os link AJAX

var boards = []; //Array que receberar todos os boards
var listas = []; //Array que vai receber as listas
var cards = []; //Array que vai receber os cards

var labels = []; //Array que vai receber os labels
var menbros = []; //Array qye receberar os membros
var custfields = []; //Parametrizações dos custons
var newsc = []; //Campos custom de todos os cards


/* Inicio Logica */
url = "https://api.trello.com/1/members/me/boards?key=" + key + "&token=" + token; //List Boards
var ajax1 = $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    beforeSend: function () {
        console.log("Buscando Boards...");
    }
})
        .done(function (data) {
            //Montar Array de boards
            for (var i = 0; i < data.length; i++) {
                var array = {
                    'ID': data[i]['id'],
                    'NAME': data[i]['name']
                };
                boards.push(array);
				
				if(data[i]['name'] == "Pool AD - BIOSEV"){
					//abridireto(data[i]);
				}
            }
            console.group("Boards");
            console.log(boards);
            console.groupEnd("Boards");
			montarSelect();
        })
        .fail(function (jqXHR, textStatus, data) {
            throw "A requisição AJAX para buscar os Boards falhou!.";
        });
		
//Se tiver board, montar na tela
function montarSelect() {
	
	document.getElementById("tela02").style.display = "none";
	
    for (var i = 0; i < boards.length; i++) {
        var option = document.createElement("option");
		option.text = boards[i]['NAME'];
		option.value = boards[i]['ID'];
		document.getElementById("inputState").add(option);
    }
}

function gerarRelatorio() {
	document.getElementById("tela01").style.display = "none";
	document.getElementById("tela02").style.display = "block";
	
	var e = document.getElementById("inputState");
    var value = e.options[e.selectedIndex].value;
	
	ajax2(value);
}

function ajax2(id){
	
	//Buscando todos os CARDS do BOARD
    url = "https://api.trello.com/1/boards/" + id + "/cards/?key=" + key + "&token=" + token; //List CARDS
    var ajax2 = $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        beforeSend: function () {
            console.log("Buscando Cards...");
        }
    })
            .done(function (data) {
                cards = data;
                console.group("Cards");
                console.log(cards);
                console.groupEnd("Cards");
				
				setTimeout(function(){ 
					ajax3(id);
				}, 500);
            })
            .fail(function (jqXHR, textStatus, data) {
                throw "A requisição AJAX para buscar todos os Cards falhou!.";
            });
}

function ajax3(id){
	//Buscando todos os MEMBROS do BOARD
    url = "https://api.trello.com/1/boards/" + id + "/memberships/?key=" + key + "&token=" + token + "&orgMemberType=true&member=true&member_fields=fullName&member_fields=avatarUrl";
    var ajax3 = $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
            console.log("Buscando Membros...");
        }
    })
            .done(function (data) {
				menbros = data;
                console.group("Membros");
                console.log(menbros);
                console.groupEnd("Membros");
				
				setTimeout(function(){ 
					ajax5(id);
				}, 500);
            })
            .fail(function (jqXHR, textStatus, data) {
                throw "A requisição AJAX para buscar todos membros falhou!.";
            });
}

function ajax4(id){
	//Buscando todos os LISTAS do BOARD
    url = "https://api.trello.com/1/boards/" + id + "/lists?cards=all&card_fields=all&filter=open&fields=all&key=" + key + "&token=" + token;
    var ajax4 = $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
            console.log("Buscando Listas...");
        }
    })
            .done(function (data) {
                listas = data;
                console.group("Listas");
                console.log(listas);
                console.groupEnd("Listas");
				
				setTimeout(function(){ 
					ajax6(id);
				}, 500);
            })
            .fail(function (jqXHR, textStatus, data) {
                throw "A requisição AJAX para buscar todas as Listas falhou!.";
            });
}

function ajax5(id){
	//Buscando todos os LABEL do BOARD
    url = "https://api.trello.com/1/boards/" + id + "/labels?fields=all&key=" + key + "&token=" + token; //List Labels
    var ajax5 = $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
            console.log("Buscando Labels...");
        }
    })
            .done(function (data) {
                //Montar Labels
                labels = data;
                console.group("Labels");
                console.log(labels);
                console.groupEnd("Labels");
				
				setTimeout(function(){ 
					ajax4(id);
				}, 500);
            })
            .fail(function (jqXHR, textStatus, data) {
                throw "A requisição AJAX para buscar todas as labels falhou!.";
            });
}

function ajax6(id){
	//Buscando parametrizações Custom fields
    url = "https://api.trello.com/1/boards/" + id + "/customFields?key=" + key + "&token=" + token; //List Labels
    var ajax6 = $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
            console.log("Buscando custom fields...");
        }
    })
            .done(function (data) {
                custfields = data;
				console.group("Custons");
                console.log(custfields);
                console.groupEnd("Custons");
				
				setTimeout(function(){ 
					customFidels();
				}, 500);
            })
            .fail(function (jqXHR, textStatus, data) {
                throw "A requisição AJAX para buscar todas os Custom fields falhou!.";
            });
}

function customFidels(){
	
	var ajaxdic = "";
    var ajaxnewcamp = "";
    var total = cards.length - 1;
	
    for (var i = 0; i < cards.length; i++) {
		
        //Buscando todos os campos adicionais individual
        url = "https://api.trello.com/1/cards/" + cards[i][﻿'id'] + "/customFieldItems?key=" + key + "&token=" + token;
        ajaxnewcamp = $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                //console.log("Buscando New Field - " + cards[i][﻿'id']);
            }
        })
                .done(function (data) {
					newsc.push(data);
                })
                .fail(function (jqXHR, textStatus, data) {
                    throw "A requisição AJAX para buscar todos os campos adicionais falhou!.";
                });
        if (i == total) {
            setTimeout(function () {
				
				console.group("News Custons");
                console.log(newsc);
				console.groupEnd();
				
				orgFields();
				
            }, 1500);
        }
    }
}

function orgFields() {
	var arrys = newsc;
	newsc = [];
	
	var said = [];
	
	var type = "";
	
	var id = "";
	var card = "";
	var value = "";
	
	for (n = 0; n < arrys.length; n++) {
		for (z = 0; z < arrys[n].length; z++) {
			
			id = arrys[n][z]['idCustomField'];
			card = arrys[n][z]['idModel'];
			
			for (c = 0; c < custfields.length; c++) {
				if(arrys[n][z]['idCustomField'] == custfields[c]['id']){
					type = custfields[c]['type'];
				}
			}
			
			switch(type){
			
				case "number":
				value = arrys[n][z]['value']['number'];
					break;
					
				case "date":
				var dtemp = arrys[n][z]['value']['date'];
				dtemp = dtemp.split("T");
				value = dtemp[0];
					break;
				
				case "text":
				value = arrys[n][z]['value']['text'];
					break;
					
				case "checkbox":
				if(arrys[n][z]['value']['checked'] == true){
					value = "X";
				} else {
					value = "";
				}
					break;
				
				case "list":
				for (c = 0; c < custfields.length; c++) {
					if(arrys[n][z]['idCustomField'] == custfields[c]['id']){
						for (d = 0; d < custfields[c]['options'].length; d++) {
							if(arrys[n][z]['idValue'] == custfields[c]['options'][d]['id']){
								value = custfields[c]['options'][d]['value']['text'];
							}
						}
					}
				}
					break;
			}

			var arr = {
				'ID': id,
				'CARD': card,
				'VALUE': value
			};
			said.push(arr);
			
			id = "";
			card = "";
			value = "";
		}
	}
	
	
	newsc = said;
	console.warn(newsc);
	excel();
}

function excel(){
	
	var chmd = "";
	var titl = "";
	var desc = "";
	var list = "";
	var dten = "";
	var done = "";
	var etiq = "";
	var cust = "";
	
	for (i = 0; i < cards.length; i++) {
		if(i == 0){
			document.getElementById("tela02").innerHTML += "Chamado;Titulo;Descrição;Lista;Data de Entrega;Concluido;Etiqueta";
			
			for (c = 0; c < custfields.length; c++) {
				document.getElementById("tela02").innerHTML += ";" + custfields[c]['name'];
			}
			
			document.getElementById("tela02").innerHTML += "<br>";
		}
		
		var txt = cards[i]['name'];
		txt = txt.replace("–", "-");
		txt = txt.split("-");
		
		//Montando CHAMADO
		if(txt[0] != undefined){
			chmd = txt[0];
		} else {
			chmd = "";
		}
		
		//Montando TITULO
		if(txt[1] != undefined){
			titl = txt[1];
		} else {
			titl = "";
		}
		
		//Montando Descrição
		if(cards[i]['desc'] != undefined || cards[i]['desc'] != null){
			desc = cards[i]['desc'];
		} else {
			desc = "";
		}
		
		//Montando Lista
		for (l = 0; l < listas.length; l++) {
			if(cards[i]['idList'] == listas[l]['id']){
				list = listas[l]['name'];
			}
		}

		//Montando Data de entrega
		if(cards[i]['due'] != undefined || cards[i]['due'] != null){
			var dats = cards[i]['due'];
			dats = dats.split("T");
			dten = dats[0];
		} else {
			dten = "";
		}
		
		//Montando Concluido
		if(cards[i]['dueComplete'] != false){
			done = "X";
		} else {
			done = "";
		}
		
		//Montando Etiquetas
		for (e = 0; e < labels.length; e++) {
			if(cards[i]['idLabels'] == labels[e]['id']){
				
				if(etiq == ""){
					etiq = labels[e]['name'];
				} else {
					etiq += ",";
					etiq += labels[e]['name'];
				}
				
			}
		}
		
		document.getElementById("tela02").innerHTML += chmd + ";" + titl + ";" + desc + ";" + list + ";" + dten + ";" + done + ";" + etiq ;
		
				
		for (c = 0; c < custfields.length; c++) {
			
			for (y = 0; y < newsc.length; y++) {
				if(custfields[c]['id'] == newsc[y]['ID'] &&
				cards[i]['id'] == newsc[y]['CARD']){
					cust = newsc[y]['VALUE'];
				}
			}
			
			document.getElementById("tela02").innerHTML += ";" + cust;
			cust = "";
		}
		
		document.getElementById("tela02").innerHTML += "<br>";
		
		chmd = "";
		titl = "";
		desc = "";
		list = "";
		dten = "";
		done = "";
		etiq = "";
		cust = "";
	}
}