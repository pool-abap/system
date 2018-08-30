// Obtém a data/hora atual
var data = new Date();
var meses = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
var semana = new Array("Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado");
// Guarda cada pedaço em uma variável
var dia = data.getDate(); // 1-31
var dia_sem = data.getDay(); // 0-6 (zero=domingo)
var mes = data.getMonth(); // 0-11 (zero=janeiro)
var mes1 = mes + 1; // 1-12 (1=janeiro)
var ano2 = data.getYear(); // 2 dígitos
var ano4 = data.getFullYear(); // 4 dígitos
var hora = data.getHours(); // 0-23
var min = data.getMinutes(); // 0-59
var seg = data.getSeconds(); // 0-59
var mseg = data.getMilliseconds(); // 0-999
var tz = data.getTimezoneOffset(); // em minutos

var datahoje = dia + "/" + mes1 + "/" + ano4; // 1/2/2019

var dia0;
var mes10;
if (dia < 10) {
    dia0 = "0" + dia;
} else {
    dia0 = dia;
}
if (mes1 < 10) {
    mes10 = "0" + mes1;
} else {
    mes10 = mes1;
}
var timestamp = ano4 + "/" + mes10 + "/" + dia0; //2018-08-10

var strg_mes = meses[mes];
console.group("Datas");
console.log("Mes - " + strg_mes);
console.groupEnd("Datas");
var protejos = [];

var riscos = false;
//ALTERE SOMENTE AQUI ----------------------------------------------------------------------------------------------------------

var configs = {
    'CFG_NOME': 0, // 0 - Primeiro Nome  1 - Nome Completo
    'CFG_KEY': '0fa63ab5014f860756dcb239e5b03c96', // Key gerada pelo trello para ixibir boards
    'CFG_TOK': '8325824adff62c2db66bfd6ab8ee51cff7ceea5f4248c586c7d013a481fe9b7a', //Token gerado pelo trello para acessar a API
    'CFG_MDC': 10, //Quantidade media IDEAL de chamado por mes - Será usado para os relatorios
    'CFG_ABR': false //Carrega o mes atual sem escolhe em tela
};
var dadoprotj = {
    'NOME': 'Pool AD - BIOSEV', //Nome do projeto
    'IMG': 'http://www.dausina.com.br/imagens/uploads/conteudos/20140815174318KZkjFeRb.png', //Logo marca
	'DATA' : '01/10/2017 00:00',
    'HRSCTR': 175, // Saldos em HORAS
};
protejos.push(dadoprotj);
var dadoprotj = {
    'NOME': 'Pool AD - NLATAM', //Nome do projeto
    'IMG': '', //Logo marca
	'DATA' : '01/08/2017 00:00',
    'HRSCTR': 175, // Saldos em HORAS
};
protejos.push(dadoprotj);
var dadoprotj = {
    'NOME': 'Pool AD - SLATAM', //Nome do projeto
    'IMG': '', //Logo marca
	'DATA' : '01/08/2017 00:00',
    'HRSCTR': 175, // Saldos em HORAS
};
protejos.push(dadoprotj);
console.group("PROJETOS");
console.log(protejos);
console.groupEnd("PPROJETOS");
//-------------------------------------------------------------------------------------------------------------------------------
if (configs['CFG_NOME'] != 0 && configs['CFG_NOME'] != 1) {
    throw "configs['CFG_NOME'] - Está com um valor errado";
}
if (configs['CFG_KEY'] == null || configs['CFG_KEY'] == '') {
    throw "configs['CFG_KEY'] - Está vazio";
}
if (configs['CFG_TOK'] == null || configs['CFG_KEY'] == '') {
    throw "configs['CFG_TOK'] - Está vazio";
}
if (configs['CFG_MDC'] == null || configs['CFG_MDC'] == '') {
    throw "configs['CFG_MDC'] - Está vazio";
}

var key = configs['CFG_KEY'];
var token = configs['CFG_TOK'];
//var cod = "5b3a5ee83bec5319085e12fc"; //Pool AMS Julho

/*Delações de variaveis*/
var url = ""; //Variavel onde vai receber todos os link AJAX

var titulo = "";

var boards = []; //Array que receberar todos os boards
var cards = []; //Array que vai receber os cards
var cards = []; //Dados completos dos cards
var menbros = []; //Array qye receberar os membros
var listas = []; //Array que vai receber as listas
var labels = []; //Array que vai receber os labels
var tempfield = [];
var newfields = []; //Array com todos campos novos criados
var custfields = []; //Parametrizações dos custons
var dmentrg = []; //Demandas entregas

var arrrrs = {
    'NOME': 'Estimativa',
    'ATV': 0,
	'HRS': 0,
    'E.M': 0, 
};
dmentrg.push(arrrrs);
var arrrrs = {
    'NOME': 'Construção',
    'ATV': 0,
	'HRS': 0,
    'E.M': 0, 
};
dmentrg.push(arrrrs);
var arrrrs = {
    'NOME': 'Assessment',
    'ATV': 0,
	'HRS': 0,
    'E.M': 0, 
};
dmentrg.push(arrrrs);

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
	
    if (boards.length > 0) {
        var vldags = false;
        var bodid = "";
        for (var i = 0; i < boards.length; i++) {
            //Verificar se tem com o mes ATUAL para Carregar
            if (boards[i]['NAME'].indexOf("AD " + strg_mes) > -1) {
                vldags = true;
                bodid = boards[i]['ID'];
            }
            //Montar somente com os nomes AD
            if (boards[i]['NAME'].match(/AD/)) {
				var nameptjs;
				for (var y = 0; y < protejos.length; y++) {
				nameptjs = new RegExp(protejos[y]['NOME']);
					if (boards[i]['NAME'].match(nameptjs)) {
						var option = document.createElement("option");
						option.text = boards[i]['NAME'];
						option.value = boards[i]['ID'];
						document.getElementById("inputState").add(option);
					}
				}
            }
        }
    } else {
        console.log("Vazio");
    }
}

