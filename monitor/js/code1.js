// Obtém a data/hora atual
var data = new Date();

var meses = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
var semana = new Array("Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado");

// Guarda cada pedaço em uma variável
var dia = data.getDate();           // 1-31
var dia_sem = data.getDay();            // 0-6 (zero=domingo)
var mes = data.getMonth();          // 0-11 (zero=janeiro)
var ano2 = data.getYear();           // 2 dígitos
var ano4 = data.getFullYear();       // 4 dígitos
var hora = data.getHours();          // 0-23
var min = data.getMinutes();        // 0-59
var seg = data.getSeconds();        // 0-59
var mseg = data.getMilliseconds();   // 0-999
var tz = data.getTimezoneOffset(); // em minutos

var strg_mes = meses[mes];
console.group("Datas");
console.log("Mes - " + strg_mes);
console.groupEnd("Datas");
//ALTERE SOMENTE AQUI ----------------------------------------------------------------------------------------------------------

var configs = {
    'CFG_NOME': 0, // 0 - Primeiro Nome  1 - Nome Completo
    'CFG_KEY': '0fa63ab5014f860756dcb239e5b03c96', // Key gerada pelo trello para ixibir boards
    'CFG_TOK': '8325824adff62c2db66bfd6ab8ee51cff7ceea5f4248c586c7d013a481fe9b7a', //Token gerado pelo trello para acessar a API
    'CFG_MDC': 10, //Quantidade media IDEAL de chamado por mes - Será usado para os relatorios
    'CFG_ABR': true //Carrega o mes atual sem escolhe em tela
};

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

var boards = []; //Array que receberar todos os boards
var menbros = []; //Array qye receberar os membros
var listas = []; //Array que vai receber as listas
var cards = []; //Array cards
var rltable = []; //Montar tabela relatorio
var labels = []; //Array que vai receber os labels https://api.trello.com/1/boards/5b3a5ee83bec5319085e12fc/labels?fields=all&key=0fa63ab5014f860756dcb239e5b03c96&token=8325824adff62c2db66bfd6ab8ee51cff7ceea5f4248c586c7d013a481fe9b7a
var actions = []; //Array para ficar as açoes do quadro

//Relatorio Rosquinha
var rlrosca = [];

//Relatorio por chamados
var projts = [];

url = "https://api.trello.com/1/members/me/boards?key=" + key + "&token=" + token; //List Bards
var ajax1 = $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    beforeSend: function () {
        console.log("Buscando Boards...");
    }
})
        .done(function (data) {
            console.log("Montando Boards...");
            //Montar Array de boards
            for (var i = 0; i < data.length; i++) {
                var array = {
                    'ID': data[i]['id'],
                    'NAME': data[i]['name']
                };
                boards.push(array);
            }
            console.log(boards);
            montarSelect();
        })
        .fail(function (jqXHR, textStatus, data) {
            console.log("Acesso a API falhou!");
        });

