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
    'IMG': 'https://s.rozee.pk/company_logos/44/37188375395233.png', //Logo marca
	'DATA' : '01/10/2017 00:00',
    'HRSCTR': 175, // Saldos em HORAS
};
protejos.push(dadoprotj);
var dadoprotj = {
    'NOME': 'Pool AD - SLATAM', //Nome do projeto
    'IMG': 'https://s.rozee.pk/company_logos/44/37188375395233.png', //Logo marca
	'DATA' : '01/10/2017 00:00',
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
            //if (boards[i]['NAME'].indexOf("AD " + strg_mes) > -1) {
            //    vldags = true;
            //    bodid = boards[i]['ID'];
            //}
            //Montar somente com os nomes AD
            //if (boards[i]['NAME'].match(/AD/)) {
				var nameptjs;
				//for (var y = 0; y < protejos.length; y++) {
				//nameptjs = new RegExp(protejos[y]['NOME']);
					//if (boards[i]['NAME'].match(nameptjs)) {
						var option = document.createElement("option");
						option.text = boards[i]['NAME'];
						option.value = boards[i]['ID'];
						document.getElementById("inputState").add(option);
					//}
				//}
            //}
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
				
				setTimeout(function(){ 
					ajax5(id);
				}, 500);
            })
            .fail(function (jqXHR, textStatus, data) {
                dump("carregarInfosAPI(); - 298", "A requisição AJAX para buscar todos membros falhou!.");
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
				
				setTimeout(function(){ 
					ajax4(id);
				}, 500);
            })
            .fail(function (jqXHR, textStatus, data) {
                dump("carregarInfosAPI(); - 334", "A requisição AJAX para buscar todas as labels falhou!.");
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
				
				setTimeout(function(){ 
					ajax6(id);
				}, 500);
            })
            .fail(function (jqXHR, textStatus, data) {
                dump("carregarInfosAPI(); - 367", "A requisição AJAX para buscar todas as Listas falhou!.");
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
                for (var y = 0; y < data.length; y++) {
                    custfields.push(data[y]);
                }
				processarDados();
            })
            .fail(function (jqXHR, textStatus, data) {
                dump("carregarInfosAPI(); - 389", "A requisição AJAX para buscar todas os Custom fields falhou!.");
            });
}

var cnts = 0;
var refreshIntervalId;

function inicLoad() {
	
	refreshIntervalId = setInterval(function(){
		switch(cnts) {
			case 0:
				cnts = 1;
				document.getElementById("load-txt").innerHTML = "Carregando";
				break;
			case 1:
				cnts = 2;
				document.getElementById("load-txt").innerHTML = "Carregando.";
				break;
			case 2:
				cnts = 3;
				document.getElementById("load-txt").innerHTML = "Carregando..";
				break;
			case 3:
				cnts = 0;
				document.getElementById("load-txt").innerHTML = "Carregando...";
				break;
		}
	}, 300);
}

function stopLoad() {
	
	clearInterval(refreshIntervalId);
	
	document.getElementById("load").style.opacity = 0.0;	
	setTimeout(function(){ 
		document.getElementById("load").style.display = "none";
	}, 500);
}

//Puxar infos do site
function carregarInfosAPI(id) {
	
	inicLoad();

    console.group("Board");
    console.log(id);
    console.groupEnd("Board");
	
	ajax2(id);

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
                    dump("processarDados(); - 465", "A requisição AJAX para buscar todos os campos adicionais falhou!.");
                });
        if (i == total) {
            setTimeout(function () {
                //Funções de exibição

				
				stopLoad();
            }, 1300);
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
	
	var feitos = {
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


                switch (listas[y]['NAME']) {
                    case "Catálogo de Serviços":
                        break;

                    case "A Fazer":
                        break;

                    case "Fazendo":
                        break;

                    case "Block":
                        break;

                    case "Estimativas Em execução":
                        break;

                    case "Assessment":
                        break;

                    case "Estimativas - Aguardando Aprovação":
                        break;

                    case "Teste do Usuário":
                        break;

                    case "Preparação CAB":
                        break;

                    case "Pós Implantação":
                        break;

                    case "Done":
                        break;

                    case "Estimativas Em execução":
                        break;

                    case "Estimativas - Aguardando Aprovação":
                        break;

                    case "Estimativas Aprovadas":
                        break;

                    case "Estimativas Reprovadas/Canceladas":
                        break;

                    case "Assessment":
                        break;
						
					case "Catálogo de Serviços":
                        break;

                    default:
                        dump("ListasXCards(); - 1067", "A lista " + listas[y]['NAME'] + " não foi mapeada na função.");
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