function gerarRelatorio() {
    var e = document.getElementById("inputState");
    var value = e.options[e.selectedIndex].value;
    var text = e.options[e.selectedIndex].text;
	titulo = text;
    console.log(value);
    console.log(text);
    document.getElementById("tela-01").style.opacity = 0.0;
    document.getElementById("tela-01").style.display = "none";
    document.getElementById("tela-02").style.opacity = 1.0;
	for (var pj = 0; pj < protejos.length; pj++) {
		if(protejos[pj]['NOME'] == titulo){
			document.getElementById("titulo").innerHTML = protejos[pj]['NOME'];
			if(protejos[pj]['IMG'] != ""){
				document.getElementById("info-board").innerHTML += "<img id='prjt-img' class='prjt-img'>";
				document.getElementById("prjt-img").src = protejos[pj]['IMG'];
				document.getElementById("prjt-img").title = protejos[pj]['NOME'];
			}
		}
	}
    carregarInfosAPI(value);
}

function abridireto(ar){
	
	titulo = ar['name'];
	
	for (var pj = 0; pj < protejos.length; pj++) {
		if(protejos[pj]['NOME'] == ar['name']){
			document.getElementById("titulo").innerHTML = protejos[pj]['NOME'];
			if(protejos[pj]['IMG'] != ""){
				document.getElementById("info-board").innerHTML += "<img id='prjt-img' class='prjt-img'>";
				document.getElementById("prjt-img").src = protejos[pj]['IMG'];
				document.getElementById("prjt-img").title = protejos[pj]['NOME'];
			}
		}
	}
	
	document.getElementById("tela-01").style.opacity = 0.0;
    document.getElementById("tela-01").style.display = "none";
    document.getElementById("tela-02").style.opacity = 1.0;
	carregarInfosAPI(ar['id']);
}

//Puxar infos do site
function carregarInfosAPI(id) {

    console.group("Board");
    console.log(id);
    console.groupEnd("Board");

    //Buscando todos os CARDS do BOARD
    url = "https://api.trello.com/1/boards/" + id + "/cards/?key=" + key + "&token=" + token; //List CARDS
    var ajax2 = $.ajax({
        url: url,
        type: 'GET',
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
                processarDados();
            })
            .fail(function (jqXHR, textStatus, data) {
                dump("carregarInfosAPI();", "A requisição AJAX para buscar todos os Cards falhou!.");
            });
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
                for (var i = 0; i < data.length; i++) {
                    var imggg = "";
                    if (data[i]['member']['avatarUrl'] == null) {
                        imggg = "https://i.imgur.com/LuX2uKH.jpg";
                    } else {
                        imggg = data[i]['member']['avatarUrl'];
                    }
                    var array = {
                        'ID': data[i]['idMember'],
                        'USER': data[i]['member']['fullName'],
                        'IMG': imggg
                    };
                    menbros.push(array);
                }
                console.group("Membros");
                console.log(menbros);
                console.groupEnd("Membros");
            })
            .fail(function (jqXHR, textStatus, data) {
                dump("carregarInfosAPI();", "A requisição AJAX para buscar todos membros falhou!.");
            });
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
                for (var i = 0; i < data.length; i++) {
                    var lb = {
                        'ID': data[i]['id'],
                        'NAME': data[i]['name'],
                        'COR': data[i]['color'],
						'HRS': 0,
                        'QNT': 0
                    };
                    labels.push(lb);
                }
                console.group("Labels");
                console.log(labels);
                console.groupEnd("Labels");
            })
            .fail(function (jqXHR, textStatus, data) {
                dump("carregarInfosAPI();", "A requisição AJAX para buscar todas as labels falhou!.");
            });
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
                for (var i = 0; i < data.length; i++) {

                    var array = {
                        'ID': data[i]['id'],
                        'NAME': data[i]['name']
                    };
                    listas.push(array);
                }
                console.group("Listas");
                console.log(listas);
                console.groupEnd("Listas");
            })
            .fail(function (jqXHR, textStatus, data) {
                dump("carregarInfosAPI();", "A requisição AJAX para buscar todas as Listas falhou!.");
            });
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
                for (var y = 0; y < data.length; y++) {
                    custfields.push(data[y]);
                }
            })
            .fail(function (jqXHR, textStatus, data) {
                dump("carregarInfosAPI();", "A requisição AJAX para buscar todas os Custom fields falhou!.");
            });
}

function processarDados() {
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
                    for (var y = 0; y < data.length; y++) {
                        tempfield.push(data[y]);
                    }
                })
                .fail(function (jqXHR, textStatus, data) {
                    dump("processarDados();", "A requisição AJAX para buscar todos os campos adicionais falhou!.");
                });
        if (i == total) {
            setTimeout(function () {
                //Funções de exibição
                orgNewFields();
                ListasXCards();
                mntListasLabels();
                saldoMes();
                calcArrRLT();
                calcArrRLTBar();
                rltLine();
                rltBar();
				rltLinEst();
            }, 1300);
        }
    }
}