//Se tiver board, montar na tela
function montarSelect() {
    if (boards.length > 0) {
        var vldags = false;
        var bodid = "";
        var bodname = "";
        for (var i = 0; i < boards.length; i++) {
            //Verificar se tem com o mes ATUAL para Carregar
            if (boards[i]['NAME'].indexOf("AMS " + strg_mes) > -1) {
                vldags = true;
                bodid = boards[i]['ID'];
                bodname = boards[i]['NAME'];
            }
            //Montar somente com os nomes AD e AMS
            if (boards[i]['NAME'].match(/AMS/)) {
                var option = document.createElement("option");
                option.text = boards[i]['NAME'];
                option.value = boards[i]['ID'];
                document.getElementById("inputState").add(option);
            }
            //if (boards[i]['NAME'].match(/AD/)) {
            //    var option = document.createElement("option");
            //    option.text = boards[i]['NAME'];
            //    option.value = boards[i]['ID'];
            //    document.getElementById("inputState").add(option);
            //}
        }
        if (configs['CFG_ABR']) {
            if (vldags) {
                //Mesmo dados da função gerarRelatorio() ajustado para executar para o ID pre escolhido
                document.getElementById("tela-01").style.opacity = 0.0;
                document.getElementById("tela-02").style.opacity = 1.0;
                document.getElementById("titulo").innerHTML = bodname;
                buscarCards(bodid);
                buscarLabel(bodid);
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
    console.log(value);
    console.log(text);

    document.getElementById("tela-01").style.opacity = 0.0;
    document.getElementById("tela-01").style.display = "none";
    document.getElementById("tela-02").style.opacity = 1.0;
    document.getElementById("titulo").innerHTML = text;

    buscarCards(value);
    buscarLabel(value);

}

//Puxar infos do site
function buscarCards(id) {
    //https://api.trello.com/1/boards/" + id + "?actions=all&boardStars=mine&cards=all&card_pluginData=true&checklists=all&customFields=true&fields=all&labels=all&lists=all&members=all&memberships=all&membersInvited=all&membersInvited_fields=all&pluginData=true&organization=true&organization_pluginData=true&myPrefs=true&tags=true&key=" + key + "&token=" + token;
    url = "https://api.trello.com/1/boards/" + id + "/cards/?key=" + key + "&token=" + token; //List CARDS
    //url = "https://api.trello.com/1/boards/" + id + "?actions=all&boardStars=mine&cards=all&card_pluginData=true&checklists=all&customFields=true&fields=all&labels=all&lists=all&members=all&memberships=all&membersInvited=all&membersInvited_fields=all&pluginData=true&organization=true&organization_pluginData=true&myPrefs=true&tags=true&key=" + key + "&token=" + token; //List CARDS
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
                console.groupEnd();
                buscarMenbros(id);
            })
            .fail(function (jqXHR, textStatus, data) {
                console.log("Não achou.");
            });
}

function buscarMenbros(id) {
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
                buscarList(id);
                for (var i = 0; i < data.length; i++) {
                    var imggg = "";
                    if (data[i]['member']['avatarUrl'] == null) {
                        imggg = "img/LuX2uKH.jpg";
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
                console.log(menbros);
            })
            .fail(function (jqXHR, textStatus, data) {
                console.log("Acesso a API falhou!");
            });
}

function buscarList(cod) {
    url = "https://api.trello.com/1/boards/" + cod + "/lists?cards=all&card_fields=all&filter=open&fields=all&key=" + key + "&token=" + token;
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
                console.log(listas);
                contagem(cards);
            })
            .fail(function (jqXHR, textStatus, data) {
                console.log("Acesso a API falhou!");
            });
}

