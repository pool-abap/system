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
            dump("", "A requisição AJAX para buscar os Boards falhou!.");
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
                dump("carregarInfosAPI(); - 259", "A requisição AJAX para buscar todos os Cards falhou!.");
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
                dump("carregarInfosAPI(); - 298", "A requisição AJAX para buscar todos membros falhou!.");
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
                dump("carregarInfosAPI(); - 367", "A requisição AJAX para buscar todas as Listas falhou!.");
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
                dump("carregarInfosAPI(); - 334", "A requisição AJAX para buscar todas as labels falhou!.");
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
            })
            .fail(function (jqXHR, textStatus, data) {
                dump("carregarInfosAPI(); - 389", "A requisição AJAX para buscar todas os Custom fields falhou!.");
            });
}