function orgNewFields() {

    var arraystemps = {
        'CARDID': "", // Id do card
		'EP': 0, //Estimativa prevista
        'HF1': 0, // Hora 1
        'HF2': 0, // Hota 2
        'DF1': "", // Data 1
        'DF2': "" // Data 2
    };
	
	console.log(tempfield);
	console.log(custfields);
    for (var n = 0; n < tempfield.length; n++) {
		
        arraystemps['CARDID'] = tempfield[n]['idModel'];

        for (var t = 0; t < custfields.length; t++) {

            if (tempfield[n]['idCustomField'] == custfields[t]['id']) {
                switch (custfields[t]['name']) {
                    case "EP":
                        arraystemps['EP'] = parseInt(tempfield[n]['value']['number']);
                        break;

                    case "H.F.1":
                        arraystemps['HF1'] = parseInt(tempfield[n]['value']['number']);
                        break;

                    case "H.F.2":
                        arraystemps['HF2'] = parseInt(tempfield[n]['value']['number']);
                        break;

                    case "D.F.1":
                        var ddf = tempfield[n]['value']['date'];
                        ddf = ddf.split("T");
                        arraystemps['DF1'] = ddf[0];
                        break;

                    case "D.F.2":
                        var ddf = tempfield[n]['value']['date'];
                        ddf = ddf.split("T");
                        arraystemps['DF2'] = ddf[0];
                        break;
                }
            }
        }

        newfields.push(arraystemps);

        arraystemps = {
            'CARDID': "", // Id do card
            'EP': 0, //Estimativa prevista
            'HF1': 0, // Hora 1
            'HF2': 0, // Hota 2
            'DF1': "", // Data 1
            'DF2': "" // Data 2
        };
    }

    var corg = newfields;
    newfields = [];
    var total = corg.length - 1;

    var card1 = "";
    var cardpr = "";

	var ep = 0;
    var shf1 = 0;
    var shf2 = 0;
    var df1 = "";
    var df2 = "";

    for (var a = 0; a < corg.length; a++) {

        cardpr = corg[a]['CARDID'];

        if (card1 == "") {
            card1 = corg[a]['CARDID'];
        }

        if (card1 != cardpr) {

            var arraystemps = {
                'CARDID': card1, // Id do card
                'EP': ep, //Estimativa prevista
                'HF1': shf1, // Hora 1
                'HF2': shf2, // Hota 2
                'DF1': df1, // Data 1
                'DF2': df2 // Data 2
            };
            newfields.push(arraystemps);

            card1 = corg[a]['CARDID'];
			
			ep = corg[a]['EP'];
            shf1 = corg[a]['HF1'];
            shf2 = corg[a]['HF2'];

            if (corg[a]['DF1'] != "") {
                df1 = corg[a]['DF1'];
            }
            if (corg[a]['DF2'] != "") {
                df2 = corg[a]['DF2'];
            }

        } else {
			ep = ep + corg[a]['EP'];
            shf1 = shf1 + corg[a]['HF1'];
            shf2 = shf2 + corg[a]['HF2'];

            if (corg[a]['DF1'] != "") {
                df1 = corg[a]['DF1'];
            }
            if (corg[a]['DF2'] != "") {
                df2 = corg[a]['DF2'];
            }
        }

        if (a == total) {

            var arraystemps = {
                'CARDID': corg[a]['CARDID'], // Id do card
                'EP': ep, //Estimativa prevista
                'HF1': shf1, // Hora 1
                'HF2': shf2, // Hota 2
                'DF1': df1, // Data 1
                'DF2': df2 // Data 2
            };
            newfields.push(arraystemps);

            console.group("NewCampos");
            console.log(newfields);
            console.groupEnd("NewCampos");
        }
    }
}