function contagem(data) {

    for (var i = 0; i < data.length; i++) {

        //Tratar projeto
        var sp1 = data[i]['name'].split(" ");
        var rp = sp1[0].replace("[", "");
        rp = rp.replace("]", "");
        rp = rp.toUpperCase();
        var flllg = false;
        var index = 0;

        for (var pj = 0; pj < projts.length; pj++) {
            if (projts[pj]['PRJ'] == rp) {
                flllg = true;
                index = pj;
            }
        }

        if (flllg) {
            projts[index]['QNT'] = projts[index]['QNT'] + 1;
        } else {
            var array = {
                'PRJ': rp,
                'QNT': 1
            };
            projts.push(array);
        }
        //------------------------
        for (var x = 0; x < listas.length; x++) {

            var array2 = {
                'ID': listas[x]['ID'],
                'NAME': listas[x]['NAME'],
                'QNT': 0,
            };

            var arrayTable = [];

            if (rlrosca.length != 0) {
                var ntm = true;
                for (var z = 0; z < rlrosca.length; z++) {
                    if (rlrosca[z]['ID'] == array2['ID']) {
                        ntm = false;
                    }
                }

                if (ntm) {
                    rlrosca.push(array2);
                }
            } else {
                rlrosca.push(array2);
            }
        }
    }

    console.log(rlrosca);

    for (var i = 0; i < data.length; i++) {
        for (var y = 0; y < rlrosca.length; y++) {
            if (data[i]['idList'] == rlrosca[y]['ID']) {
                rlrosca[y]['QNT'] = rlrosca[y]['QNT'] + 1;
            }
        }
    }

    for (var i = 0; i < data.length; i++) {
        for (var m = 0; m < data[i]['idLabels'].length; m++) {
            for (var l = 0; l < labels.length; l++) {
                if (labels[l]['ID'] == data[i]['idLabels'][m]) {
                    labels[l]['QNT'] = labels[l]['QNT'] + 1;
                }
            }
        }

        if (data[i]['idMembers'].length == 0) {

            //Chamados não assinados
            console.log("VAZIO");
        } else {
            for (var m = 0; m < data[i]['idMembers'].length; m++) {
                if (rltable.length != 0) {
                    var ntm = true;

                    for (var z = 0; z < rltable.length; z++) {
                        if (rltable[z]['VLR'] == data[i]['idMembers'][m]) {
                            ntm = false;
                        }
                    }

                    if (ntm) {
                        var arrayRows = {
                            'ID': data[i]['idMembers'][m],
                            'CAMP1': data[i]['idMembers'][m],
                            'CAMP2': 'ID',
                            'VLR': data[i]['idMembers'][m]
                        };
                        rltable.push(arrayRows);
                        for (var w = 0; w < menbros.length; w++) {
                            if (data[i]['idMembers'][m] == menbros[w]['ID']) {
                                if (configs['CFG_NOME'] == 0) {
                                    var nnnn = menbros[w]['USER'].split(" ");
                                    var arrayRows = {
                                        'ID': data[i]['idMembers'][m],
                                        'CAMP1': menbros[w]['ID'],
                                        'CAMP2': 'NAME',
                                        'VLR': nnnn[0]
                                    };
                                } else {
                                    var arrayRows = {
                                        'ID': data[i]['idMembers'][m],
                                        'CAMP1': menbros[w]['ID'],
                                        'CAMP2': 'NAME',
                                        'VLR': menbros[w]['USER']
                                    };
                                }
                                rltable.push(arrayRows);
                                var arrayRows = {
                                    'ID': data[i]['idMembers'][m],
                                    'CAMP1': menbros[w]['ID'],
                                    'CAMP2': 'IMG',
                                    'VLR': menbros[w]['IMG']
                                };
                                rltable.push(arrayRows);
                            }
                        }

                        for (var w = 0; w < listas.length; w++) {
                            if (data[i]['idList'] == listas[w]['ID']) {
                                var arrayRows = {
                                    'ID': data[i]['idMembers'][m],
                                    'CAMP1': listas[w]['ID'],
                                    'CAMP2': listas[w]['NAME'],
                                    'VLR': 1
                                };
                                rltable.push(arrayRows);
                            } else {
                                var arrayRows = {
                                    'ID': data[i]['idMembers'][m],
                                    'CAMP1': listas[w]['ID'],
                                    'CAMP2': listas[w]['NAME'],
                                    'VLR': 0
                                };
                                rltable.push(arrayRows);
                            }
                        }
                    } else {

                        for (var w = 0; w < rltable.length; w++) {
                            if (data[i]['idMembers'][m] == rltable[w]['ID']) {
                                if (data[i]['idList'] == rltable[w]['CAMP1']) {
                                    rltable[w]['VLR'] = rltable[w]['VLR'] + 1;
                                }
                            }
                        }
                    }

                } else {
                    var arrayRows = {
                        'ID': data[i]['idMembers'][m],
                        'CAMP1': data[i]['idMembers'][m],
                        'CAMP2': 'ID',
                        'VLR': data[i]['idMembers'][m]
                    };
                    rltable.push(arrayRows);
                    for (var w = 0; w < menbros.length; w++) {
                        if (data[i]['idMembers'][m] == menbros[w]['ID']) {
                            if (configs['CFG_NOME'] == 0) {
                                var nnnn = menbros[w]['USER'].split(" ");
                                var arrayRows = {
                                    'ID': data[i]['idMembers'][m],
                                    'CAMP1': menbros[w]['ID'],
                                    'CAMP2': 'NAME',
                                    'VLR': nnnn[0]
                                };
                            } else {
                                var arrayRows = {
                                    'ID': data[i]['idMembers'][m],
                                    'CAMP1': menbros[w]['ID'],
                                    'CAMP2': 'NAME',
                                    'VLR': menbros[w]['USER']
                                };
                            }
                            rltable.push(arrayRows);
                            var arrayRows = {
                                'ID': data[i]['idMembers'][m],
                                'CAMP1': menbros[w]['ID'],
                                'CAMP2': 'IMG',
                                'VLR': menbros[w]['IMG']
                            };
                            rltable.push(arrayRows);
                        }
                    }

                    for (var w = 0; w < listas.length; w++) {
                        if (data[i]['idList'] == listas[w]['ID']) {
                            var arrayRows = {
                                'ID': data[i]['idMembers'][m],
                                'CAMP1': listas[w]['ID'],
                                'CAMP2': listas[w]['NAME'],
                                'VLR': 1
                            };
                            rltable.push(arrayRows);
                        } else {
                            var arrayRows = {
                                'ID': data[i]['idMembers'][m],
                                'CAMP1': listas[w]['ID'],
                                'CAMP2': listas[w]['NAME'],
                                'VLR': 0
                            };
                            rltable.push(arrayRows);
                        }
                    }
                }
            }
        }
    }
    ajutarTh(rlrosca);
    montarDivLabel(labels);
    montarDoing();
}