var tlpipeline = 0;
function ListasXCards() {

    var impedimentos = {
        'DONE': 0, // Card Feito
        'NDON': 0, // Card Não Feito
        'TOTL': 0, // Total de Card
        'DPRZ': 0, // Dentro Prazo
        'FPRZ': 0, // Dentro Prazo
        'THRS': 0, // Total horas
    };
    var desenho = {
        'DONE': 0, // Card Feito
        'NDON': 0, // Card Não Feito
        'TOTL': 0, // Total de Card
        'DPRZ': 0, // Dentro Prazo
        'FPRZ': 0, // Dentro Prazo
        'THRS': 0, // Total horas
    };
    var aprovdesenho = {
        'DONE': 0, // Card Feito
        'NDON': 0, // Card Não Feito
        'TOTL': 0, // Total de Card
        'DPRZ': 0, // Dentro Prazo
        'FPRZ': 0, // Dentro Prazo
        'THRS': 0, // Total horas
    };
    var construcao = {
        'DONE': 0, // Card Feito
        'NDON': 0, // Card Não Feito
        'TOTL': 0, // Total de Card
        'DPRZ': 0, // Dentro Prazo
        'FPRZ': 0, // Dentro Prazo
        'THRS': 0, // Total horas
    };
    var testuser = {
        'DONE': 0, // Card Feito
        'NDON': 0, // Card Não Feito
        'TOTL': 0, // Total de Card
        'DPRZ': 0, // Dentro Prazo
        'FPRZ': 0, // Dentro Prazo
        'THRS': 0, // Total horas
    };
    var precab = {
        'DONE': 0, // Card Feito
        'NDON': 0, // Card Não Feito
        'TOTL': 0, // Total de Card
        'DPRZ': 0, // Dentro Prazo
        'FPRZ': 0, // Dentro Prazo
        'THRS': 0, // Total horas
    };
    var suportgolive = {
        'DONE': 0, // Card Feito
        'NDON': 0, // Card Não Feito
        'TOTL': 0, // Total de Card
        'DPRZ': 0, // Dentro Prazo
        'FPRZ': 0, // Dentro Prazo
        'THRS': 0, // Total horas
    };
    var implementado = {
        'DONE': 0, // Card Feito
        'NDON': 0, // Card Não Feito
        'TOTL': 0, // Total de Card
        'DPRZ': 0, // Dentro Prazo
        'FPRZ': 0, // Dentro Prazo
        'THRS': 0, // Total horas
    };
    var pipeline = {
        'DONE': 0, // Card Feito
        'NDON': 0, // Card Não Feito
        'TOTL': 0, // Total de Card
        'DPRZ': 0, // Dentro Prazo
        'FPRZ': 0, // Dentro Prazo
        'THRS': 0, // Total horas
    };

    var reprovs = {
        'DONE': 0, // Card Feito
        'NDON': 0, // Card Não Feito
        'TOTL': 0, // Total de Card
        'DPRZ': 0, // Dentro Prazo
        'FPRZ': 0, // Dentro Prazo
        'THRS': 0, // Total horas
    };

    for (var i = 0; i < cards.length; i++) {
        for (var y = 0; y < listas.length; y++) {
            if (cards[i]['idList'] == listas[y]['ID']) {

                if (cards[i]['due'] == null) {
                    dump("ListasXCards();", "O card " + cards[i]['name'] + " não possui data de entrega.");
                }

                switch (listas[y]['NAME']) {
                    case "Impedimentos":
                        if (cards[i]['dueComplete']) {
                            impedimentos['DONE'] = impedimentos['DONE'] + 1;
                        } else {
                            impedimentos['NDON'] = impedimentos['NDON'] + 1;

                            if (dataNoPrazo(cards[i]['due'])) {
                                impedimentos['DPRZ'] = impedimentos['DPRZ'] + 1;
                            } else {
                                impedimentos['FPRZ'] = impedimentos['FPRZ'] + 1;
                                riscos = true;
                            }
                        }
                        impedimentos['TOTL'] = impedimentos['TOTL'] + 1;

                        for (var n = 0; n < newfields.length; n++) {
                            if (newfields[n]['CARDID'] == cards[i]['id']) {
                                impedimentos['THRS'] = impedimentos['THRS'] + newfields[n]['HF1'];
                                break;
                            }
                        }
                        break;

                    case "Desenho":
                        if (cards[i]['dueComplete']) {
                            desenho['DONE'] = desenho['DONE'] + 1;
                        } else {
                            desenho['NDON'] = desenho['NDON'] + 1;

                            if (dataNoPrazo(cards[i]['due'])) {
                                desenho['DPRZ'] = desenho['DPRZ'] + 1;
                            } else {
                                desenho['FPRZ'] = desenho['FPRZ'] + 1;
                                riscos = true;
                            }
                        }
                        desenho['TOTL'] = desenho['TOTL'] + 1;

                        for (var n = 0; n < newfields.length; n++) {
                            if (newfields[n]['CARDID'] == cards[i]['id']) {
                                desenho['THRS'] = desenho['THRS'] + newfields[n]['HF1'];
                                break;
                            }
                        }
                        break;

                    case "Aprovação da EF (BP/Usuário)":
                        if (cards[i]['dueComplete']) {
                            aprovdesenho['DONE'] = aprovdesenho['DONE'] + 1;
                        } else {
                            aprovdesenho['NDON'] = aprovdesenho['NDON'] + 1;

                            if (dataNoPrazo(cards[i]['due'])) {
                                aprovdesenho['DPRZ'] = aprovdesenho['DPRZ'] + 1;
                            } else {
                                aprovdesenho['FPRZ'] = aprovdesenho['FPRZ'] + 1;
                                riscos = true;
                            }
                        }
                        aprovdesenho['TOTL'] = aprovdesenho['TOTL'] + 1;

                        for (var n = 0; n < newfields.length; n++) {
                            if (newfields[n]['CARDID'] == cards[i]['id']) {
                                aprovdesenho['THRS'] = aprovdesenho['THRS'] + newfields[n]['HF1'];
                                break;
                            }
                        }
                        break;

                    case "Construção Funcional":
                        if (cards[i]['dueComplete']) {
                            construcao['DONE'] = construcao['DONE'] + 1;
                        } else {
                            construcao['NDON'] = construcao['NDON'] + 1;

                            if (dataNoPrazo(cards[i]['due'])) {
                                construcao['DPRZ'] = construcao['DPRZ'] + 1;
                            } else {
                                construcao['FPRZ'] = construcao['FPRZ'] + 1;
                                riscos = true;
                            }
                        }
                        construcao['TOTL'] = construcao['TOTL'] + 1;

                        for (var n = 0; n < newfields.length; n++) {
                            if (newfields[n]['CARDID'] == cards[i]['id']) {
                                construcao['THRS'] = construcao['THRS'] + newfields[n]['HF1'];
                                break;
                            }
                        }
                        break;

                    case "Construção Abap":
                        if (cards[i]['dueComplete']) {
                            construcao['DONE'] = construcao['DONE'] + 1;
                        } else {
                            construcao['NDON'] = construcao['NDON'] + 1;

                            if (dataNoPrazo(cards[i]['due'])) {
                                construcao['DPRZ'] = construcao['DPRZ'] + 1;
                            } else {
                                construcao['FPRZ'] = construcao['FPRZ'] + 1;
                                riscos = true;
                            }
                        }
                        construcao['TOTL'] = construcao['TOTL'] + 1;

                        for (var n = 0; n < newfields.length; n++) {
                            if (newfields[n]['CARDID'] == cards[i]['id']) {
                                construcao['THRS'] = construcao['THRS'] + newfields[n]['HF1'];
                                break;
                            }
                        }
                        break;

                    case "Teste Funcional":
                        if (cards[i]['dueComplete']) {
                            construcao['DONE'] = construcao['DONE'] + 1;
                        } else {
                            construcao['NDON'] = construcao['NDON'] + 1;

                            if (dataNoPrazo(cards[i]['due'])) {
                                construcao['DPRZ'] = construcao['DPRZ'] + 1;
                            } else {
                                construcao['FPRZ'] = construcao['FPRZ'] + 1;
                                riscos = true;
                            }
                        }
                        construcao['TOTL'] = construcao['TOTL'] + 1;

                        for (var n = 0; n < newfields.length; n++) {
                            if (newfields[n]['CARDID'] == cards[i]['id']) {
                                construcao['THRS'] = construcao['THRS'] + newfields[n]['HF1'];
                                break;
                            }
                        }
                        break;

                    case "Liberação de Acesso":
                        if (cards[i]['dueComplete']) {
                            construcao['DONE'] = construcao['DONE'] + 1;
                        } else {
                            construcao['NDON'] = construcao['NDON'] + 1;

                            if (dataNoPrazo(cards[i]['due'])) {
                                construcao['DPRZ'] = construcao['DPRZ'] + 1;
                            } else {
                                construcao['FPRZ'] = construcao['FPRZ'] + 1;
                                riscos = true;
                            }
                        }
                        construcao['TOTL'] = construcao['TOTL'] + 1;

                        for (var n = 0; n < newfields.length; n++) {
                            if (newfields[n]['CARDID'] == cards[i]['id']) {
                                construcao['THRS'] = construcao['THRS'] + newfields[n]['HF1'];
                                break;
                            }
                        }
                        break;

                    case "Teste do Usuário":
                        if (cards[i]['dueComplete']) {
                            testuser['DONE'] = testuser['DONE'] + 1;
                        } else {
                            testuser['NDON'] = testuser['NDON'] + 1;

                            if (dataNoPrazo(cards[i]['due'])) {
                                testuser['DPRZ'] = testuser['DPRZ'] + 1;
                            } else {
                                testuser['FPRZ'] = testuser['FPRZ'] + 1;
                                riscos = true;
                            }
                        }
                        testuser['TOTL'] = testuser['TOTL'] + 1;

                        for (var n = 0; n < newfields.length; n++) {
                            if (newfields[n]['CARDID'] == cards[i]['id']) {
                                testuser['THRS'] = testuser['THRS'] + newfields[n]['HF1'];
                                break;
                            }
                        }
                        break;

                    case "Preparação CAB":
                        if (cards[i]['dueComplete']) {
                            precab['DONE'] = precab['DONE'] + 1;
                        } else {
                            precab['NDON'] = precab['NDON'] + 1;

                            if (dataNoPrazo(cards[i]['due'])) {
                                precab['DPRZ'] = precab['DPRZ'] + 1;
                            } else {
                                precab['FPRZ'] = precab['FPRZ'] + 1;
                                riscos = true;
                            }
                        }
                        precab['TOTL'] = precab['TOTL'] + 1;

                        for (var n = 0; n < newfields.length; n++) {
                            if (newfields[n]['CARDID'] == cards[i]['id']) {
                                precab['THRS'] = precab['THRS'] + newfields[n]['HF1'];
                                break;
                            }
                        }
                        break;

                    case "Pós Implantação":
                        if (cards[i]['dueComplete']) {
                            suportgolive['DONE'] = suportgolive['DONE'] + 1;
                        } else {
                            suportgolive['NDON'] = suportgolive['NDON'] + 1;

                            if (dataNoPrazo(cards[i]['due'])) {
                                suportgolive['DPRZ'] = suportgolive['DPRZ'] + 1;
                            } else {
                                suportgolive['FPRZ'] = suportgolive['FPRZ'] + 1;
                                riscos = true;
                            }
                        }
                        suportgolive['TOTL'] = suportgolive['TOTL'] + 1;

                        for (var n = 0; n < newfields.length; n++) {
                            if (newfields[n]['CARDID'] == cards[i]['id']) {
                                suportgolive['THRS'] = suportgolive['THRS'] + newfields[n]['HF1'];
                                break;
                            }
                        }
                        break;

                    case "Done":
                        if (cards[i]['dueComplete']) {
                            implementado['DONE'] = implementado['DONE'] + 1;
                        } else {
                            implementado['NDON'] = implementado['NDON'] + 1;

                            if (dataNoPrazo(cards[i]['due'])) {
                                implementado['DPRZ'] = implementado['DPRZ'] + 1;
                            } else {
                                implementado['FPRZ'] = implementado['FPRZ'] + 1;
                                riscos = true;
                            }
                        }
                        implementado['TOTL'] = implementado['TOTL'] + 1;

                        for (var n = 0; n < newfields.length; n++) {
                            if (newfields[n]['CARDID'] == cards[i]['id']) {
                                implementado['THRS'] = implementado['THRS'] + newfields[n]['HF1'];
                                break;
                            }
                        }
                        break;

                    case "Estimativas Em execução":
                        /*if (cards[i]['dueComplete']) {
                         pipeline['DONE'] = pipeline['DONE'] + 1;
                         } else {
                         pipeline['NDON'] = pipeline['NDON'] + 1;
                         
                         if (dataNoPrazo(cards[i]['due'])) {
                         pipeline['DPRZ'] = pipeline['DPRZ'] + 1;
                         } else {
                         pipeline['FPRZ'] = pipeline['FPRZ'] + 1;
                         riscos = true;
                         }
                         }
                         pipeline['TOTL'] = pipeline['TOTL'] + 1;
                         
                         for (var n = 0; n < newfields.length; n++) {
                         if (newfields[n]['CARDID'] == cards[i]['id']) {
                         pipeline['THRS'] = pipeline['THRS'] + newfields[n]['HF1'];
                         break;
                         }
                         }*/
                        break;

                    case "Estimativas - Aguardando Aprovação":
                        if (cards[i]['dueComplete']) {
                            pipeline['DONE'] = pipeline['DONE'] + 1;
                        } else {
                            pipeline['NDON'] = pipeline['NDON'] + 1;

                            if (dataNoPrazo(cards[i]['due'])) {
                                pipeline['DPRZ'] = pipeline['DPRZ'] + 1;
                            } else {
                                pipeline['FPRZ'] = pipeline['FPRZ'] + 1;
                                riscos = true;
                            }
                        }
                        pipeline['TOTL'] = pipeline['TOTL'] + 1;

                        for (var n = 0; n < newfields.length; n++) {
                            if (newfields[n]['CARDID'] == cards[i]['id']) {
                                pipeline['THRS'] = pipeline['THRS'] + newfields[n]['EP'];
                                break;
                            }
                        }
                        break;

                    case "Estimativas Aprovadas":
                        /*if (cards[i]['dueComplete']) {
                         pipeline['DONE'] = pipeline['DONE'] + 1;
                         } else {
                         pipeline['NDON'] = pipeline['NDON'] + 1;
                         
                         if (dataNoPrazo(cards[i]['due'])) {
                         pipeline['DPRZ'] = pipeline['DPRZ'] + 1;
                         } else {
                         pipeline['FPRZ'] = pipeline['FPRZ'] + 1;
                         riscos = true;
                         }
                         }
                         pipeline['TOTL'] = pipeline['TOTL'] + 1;
                         
                         for (var n = 0; n < newfields.length; n++) {
                         if (newfields[n]['CARDID'] == cards[i]['id']) {
                         pipeline['THRS'] = pipeline['THRS'] + newfields[n]['HF1'];
                         break;
                         }
                         }*/
                        break;

                    case "Estimativas Reprovadas/Canceladas":
                        if (cards[i]['dueComplete']) {
                            reprovs['DONE'] = reprovs['DONE'] + 1;
                        } else {
                            reprovs['NDON'] = reprovs['NDON'] + 1;

                            if (dataNoPrazo(cards[i]['due'])) {
                                reprovs['DPRZ'] = reprovs['DPRZ'] + 1;
                            } else {
                                reprovs['FPRZ'] = reprovs['FPRZ'] + 1;
                                riscos = true;
                            }
                        }
                        reprovs['TOTL'] = reprovs['TOTL'] + 1;

                        for (var n = 0; n < newfields.length; n++) {
                            if (newfields[n]['CARDID'] == cards[i]['id']) {
                                reprovs['THRS'] = reprovs['THRS'] + newfields[n]['HF1'];
                                break;
                            }
                        }
                        break;

                    case "Assessment":
                        break;

                    default:
                        dump("ListasXCards();", "A lista " + listas[y]['NAME'] + " não foi mapeada na função.");
                        break;
                }
            }
        }


    }
    //Impedimentos
    console.log(impedimentos);
    if (impedimentos['FPRZ'] > 0) {
        document.getElementById("impedimentos-totl").style.color = "#ed0404";
        document.getElementById("impedimentos-totl").style.fontWeight = "bold";
    }
    document.getElementById("impedimentos-totl").innerHTML = impedimentos['TOTL'];
    document.getElementById("impedimentos-thrs").innerHTML = impedimentos['THRS'] + "h";
    //Desenho
    console.log(desenho);
    if (desenho['FPRZ'] > 0) {
        document.getElementById("desenho-totl").style.color = "#ed0404";
        document.getElementById("desenho-totl").style.fontWeight = "bold";
    }
    document.getElementById("desenho-totl").innerHTML = desenho['TOTL'];
    document.getElementById("desenho-thrs").innerHTML = desenho['THRS'] + "h";
    //Aprovação da EF BP/Usuário
    console.log(aprovdesenho);
    if (aprovdesenho['FPRZ'] > 0) {
        document.getElementById("aprovdesenho-totl").style.color = "#ed0404";
        document.getElementById("aprovdesenho-totl").style.fontWeight = "bold";
    }
    document.getElementById("aprovdesenho-totl").innerHTML = aprovdesenho['TOTL'];
    document.getElementById("aprovdesenho-thrs").innerHTML = aprovdesenho['THRS'] + "h";
    //Contrução
    console.log(construcao);
    if (construcao['FPRZ'] > 0) {
        document.getElementById("construcao-totl").style.color = "#ed0404";
        document.getElementById("construcao-totl").style.fontWeight = "bold";
    }
    document.getElementById("construcao-totl").innerHTML = construcao['TOTL'];
    document.getElementById("construcao-thrs").innerHTML = construcao['THRS'] + "h";
    //Teste Usuário
    console.log(testuser);
    if (testuser['FPRZ'] > 0) {
        document.getElementById("testuser-totl").style.color = "#ed0404";
        document.getElementById("testuser-totl").style.fontWeight = "bold";
    }
    document.getElementById("testuser-totl").innerHTML = testuser['TOTL'];
    document.getElementById("testuser-thrs").innerHTML = testuser['THRS'] + "h";
    //CAB
    console.log(precab);
    if (precab['FPRZ'] > 0) {
        document.getElementById("precab-totl").style.color = "#ed0404";
        document.getElementById("precab-totl").style.fontWeight = "bold";
    }
    document.getElementById("precab-totl").innerHTML = precab['TOTL'];
    document.getElementById("precab-thrs").innerHTML = precab['THRS'] + "h";
    //Pós GOLIVE
    console.log(suportgolive);
    if (suportgolive['FPRZ'] > 0) {
        document.getElementById("suportgolive-totl").style.color = "#ed0404";
        document.getElementById("suportgolive-totl").style.fontWeight = "bold";
    }
    document.getElementById("suportgolive-totl").innerHTML = suportgolive['TOTL'];
    document.getElementById("suportgolive-thrs").innerHTML = suportgolive['THRS'] + "h";
    //Implementado
    console.log(implementado);
    if (implementado['FPRZ'] > 0) {
        document.getElementById("implementado-totl").style.color = "#ed0404";
        document.getElementById("implementado-totl").style.fontWeight = "bold";
    }
    document.getElementById("implementado-totl").innerHTML = implementado['TOTL'];
    document.getElementById("implementado-thrs").innerHTML = implementado['THRS'] + "h";
    //PIPELINE
    console.log(pipeline);
	tlpipeline = pipeline['TOTL'];
    if (pipeline['TOTL'] == 0) {
        document.getElementById("pipeline-totl").style.color = "#ed0404";
        document.getElementById("pipeline-totl").style.fontWeight = "bold";
    } else {
		document.getElementById("pipeline-totl").style.color = "#fff";
	}
    document.getElementById("pipeline-totl").innerHTML = pipeline['TOTL'];
	document.getElementById("pipeline-thrs").innerHTML = pipeline['THRS'] + "h";

    //Reprovs
    document.getElementById("reprovs-totl").innerHTML = reprovs['TOTL'] + " tarefa(s)";
    document.getElementById("reprovs-thrs").innerHTML = reprovs['THRS'] + "h";

    risco();
	tableEntre();
}

//AAAA-MM-DD
function dataNoPrazo(dt1) {

    var dataatual = new Date();
    var diaatual = dataatual.getDate(); //1-31
    var mesatual = dataatual.getMonth(); //0-11
    mesatual++; //1-12 ajustar
    var anoatual = dataatual.getFullYear(); //4 dígitos

    var datahoje = diaatual + '/' + mesatual + '/' + anoatual;

    var ddt1 = dt1.split("-");

    var newdt1 = ddt1[2] + "/" + ddt1[1] + "/" + ddt1[0] + " 00:00";
    var ddthjoe = datahoje + " 00:00";

    var data1 = moment(newdt1, "DD/MM/YYYY hh:mm");
    var data2 = moment(ddthjoe, "DD/MM/YYYY hh:mm");
    var diferenca = data1.diff(data2, 'days');

    if (diferenca < 0) {
        //Se a data 1 for menor que a data de hoje
        return false;
    } else {
        //Se a data 1 for maior que a data de hoje
        return true;
    }
}

function mntListasLabels() {

    for (var i = 0; i < cards.length; i++) {
        for (var z = 0; z < cards[i]['idLabels'].length; z++) {
            for (var y = 0; y < labels.length; y++) {
				for (var x = 0; x < listas.length; x++) {
					for (var n = 0; n < newfields.length; n++) {
						if (cards[i]['idLabels'][z] == labels[y]['ID'] &&
							cards[i]['idList'] == listas[x]['ID'] &&
							newfields[n]['CARDID'] == cards[i]['id']){
							
							if (listas[x]['NAME'] == "Estimativas - Aguardando Aprovação") {
								labels[y]['HRS'] = labels[y]['HRS'] + newfields[n]['EP'];
								labels[y]['QNT'] = labels[y]['QNT'] + 1;
							}
						}
					}
				}
            }
        }
    }

	for (var i = 0; i < labels.length; i++) {
		if(labels[i]['QNT'] > 0){
			var porc = (labels[i]['QNT'] / tlpipeline) * 100;
			labels[i]['QNT'] = leftPad(labels[i]['QNT'], 2);
			porc = porc.toFixed(0);
			porc = leftPad(porc, 2);
			var div = "<div class='etiq'><p>" + labels[i]['NAME'] + "</p><h4>" + labels[i]['QNT'] + " &nbsp; - &nbsp; " + labels[i]['HRS'] + "hrs</h4><div class='progress'><div class='progress-bar' role='progressbar' style='width:" + porc + "%; background-color: " + labels[i]['COR'] + ";' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div></div></div>";
			document.getElementById("div-labels").innerHTML += div;
		}
    }
}