function addLog(id, td, dg, pd, dn) {

    var flag = false;
    var cod = 0;

    for (var i = 0; i < rltable.length; i++) {
        if (rltable[i]['ID'] == id) {
            flag = true;
            cod = i;
            break;
        }
    }

    if (flag) {
        rltable[cod]['TODO'] = rltable[cod]['TODO'] + td;
        rltable[cod]['DOING'] = rltable[cod]['DOING'] + dg;
        rltable[cod]['PEDENT'] = rltable[cod]['PEDENT'] + pd;
        rltable[cod]['DONE'] = rltable[cod]['DONE'] + dn;
        rltable[cod]['TOTAL'] = rltable[cod]['TODO'] + rltable[cod]['DOING'] + rltable[cod]['PEDENT'] + rltable[cod]['DONE'];
    } else {
        if (id != "Não assinado") {
            for (var i = 0; i < menbros.length; i++) {
                if (menbros[i]['ID'] == id) {
                    coduser = menbros[i]['USER'];
                    img = menbros[i]['IMG'] + "/170.png";
                    break;
                }
            }
        } else {
            coduser = "Não assinado";
            img = "https://cdn.promdevelop.ru/wp-content/uploads/3864e21d4496a0841b80de36f6d74710.jpg";
        }

        var array = {
            'ID': id,
            'USER': coduser,
            'IMG': img,
            'TODO': td,
            'DOING': dg,
            'PEDENT': pd,
            'DONE': dn,
            'TOTAL': td + dg + pd + dn
        };
        rltable.push(array);
    }

    return rltable;
}
function ajutarTh(arr) {

    document.getElementById("table-tts").innerHTML = "<th scope='col'>#</th>";
    document.getElementById("table-tts").innerHTML += "<th scope='col'>Analista</th>";
    for (var i = 0; i < arr.length; i++) {
        var nametab = arr[i]['NAME'];
        nametab = nametab.split(" ");
        document.getElementById("table-tts").innerHTML += "<th scope='col'>" + nametab[0] + "</th>";
    }
    //RelatorioDounts();
    mediaChamdos();
    rltLine();
    rltBar();
    exibirTabela(rltable);
}

function montarDivLabel(arr) {

    var tt = 0;
    var name = "";

    for (var i = 0; i < rlrosca.length; i++) {
        if (rlrosca[i]['NAME'] != name) {
            name = rlrosca[i]['NAME'];
            tt = tt + rlrosca[i]['QNT'];
        }
    }

    for (var i = 0; i < arr.length; i++) {
        var porc = (arr[i]['QNT'] / tt) * 100;
        porc = porc.toFixed(1);
        document.getElementById("bar-labels").innerHTML += "<h5>" + arr[i]['NAME'] + "</h5><h4>" + porc + "%</h4><div class='progress-bar''><div class='bar-pg' style='width: " + porc + "%; background-color: " + arr[i]['COR'] + "'></div></div>";
    }
}

function buscarLabel(id) {
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
                        'QNT': 0
                    };
                    labels.push(lb);
                }
                console.log(labels);
            })
            .fail(function (jqXHR, textStatus, data) {
                console.log("Acesso a API falhou!");
            });
}