function dump(func, txt) {

    if (document.getElementById("dump").style.opacity == 1.0) {
        return;
    }

    document.getElementById("tela-01").style.opacity = 0.0;
    document.getElementById("tela-01").style.display = "none";
    document.getElementById("tela-02").style.opacity = 0.0;
    document.getElementById("tela-02").style.display = "none";
    document.getElementById("dump").style.opacity = 1.0;
    document.getElementById("func-dump").innerHTML = "Função : " + func;
    document.getElementById("txt-dump").innerHTML = txt;
    throw new Error(txt);
}

function montarData() {
    // Obtém a data/hora atual
    var data = new Date();
    var meses = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
    var semana = new Array("Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado");
    // Guarda cada pedaço em uma variável
    var dia = data.getDate(); // 1-31
    var dia_sem = data.getDay(); // 0-6 (zero=domingo)
    var mes = data.getMonth(); // 0-11 (zero=janeiro)
    var ano2 = data.getYear(); // 2 dígitos
    var ano4 = data.getFullYear(); // 4 dígitos
    var hora = data.getHours(); // 0-23
    var min = data.getMinutes(); // 0-59
    var seg = data.getSeconds(); // 0-59
    var mseg = data.getMilliseconds(); // 0-999
    var tz = data.getTimezoneOffset(); // em minutos

    dia = leftPad(dia, 2);
    ano4 = leftPad(ano4, 4);
    ano2 = leftPad(ano2, 2);
    hora = leftPad(hora, 2);
    min = leftPad(min, 2);
    seg = leftPad(seg, 2);
    // Formata a data e a hora (note o mês + 1)
    var str_data = dia + ' ' + meses[mes] + ' ' + ano4;
    var str_hora = hora + ':' + min + ':' + seg;
    // Mostra o resultado
    document.getElementById('data-board').innerHTML = str_data;
}