function exibirTabela(arr) {
    console.log(arr);
    var rowww = "<tr>";
    var id1 = "";
    var id2 = "";

    var alt = true;
    for (var i = 0; i < arr.length; i++) {

        if (alt) {
            alt = false;
            id1 = arr[i]['ID'];
        }

        id2 = arr[i]['ID'];
        if (id1 == id2) {
            if (arr[i]['CAMP2'] == "ID") {
                for (var g = 0; g < menbros.length; g++) {
                    if (menbros[g]['ID'] == arr[i]['VLR']) {
                        rowww += "<td><img class='img-pf' src='" + menbros[g]['IMG'] + "/170.png'></td>";
                    }
                }
            } else if (arr[i]['CAMP2'] == "IMG") {
                //Fazer nada
            } else {
                rowww += "<td>" + arr[i]['VLR'] + "</td>";
            }
        } else {
            alt = true;
            rowww += "</tr><tr>";
            if (arr[i]['CAMP2'] == "ID") {
                for (var g = 0; g < menbros.length; g++) {
                    if (menbros[g]['ID'] == arr[i]['VLR']) {
                        rowww += "<td><img class='img-pf' src='" + menbros[g]['IMG'] + "/170.png'></td>";
                    }
                }
            } else if (arr[i]['CAMP2'] == "NAME") {
                for (var g = 0; g < menbros.length; g++) {
                    if (menbros[g]['ID'] == arr[i]['VLR']) {
                        rowww += "<td><b>" + menbros[g]['USER'] + "</b></td>";
                    }
                }
            } else {
                rowww += "<td>" + arr[i]['VLR'] + "</td>";
            }
        }
    }

    //SORT
    /*rltable.sort(function(a, b) {
     return a.DONE - b.DONE;
     });*/
    document.getElementById("tabale-rows").innerHTML = rowww;
}

//Montar Chamados em doing
function montarDoing() {

    var lineee = "";

    var txt = "";
    var menb = "";
    var x = 0;

    var dtabr = "";
    var dtexe = "";

    var dtd = "";
    var dtm = "";
    var dta = "";

    for (var i = 0; i < cards.length; i++) {
        for (var y = 0; y < listas.length; y++) {
            if (listas[y]['NAME'] == "Doing") {
                if (cards[i]['idList'] == listas[y]['ID']) {

                    txt = cards[i]['name'];
                    txt = txt.split(" ");

                    for (var z = 0; z < cards[i]['idMembers'].length; z++) {
                        x = z;

                        if (x != 0) {
                            break;
                        } else {
                            for (var a = 0; a < menbros.length; a++) {
                                if (cards[i]['idMembers'][z] == menbros[a]['ID']) {
                                    menb = "<img class='img-pf' src='" + menbros[a]['IMG'] + "/170.png'>";
                                }
                            }
                        }
                    }

                    x = 0;

                    if (cards[i]['due'] != null) {
                        dtabr = cards[i]['due'];
                        dtabr = dtabr.split("T");
                        dtabr = dtabr[0].split("-");
                        dtd = dtabr[2];
                        dtm = dtabr[1];
                        dta = dtabr[0];
                        dtexe = dtd + "/" + dtm + "/" + dta;
                    }

                    lineee += "<tr><td>" + txt[0] + "</td><td>" + txt[1] + "</td><td>" + dtexe + "</td><td>" + menb + "</td></tr>";
                    dtexe = "";
                }
            }
        }
    }

    document.getElementById("row-five").innerHTML = lineee;

}

//Verificar se existe
function validar(array2) {

    if (rlrosca.length != 0) {
        for (var i = 0; i < rlrosca.length; i++) {
            if (rlrosca['ID'] == array2['ID']) {
                //Tem o array
                return true;
            }
        }
    } else {
        //Não tem
        return false;
    }

    return true;
}