function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

function risco() {
    if (riscos) {
        document.getElementById("img-alert").style.opacity = 1.0;
    }
}

function tableEntre(){
	
	for (var i = 0; i < cards.length; i++) {
        for (var x = 0; x < listas.length; x++) {
			for (var n = 0; n < newfields.length; n++) {
				if (newfields[n]['CARDID'] == cards[i]['id'] &&
					cards[i]['idList'] == listas[x]['ID']){
							
					if (listas[x]['NAME'] == "Estimativas Aprovadas" ||
						listas[x]['NAME'] == "Estimativas Reprovadas/Canceladas" ||
						listas[x]['NAME'] == "Estimativas - Aguardando Aprovação") {
						
						for (var y = 0; y < dmentrg.length; y++) {
							if(dmentrg[y]['NOME'] == "Estimativa"){
								dmentrg[y]['ATV'] = dmentrg[y]['ATV'] + 1;
								dmentrg[y]['HRS'] = dmentrg[y]['HRS'] + newfields[n]['HF1'] + newfields[n]['HF2'];
							}
						}						
					}
					
					if (listas[x]['NAME'] == "Impedimentos" ||
						listas[x]['NAME'] == "Desenho" ||
						listas[x]['NAME'] == "Aprovação da EF (BP/Usuário)" ||
						listas[x]['NAME'] == "Construção Funcional" ||
						listas[x]['NAME'] == "Construção Abap" ||
						listas[x]['NAME'] == "Liberação de Acesso" ||
						listas[x]['NAME'] == "Teste Funcional" ||
						listas[x]['NAME'] == "Teste do Usuário" ||
						listas[x]['NAME'] == "Preparação CAB" ||
						listas[x]['NAME'] == "Pós Implantação" ||
						listas[x]['NAME'] == "Done") {
						
						for (var y = 0; y < dmentrg.length; y++) {
							if(dmentrg[y]['NOME'] == "Construção"){
								dmentrg[y]['ATV'] = dmentrg[y]['ATV'] + 1;
								dmentrg[y]['HRS'] = dmentrg[y]['HRS'] + newfields[n]['HF1'] + newfields[n]['HF2'];
							}
						}						
					}
					
					if (listas[x]['NAME'] == "Assessment") {
						
						for (var y = 0; y < dmentrg.length; y++) {
							if(dmentrg[y]['NOME'] == "Assessment"){
								dmentrg[y]['ATV'] = dmentrg[y]['ATV'] + 1;
								dmentrg[y]['HRS'] = dmentrg[y]['HRS'] + newfields[n]['HF1'] + newfields[n]['HF2'];
							}
						}						
					}
				}
			}
		}
    }
	
	for (var d = 0; d < dmentrg.length; d++) {
		var divsao = dmentrg[d]['HRS'] / dmentrg[d]['ATV'];
		document.getElementById("row-entr").innerHTML += "<tr><th scope='row'>" + dmentrg[d]['NOME'] + "</th><td>" + dmentrg[d]['ATV'] + "</td><td>" + dmentrg[d]['HRS'] + "</td><td>" + divsao.toFixed(1); + "</td></tr>";
	}
}

var satisfac = 0; //0-nao tem 1-ruim 2-bom 
function satisfac() {
    document.getElementById("img-satis").style.opacity = 1.0;
}