function RelatorioDounts() {
    //Exibir relatorio
    google.charts.load("current", {packages: ["corechart"]});
    google.charts.setOnLoadCallback(corechart);

    function corechart() {

        var data = new google.visualization.DataTable();

        data.addColumn('string', 'Chamados');
        data.addColumn('number', 'Quantidade');

        for (var i = 0; i < rlrosca.length; i++) {
            var datarlt = [rlrosca[i]['NAME'], rlrosca[i]['QNT']];
            data.addRow(datarlt);
        }

        var options = {
            title: 'Percentual por Status',
            pieHole: 0.5,
            //colors: ['#84b3ed', '#5ba1f7', '#3f85db', '#447bbf', '#3c6393'] 
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
    }
    montarProjetos();
    mediaChamdos();
}

function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

function montarProjetos() {
    google.charts.setOnLoadCallback(drawpiechart);

    function drawpiechart() {
        var data = new google.visualization.DataTable();

        data.addColumn('string', 'Projetos');
        data.addColumn('number', 'Quantidade');

        for (var i = 0; i < projts.length; i++) {
            var datarlt = [projts[i]['PRJ'], projts[i]['QNT']];
            data.addRow(datarlt);
        }

        var options = {
            title: 'Percentual por Cliente',
            is3D: true
                    //pieHole: 0.0,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }
}

function montarDtHr() {
    // Obtém a data/hora atual
    var data = new Date();

    var meses = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
    var semana = new Array("Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado");

    // Guarda cada pedaço em uma variável
    var dia = data.getDate();           // 1-31
    var dia_sem = data.getDay();            // 0-6 (zero=domingo)
    var mes = data.getMonth();          // 0-11 (zero=janeiro)
    var ano2 = data.getYear();           // 2 dígitos
    var ano4 = data.getFullYear();       // 4 dígitos
    var hora = data.getHours();          // 0-23
    var min = data.getMinutes();        // 0-59
    var seg = data.getSeconds();        // 0-59
    var mseg = data.getMilliseconds();   // 0-999
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
    document.getElementById('hr-div').innerHTML = str_hora;
    document.getElementById('sm-div').innerHTML = semana[dia_sem];
    document.getElementById('dt-div').innerHTML = str_data;
}

function mediaChamdos() {

    var tt = 0;
    var name = "";

    var backlog = {
        'PROGESS': 0, //Quantidade de chamados em não Done
        'DONE': 0, // Quantidade de chamados em Done
    };

    for (var i = 0; i < rlrosca.length; i++) {
        if (rlrosca[i]['NAME'] == "Done") {
            backlog['DONE'] = rlrosca[i]['QNT'];
        } else {
            backlog['PROGESS'] = backlog['PROGESS'] + rlrosca[i]['QNT'];
        }
        if (rlrosca[i]['NAME'] != name) {
            name = rlrosca[i]['NAME'];
            tt = tt + rlrosca[i]['QNT'];
        }
    }

    //var md = (backlog['PROGESS'] / backlog['DONE']) * 100;
    var md = (backlog['PROGESS'] / 150) * 100;
    //console.warn(md);
    var comp = md.toFixed(1);
    //console.warn(comp);


    if (comp > configs['CFG_MDC']) {
        //Ruim
        document.getElementById('img-md').src = "img/xPaiPo0.png";
        document.getElementById('src-legal').src = "img/QowDpun.jpg";
        document.getElementById('stt-md').innerHTML = "Acima do limite";
    } else {
        document.getElementById('img-md').src = "img/1z07epz.png";
        document.getElementById('src-legal').src = "img/29jlUQW.jpg";
        document.getElementById('stt-md').innerHTML = "Dentro do esperado";
    }
    md = md.toFixed(1);
    //console.warn(md);
    document.getElementById('tt-md').innerHTML = md + "%";
    preencherQdr();
}

function preencherQdr() {
    console.log(rlrosca);
    var pednt = 0;
    for (var pp = 0; pp < rlrosca.length; pp++) {
        switch (rlrosca[pp]['NAME']) {
            case "To Do":
                document.getElementById('txt-todo').innerHTML = rlrosca[pp]['QNT'];
                break;
            case "Doing":
                document.getElementById('txt-doing').innerHTML = rlrosca[pp]['QNT'];
                pednt = pednt + rlrosca[pp]['QNT'];
                break;
            case "Pendent Customer / Funcional":
                document.getElementById('txt-pedent').innerHTML = rlrosca[pp]['QNT'];
                pednt = pednt + rlrosca[pp]['QNT'];
                break;
            case "Done":
                document.getElementById('txt-done').innerHTML = rlrosca[pp]['QNT'];
                break;
        }
    }
    if (pednt > 10) {
        document.getElementById('txt-doing').style.color = "#C9302C";
        document.getElementById('txt-pedent').style.color = "#C9302C";
    }
}