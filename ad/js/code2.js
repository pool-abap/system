var saldohrmes = 0;
var saldohrprxmes = 0;
var saldohrantmes = 0;


var histosaldo = [];

var rltline = {
    'OUT': 0,
    'NOV': 0,
    'DEZ': 0,
    'JAN': 0,
    'FEV': 0,
    'MAR': 0,
    'ABR': 0,
    'MAI': 0,
    'JUN': 0,
    'JUL': 0,
    'AGO': 0,
    'SET': 0,
};

var janrlt = {
    'ANA': 0,
    'EXE': 0,
    'ASS': 0,
};

var fevrlt = {
    'ANA': 0,
    'EXE': 0,
    'ASS': 0,
};

var marrlt = {
    'ANA': 0,
    'EXE': 0,
    'ASS': 0,
};

var abrrlt = {
    'ANA': 0,
    'EXE': 0,
    'ASS': 0,
};

var mairlt = {
    'ANA': 0,
    'EXE': 0,
    'ASS': 0,
};

var junrlt = {
    'ANA': 0,
    'EXE': 0,
    'ASS': 0,
};

var julrlt = {
    'ANA': 0,
    'EXE': 0,
    'ASS': 0,
};

var agorlt = {
    'ANA': 0,
    'EXE': 0,
    'ASS': 0,
};

var setrlt = {
    'ANA': 0,
    'EXE': 0,
    'ASS': 0,
};

var outrlt = {
    'ANA': 0,
    'EXE': 0,
    'ASS': 0,
};

var novrlt = {
    'ANA': 0,
    'EXE': 0,
    'ASS': 0,
};

var dezrlt = {
    'ANA': 0,
    'EXE': 0,
    'ASS': 0,
};


function saldoMes() {
    var data = new Date();
    var mes = data.getMonth(); //0-11
    var anocplt = data.getFullYear(); //4 dígitos
    mes++; //Para ajustar pas 1-12
    var anolok = anocplt;
    var anoprx = anocplt;
    var anoant = anocplt;


    var prxmes = 0;
    var antmes = 0;

    if (mes <= 1) {
        antmes = 12;
        anoant = anoant - 1;
    } else {
        antmes = mes - 1;
    }

    if (mes >= 12) {
        prxmes = 0;
        anoprx = anoprx + 1;
    } else {
        prxmes = mes + 1;
    }

    for (var z = 0; z < newfields.length; z++) {
        var datatemp = newfields[z]['DF1'];
        var datemp2 = datatemp.split("-");
        var mesproc = datemp2[1];
        var anoproc = datemp2[0];

        if (newfields[z]['OC'] == false) {

            if (mesproc == mes && anolok == anoproc) {
                saldohrmes = saldohrmes + newfields[z]['HF1'];
                saldohrmes = saldohrmes + newfields[z]['HF2'];
            }

            if (prxmes != mes) {
                if (mesproc == prxmes && anoprx == anoproc) {
                    saldohrprxmes = saldohrprxmes + newfields[z]['HF1'];
                    saldohrprxmes = saldohrprxmes + newfields[z]['HF2'];
                }
            }

            if (antmes != mes) {
                if (mesproc == antmes && anoant == anoproc) {
                    saldohrantmes = saldohrantmes + newfields[z]['HF1'];
                    saldohrantmes = saldohrantmes + newfields[z]['HF2'];
                }
            }
        }
    }

    /*document.getElementById("saldo-atual").innerHTML = saldohrmes + "h";
     document.getElementById("saldo-prxmes").innerHTML = saldohrprxmes + "h";
     document.getElementById("saldo-antmes").innerHTML = antmes + "h";*/

    document.getElementById("saldo-atual").innerHTML = saldohrmes;
    document.getElementById("saldo-prxmes").innerHTML = saldohrprxmes;
    document.getElementById("saldo-antmes").innerHTML = saldohrantmes;


    var ttlms;
    for (var pj = 0; pj < protejos.length; pj++) {

        if (protejos[pj]['NOME'] == titulo) {

            var calc1 = saldohrmes / protejos[pj]['HRSCTR'];
            var calc2 = saldohrprxmes / protejos[pj]['HRSCTR'];
            var calc3 = saldohrantmes / protejos[pj]['HRSCTR'];

            document.getElementById("saldo-atual-div").innerHTML = calc1.toFixed(1);
            document.getElementById("saldo-prxmes-div").innerHTML = calc2.toFixed(1);
            document.getElementById("saldo-antmes-div").innerHTML = calc3.toFixed(1);

            var dtnow = new Date();
            var d = dtnow.getDate(); //1-31
            var m = dtnow.getMonth(); //0-11
            var a = dtnow.getFullYear(); //4 dígitos
            m++; //1-12 ajustar
            var dthoje = d + '/' + m + '/' + a;
            var dthoje = dthoje + " 00:00";
            //DD-MM-AAA HH:MM

            var data1 = moment(protejos[pj]['DATA'], "DD/MM/YYYY hh:mm");
            var data2 = moment(dthoje, "DD/MM/YYYY hh:mm");
            var dif = data1.diff(data2, 'months');
            dif = Math.abs(dif);
            dif++;

            ttlms = protejos[pj]['HRSCTR'] * dif;

            var dahist = protejos[pj]['DATA'].split("/");
            dahist[0] = parseInt(dahist[0]);
            dahist[1] = parseInt(dahist[1]);
            dahist[2] = parseInt(dahist[2]);
            
            var loopproc = dif + 4;
            for (var i = 0; i < loopproc; i++) {

                if (dahist[1] > 12) {
                    dahist[1] = 1;
                    dahist[2]++;
                }

                var salddohrs = protejos[pj]['HRSCTR'] * (i + 1);
                var consum = 0;

                for (var c = 0; c < cards.length; c++) {
                    for (var z = 0; z < newfields.length; z++) {
                        if (newfields[z]['CARDID'] == cards[c]['id'] &&
                                cards[c]['dueComplete'] == true) {

                            var carddata = newfields[z]['DF1'].split("-");

                            carddata[0] = parseInt(carddata[0]);
                            carddata[1] = parseInt(carddata[1]);
                            carddata[2] = parseInt(carddata[2]);

                            if (dahist[2] == carddata[0] && dahist[1] == carddata[1]) {
                                consum = consum - newfields[z]['HF1'];
                            }

                            if (newfields[z]['DF2'] != "") {

                                carddata = newfields[z]['DF2'].split("-");

                                carddata[0] = parseInt(carddata[0]);
                                carddata[1] = parseInt(carddata[1]);
                                carddata[2] = parseInt(carddata[2]);

                                if (dahist[2] == carddata[0] && dahist[1] == carddata[1]) {
                                    consum = consum - newfields[z]['HF2'];
                                }
                            }
                        }
                    }
                }

                var saldarrs = {'mes': dahist[1], 'ano': dahist[2], 'saldo': salddohrs, 'consu': consum, 'total': 0};
                histosaldo.push(saldarrs);

                dahist[1]++;
            }

            var ttsld = 0;
            for (var h = 0; h < histosaldo.length; h++) {
                var saldoant = 0;
                if (h > 0) {
                    var indx = h - 1;
                    saldoant = histosaldo[indx]['total'];
                }
                ttsld = protejos[pj]['HRSCTR'] + saldoant + histosaldo[h]['consu'];
                histosaldo[h]['total'] = ttsld;
            }

            //console.error(histosaldo);

            //Debugue
            //console.error("Total Saldo - " + ttlms);

            var vcnt = 0;
            var hrssome = 0;
            for (var i = 0; i < cards.length; i++) {
                for (var z = 0; z < newfields.length; z++) {
                    if (newfields[z]['CARDID'] == cards[i]['id'] &&
                            cards[i]['dueComplete'] == true) {
                        var tt = newfields[z]['HF1'] + newfields[z]['HF2'];
                        ttlms = ttlms - tt;
                        hrssome = hrssome + newfields[z]['HF1'] + newfields[z]['HF2'];
                        vcnt++;
                    }
                }
            }
        }
    }

    document.getElementById("saldott").innerHTML = ttlms;

    if (ttlms < 0) {
        document.getElementById("div-saldo").style.backgroundColor = "#C82333";
    }
    if (ttlms == 0) {
        document.getElementById("div-saldo").style.backgroundColor = "#E0A800";
    }
    if (ttlms > 0) {
        document.getElementById("div-saldo").style.backgroundColor = "#218838";
    }
}

function calcArrRLT() {

    var dtatt = new Date();

    var ano_atual = dtatt.getFullYear();
    var mes_atual = dtatt.getMonth();

    var anoproc = ano_atual;
    var mesproc = mes_atual;

    //mesproc = mesproc - 1;
    //Não precisa diminuir pois o array já vem com 1 a menos

    if (mesproc < 1) {
        mesproc = 12;
        anoproc = anoproc - 1;
    }

    for (var i = 0; i < cards.length; i++) {
        //for (var y = 0; y < listas.length; y++) {
        for (var z = 0; z < newfields.length; z++) {

            if (cards[i]['dueComplete'] == true &&
                    cards[i]['id'] == newfields[z]['CARDID']) {

                var rltdata = newfields[z]['DF1'];
                var datasplit = rltdata.split("-");
                var mescard = parseInt(datasplit[1]);
                var anocard = parseInt(datasplit[0]);


                switch (mescard) {
                    case 1:
                        if (mescard < mesproc) {
                            if (anocard == anoproc) {
                                rltline['JAN'] = rltline['JAN'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard == mesproc) {
                            if (anocard == anoproc) {
                                rltline['JAN'] = rltline['JAN'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard > mesproc) {
                            if (anocard < anoproc) {
                                rltline['JAN'] = rltline['JAN'] + newfields[z]['HF1'];
                            }
                        }
                        //rltline['JAN'] = rltline['JAN'] + newfields[z]['HF1'];
                        break;
                    case 2:
                        if (mescard < mesproc) {
                            if (anocard == anoproc) {
                                rltline['FEV'] = rltline['FEV'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard == mesproc) {
                            if (anocard == anoproc) {
                                rltline['FEV'] = rltline['FEV'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard > mesproc) {
                            if (anocard < anoproc) {
                                rltline['FEV'] = rltline['FEV'] + newfields[z]['HF1'];
                            }
                        }
                        //rltline['FEV'] = rltline['FEV'] + newfields[z]['HF1'];
                        break;
                    case 3:
                        if (mescard < mesproc) {
                            if (anocard == anoproc) {
                                rltline['MAR'] = rltline['MAR'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard == mesproc) {
                            if (anocard == anoproc) {
                                rltline['MAR'] = rltline['MAR'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard > mesproc) {
                            if (anocard < anoproc) {
                                rltline['MAR'] = rltline['MAR'] + newfields[z]['HF1'];
                            }
                        }
                        //rltline['MAR'] = rltline['MAR'] + newfields[z]['HF1'];
                        break;
                    case 4:
                        if (mescard < mesproc) {
                            if (anocard == anoproc) {
                                rltline['ABR'] = rltline['ABR'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard == mesproc) {
                            if (anocard == anoproc) {
                                rltline['ABR'] = rltline['ABR'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard > mesproc) {
                            if (anocard < anoproc) {
                                rltline['ABR'] = rltline['ABR'] + newfields[z]['HF1'];
                            }
                        }
                        //rltline['ABR'] = rltline['ABR'] + newfields[z]['HF1'];
                        break;
                    case 5:
                        if (mescard < mesproc) {
                            if (anocard == anoproc) {
                                rltline['MAI'] = rltline['MAI'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard == mesproc) {
                            if (anocard == anoproc) {
                                rltline['MAI'] = rltline['MAI'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard > mesproc) {
                            if (anocard < anoproc) {
                                rltline['MAI'] = rltline['MAI'] + newfields[z]['HF1'];
                            }
                        }
                        //rltline['MAI'] = rltline['MAI'] + newfields[z]['HF1'];
                        break;
                    case 6:
                        if (mescard < mesproc) {
                            if (anocard == anoproc) {
                                rltline['JUN'] = rltline['JUN'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard == mesproc) {
                            if (anocard == anoproc) {
                                rltline['JUN'] = rltline['JUN'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard > mesproc) {
                            if (anocard < anoproc) {
                                rltline['JUN'] = rltline['JUN'] + newfields[z]['HF1'];
                            }
                        }
                        //rltline['JUN'] = rltline['JUN'] + newfields[z]['HF1'];
                        break;
                    case 7:
                        if (mescard < mesproc) {
                            if (anocard == anoproc) {
                                rltline['JUL'] = rltline['JUL'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard == mesproc) {
                            if (anocard == anoproc) {
                                rltline['JUL'] = rltline['JUL'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard > mesproc) {
                            if (anocard < anoproc) {
                                rltline['JUL'] = rltline['JUL'] + newfields[z]['HF1'];
                            }
                        }
                        //rltline['JUL'] = rltline['JUL'] + newfields[z]['HF1'];
                        break;
                    case 8:
                        if (mescard < mesproc) {
                            if (anocard == anoproc) {
                                rltline['AGO'] = rltline['AGO'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard == mesproc) {
                            if (anocard == anoproc) {
                                rltline['AGO'] = rltline['AGO'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard > mesproc) {
                            if (anocard < anoproc) {
                                rltline['AGO'] = rltline['AGO'] + newfields[z]['HF1'];
                            }
                        }
                        //rltline['AGO'] = rltline['AGO'] + newfields[z]['HF1'];
                        break;
                    case 9:
                        if (mescard < mesproc) {
                            if (anocard == anoproc) {
                                rltline['SET'] = rltline['SET'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard == mesproc) {
                            if (anocard == anoproc) {
                                rltline['SET'] = rltline['SET'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard > mesproc) {
                            if (anocard < anoproc) {
                                rltline['SET'] = rltline['SET'] + newfields[z]['HF1'];
                            }
                        }
                        //rltline['SET'] = rltline['SET'] + newfields[z]['HF1'];
                        break;
                    case 10:
                        if (mescard < mesproc) {
                            if (anocard == anoproc) {
                                rltline['OUT'] = rltline['OUT'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard == mesproc) {
                            if (anocard == anoproc) {
                                rltline['OUT'] = rltline['OUT'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard > mesproc) {
                            if (anocard < anoproc) {
                                rltline['OUT'] = rltline['OUT'] + newfields[z]['HF1'];
                            }
                        }
                        //rltline['OUT'] = rltline['OUT'] + newfields[z]['HF1'];
                        break;
                    case 11:
                        if (mescard < mesproc) {
                            if (anocard == anoproc) {
                                rltline['NOV'] = rltline['NOV'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard == mesproc) {
                            if (anocard == anoproc) {
                                rltline['NOV'] = rltline['NOV'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard > mesproc) {
                            if (anocard < anoproc) {
                                rltline['NOV'] = rltline['NOV'] + newfields[z]['HF1'];
                            }
                        }
                        //rltline['NOV'] = rltline['NOV'] + newfields[z]['HF1'];
                        break;
                    case 12:
                        if (mescard < mesproc) {
                            if (anocard == anoproc) {
                                rltline['DEZ'] = rltline['DEZ'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard == mesproc) {
                            if (anocard == anoproc) {
                                rltline['DEZ'] = rltline['DEZ'] + newfields[z]['HF1'];
                            }
                        }
                        if (mescard > mesproc) {
                            if (anocard < anoproc) {
                                rltline['DEZ'] = rltline['DEZ'] + newfields[z]['HF1'];
                            }
                        }
                        //rltline['DEZ'] = rltline['DEZ'] + newfields[z]['HF1'];
                        break;
                }

            }

        }
        //}
    }

    return;
}

function calcArrRLTBar() {

    var rltlist = [];

    for (var i = 0; i < cards.length; i++) {
        for (var y = 0; y < listas.length; y++) {
            for (var z = 0; z < newfields.length; z++) {

                if (cards[i]['idList'] == listas[y]['ID'] &&
                        cards[i]['id'] == newfields[z]['CARDID']) {

                    var rltdata1 = newfields[z]['DF1'];
                    var rltdata2 = newfields[z]['DF2'];
                    var datasplit1 = rltdata1.split("-");
                    var datasplit2 = rltdata2.split("-");
                    var mes1 = "";
                    var mes2 = "";

                    if (newfields[z]['DF1'] != "") {
                        mes1 = parseInt(datasplit1[1]);
                    }
                    if (newfields[z]['DF2'] != "") {
                        mes2 = parseInt(datasplit2[1]);
                    }

                    var arrays = {
                        'CID': cards[i]['id'],
                        'NOM': cards[i]['name'],
                        'LIS': listas[y]['NAME'],
                        'DF1': newfields[z]['DF1'],
                        'DF2': newfields[z]['DF2'],
                    };
                    rltlist.push(arrays);
                }
            }
        }
    }

    console.group("Relatorio-2.1");
    console.log(rltlist);
    console.groupEnd("Relatorio-2.1");

    for (var i = 0; i < rltlist.length; i++) {

        var dat = rltlist[i]['DF1'];
        dat = dat.split("-");
        dat = parseInt(dat[1]);

        switch (dat) {
            case 1:
                if (rltlist[i]['LIS'] == "Estimativas Reprovadas/Canceladas" ||
                        rltlist[i]['LIS'] == "Estimativas Em execução" ||
                        rltlist[i]['LIS'] == "Estimativas - Aguardando Aprovação" ||
                        rltlist[i]['LIS'] == "Estimativas Aprovadas") {
                    janrlt['ANA'] = janrlt['ANA'] + 1;
                } else if (rltlist[i]['LIS'] == "Impedimentos" ||
                        rltlist[i]['LIS'] == "Desenho" ||
                        rltlist[i]['LIS'] == "Aprovação da EF (BP/Usuário)" ||
                        rltlist[i]['LIS'] == "Construção Funcional" ||
                        rltlist[i]['LIS'] == "Construção Abap" ||
                        rltlist[i]['LIS'] == "Liberação de Acesso" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário" ||
                        rltlist[i]['LIS'] == "Preparação CAB" ||
                        rltlist[i]['LIS'] == "Pós Implantação" ||
                        rltlist[i]['LIS'] == "Done" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário") {
                    janrlt['EXE'] = janrlt['EXE'] + 1;
                } else if (rltlist[i]['LIS'] == "Assessment") {
                    janrlt['ASS'] = janrlt['ASS'] + 1;
                } else {
                    dump("calcArrRLTBar(); - 311", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
                }
                break;

            case 2:
                if (rltlist[i]['LIS'] == "Estimativas Reprovadas/Canceladas" ||
                        rltlist[i]['LIS'] == "Estimativas Em execução" ||
                        rltlist[i]['LIS'] == "Estimativas - Aguardando Aprovação" ||
                        rltlist[i]['LIS'] == "Estimativas Aprovadas") {
                    fevrlt['ANA'] = fevrlt['ANA'] + 1;
                } else if (rltlist[i]['LIS'] == "Impedimentos" ||
                        rltlist[i]['LIS'] == "Desenho" ||
                        rltlist[i]['LIS'] == "Aprovação da EF (BP/Usuário)" ||
                        rltlist[i]['LIS'] == "Construção Funcional" ||
                        rltlist[i]['LIS'] == "Construção Abap" ||
                        rltlist[i]['LIS'] == "Liberação de Acesso" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário" ||
                        rltlist[i]['LIS'] == "Preparação CAB" ||
                        rltlist[i]['LIS'] == "Pós Implantação" ||
                        rltlist[i]['LIS'] == "Done" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário") {
                    fevrlt['EXE'] = fevrlt['EXE'] + 1;
                } else if (rltlist[i]['LIS'] == "Assessment") {
                    fevrlt['ASS'] = fevrlt['ASS'] + 1;
                } else {
                    dump("calcArrRLTBar(); - 338", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
                }
                break;

            case 3:
                if (rltlist[i]['LIS'] == "Estimativas Reprovadas/Canceladas" ||
                        rltlist[i]['LIS'] == "Estimativas Em execução" ||
                        rltlist[i]['LIS'] == "Estimativas - Aguardando Aprovação" ||
                        rltlist[i]['LIS'] == "Estimativas Aprovadas") {
                    marrlt['ANA'] = marrlt['ANA'] + 1;
                } else if (rltlist[i]['LIS'] == "Impedimentos" ||
                        rltlist[i]['LIS'] == "Desenho" ||
                        rltlist[i]['LIS'] == "Aprovação da EF BP/Usuário" ||
                        rltlist[i]['LIS'] == "Construção Funcional" ||
                        rltlist[i]['LIS'] == "Construção Abap" ||
                        rltlist[i]['LIS'] == "Liberação de Acesso" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário" ||
                        rltlist[i]['LIS'] == "Preparação CAB" ||
                        rltlist[i]['LIS'] == "Pós Implantação" ||
                        rltlist[i]['LIS'] == "Done" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário") {
                    marrlt['EXE'] = marrlt['EXE'] + 1;
                } else if (rltlist[i]['LIS'] == "Assessment") {
                    marrlt['ASS'] = marrlt['ASS'] + 1;
                } else {
                    dump("calcArrRLTBar(); - 365", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
                }
                break;

            case 4:
                if (rltlist[i]['LIS'] == "Estimativas Reprovadas/Canceladas" ||
                        rltlist[i]['LIS'] == "Estimativas Em execução" ||
                        rltlist[i]['LIS'] == "Estimativas - Aguardando Aprovação" ||
                        rltlist[i]['LIS'] == "Estimativas Aprovadas") {
                    abrrlt['ANA'] = abrrlt['ANA'] + 1;
                } else if (rltlist[i]['LIS'] == "Impedimentos" ||
                        rltlist[i]['LIS'] == "Desenho" ||
                        rltlist[i]['LIS'] == "Aprovação da EF BP/Usuário" ||
                        rltlist[i]['LIS'] == "Construção Funcional" ||
                        rltlist[i]['LIS'] == "Construção Abap" ||
                        rltlist[i]['LIS'] == "Liberação de Acesso" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário" ||
                        rltlist[i]['LIS'] == "Preparação CAB" ||
                        rltlist[i]['LIS'] == "Pós Implantação" ||
                        rltlist[i]['LIS'] == "Done" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário") {
                    abrrlt['EXE'] = abrrlt['EXE'] + 1;
                } else if (rltlist[i]['LIS'] == "Assessment") {
                    abrrlt['ASS'] = abrrlt['ASS'] + 1;
                } else {
                    dump("calcArrRLTBar(); - 392", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
                }
                break;

            case 5:
                if (rltlist[i]['LIS'] == "Estimativas Reprovadas/Canceladas" ||
                        rltlist[i]['LIS'] == "Estimativas Em execução" ||
                        rltlist[i]['LIS'] == "Estimativas - Aguardando Aprovação" ||
                        rltlist[i]['LIS'] == "Estimativas Aprovadas") {
                    mairlt['ANA'] = mairlt['ANA'] + 1;
                } else if (rltlist[i]['LIS'] == "Impedimentos" ||
                        rltlist[i]['LIS'] == "Desenho" ||
                        rltlist[i]['LIS'] == "Aprovação da EF BP/Usuário" ||
                        rltlist[i]['LIS'] == "Construção Funcional" ||
                        rltlist[i]['LIS'] == "Construção Abap" ||
                        rltlist[i]['LIS'] == "Liberação de Acesso" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário" ||
                        rltlist[i]['LIS'] == "Preparação CAB" ||
                        rltlist[i]['LIS'] == "Pós Implantação" ||
                        rltlist[i]['LIS'] == "Done" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário") {
                    mairlt['EXE'] = mairlt['EXE'] + 1;
                } else if (rltlist[i]['LIS'] == "Assessment") {
                    mairlt['ASS'] = mairlt['ASS'] + 1;
                } else {
                    dump("calcArrRLTBar(); - 419", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
                }
                break;

            case 6:
                if (rltlist[i]['LIS'] == "Estimativas Reprovadas/Canceladas" ||
                        rltlist[i]['LIS'] == "Estimativas Em execução" ||
                        rltlist[i]['LIS'] == "Estimativas - Aguardando Aprovação" ||
                        rltlist[i]['LIS'] == "Estimativas Aprovadas") {
                    junrlt['ANA'] = junrlt['ANA'] + 1;
                } else if (rltlist[i]['LIS'] == "Impedimentos" ||
                        rltlist[i]['LIS'] == "Desenho" ||
                        rltlist[i]['LIS'] == "Aprovação da EF (BP/Usuário)" ||
                        rltlist[i]['LIS'] == "Construção Funcional" ||
                        rltlist[i]['LIS'] == "Construção Abap" ||
                        rltlist[i]['LIS'] == "Liberação de Acesso" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário" ||
                        rltlist[i]['LIS'] == "Preparação CAB" ||
                        rltlist[i]['LIS'] == "Pós Implantação" ||
                        rltlist[i]['LIS'] == "Done" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário") {
                    junrlt['EXE'] = junrlt['EXE'] + 1;
                } else if (rltlist[i]['LIS'] == "Assessment") {
                    junrlt['ASS'] = junrlt['ASS'] + 1;
                } else {
                    dump("calcArrRLTBar(); - 446", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
                }
                break;

            case 7:
                if (rltlist[i]['LIS'] == "Estimativas Reprovadas/Canceladas" ||
                        rltlist[i]['LIS'] == "Estimativas Em execução" ||
                        rltlist[i]['LIS'] == "Estimativas - Aguardando Aprovação" ||
                        rltlist[i]['LIS'] == "Estimativas Aprovadas") {
                    julrlt['ANA'] = julrlt['ANA'] + 1;
                } else if (rltlist[i]['LIS'] == "Impedimentos" ||
                        rltlist[i]['LIS'] == "Desenho" ||
                        rltlist[i]['LIS'] == "Aprovação da EF (BP/Usuário)" ||
                        rltlist[i]['LIS'] == "Construção Funcional" ||
                        rltlist[i]['LIS'] == "Construção Abap" ||
                        rltlist[i]['LIS'] == "Liberação de Acesso" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário" ||
                        rltlist[i]['LIS'] == "Preparação CAB" ||
                        rltlist[i]['LIS'] == "Pós Implantação" ||
                        rltlist[i]['LIS'] == "Done" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário") {
                    julrlt['EXE'] = julrlt['EXE'] + 1;
                } else if (rltlist[i]['LIS'] == "Assessment") {
                    julrlt['ASS'] = julrlt['ASS'] + 1;
                } else {
                    dump("calcArrRLTBar(); - 473", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
                }
                break;

            case 8:
                if (rltlist[i]['LIS'] == "Estimativas Reprovadas/Canceladas" ||
                        rltlist[i]['LIS'] == "Estimativas Em execução" ||
                        rltlist[i]['LIS'] == "Estimativas - Aguardando Aprovação" ||
                        rltlist[i]['LIS'] == "Estimativas Aprovadas") {
                    agorlt['ANA'] = agorlt['ANA'] + 1;
                } else if (rltlist[i]['LIS'] == "Impedimentos" ||
                        rltlist[i]['LIS'] == "Desenho" ||
                        rltlist[i]['LIS'] == "Aprovação da EF (BP/Usuário)" ||
                        rltlist[i]['LIS'] == "Construção Funcional" ||
                        rltlist[i]['LIS'] == "Construção Abap" ||
                        rltlist[i]['LIS'] == "Liberação de Acesso" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário" ||
                        rltlist[i]['LIS'] == "Preparação CAB" ||
                        rltlist[i]['LIS'] == "Pós Implantação" ||
                        rltlist[i]['LIS'] == "Done" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário") {
                    agorlt['EXE'] = agorlt['EXE'] + 1;
                } else if (rltlist[i]['LIS'] == "Assessment") {
                    agorlt['ASS'] = agorlt['ASS'] + 1;
                } else {
                    dump("calcArrRLTBar(); - 500", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
                }
                break;

            case 9:
                if (rltlist[i]['LIS'] == "Estimativas Reprovadas/Canceladas" ||
                        rltlist[i]['LIS'] == "Estimativas Em execução" ||
                        rltlist[i]['LIS'] == "Estimativas - Aguardando Aprovação" ||
                        rltlist[i]['LIS'] == "Estimativas Aprovadas") {
                    setrlt['ANA'] = setrlt['ANA'] + 1;
                } else if (rltlist[i]['LIS'] == "Impedimentos" ||
                        rltlist[i]['LIS'] == "Desenho" ||
                        rltlist[i]['LIS'] == "Aprovação da EF (BP/Usuário)" ||
                        rltlist[i]['LIS'] == "Construção Funcional" ||
                        rltlist[i]['LIS'] == "Construção Abap" ||
                        rltlist[i]['LIS'] == "Liberação de Acesso" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário" ||
                        rltlist[i]['LIS'] == "Preparação CAB" ||
                        rltlist[i]['LIS'] == "Pós Implantação" ||
                        rltlist[i]['LIS'] == "Done" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário") {
                    setrlt['EXE'] = setrlt['EXE'] + 1;
                } else if (rltlist[i]['LIS'] == "Assessment") {
                    setrlt['ASS'] = setrlt['ASS'] + 1;
                } else {
                    dump("calcArrRLTBar(); - 527", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
                }
                break;

            case 10:
                if (rltlist[i]['LIS'] == "Estimativas Reprovadas/Canceladas" ||
                        rltlist[i]['LIS'] == "Estimativas Em execução" ||
                        rltlist[i]['LIS'] == "Estimativas - Aguardando Aprovação" ||
                        rltlist[i]['LIS'] == "Estimativas Aprovadas") {
                    outrlt['ANA'] = outrlt['ANA'] + 1;
                } else if (rltlist[i]['LIS'] == "Impedimentos" ||
                        rltlist[i]['LIS'] == "Desenho" ||
                        rltlist[i]['LIS'] == "Aprovação da EF (BP/Usuário)" ||
                        rltlist[i]['LIS'] == "Construção Funcional" ||
                        rltlist[i]['LIS'] == "Construção Abap" ||
                        rltlist[i]['LIS'] == "Liberação de Acesso" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário" ||
                        rltlist[i]['LIS'] == "Preparação CAB" ||
                        rltlist[i]['LIS'] == "Pós Implantação" ||
                        rltlist[i]['LIS'] == "Done" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário") {
                    outrlt['EXE'] = outrlt['EXE'] + 1;
                } else if (rltlist[i]['LIS'] == "Assessment") {
                    outrlt['ASS'] = outrlt['ASS'] + 1;
                } else {
                    dump("calcArrRLTBar(); - 554", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
                }
                break;

            case 11:
                if (rltlist[i]['LIS'] == "Estimativas Reprovadas/Canceladas" ||
                        rltlist[i]['LIS'] == "Estimativas Em execução" ||
                        rltlist[i]['LIS'] == "Estimativas - Aguardando Aprovação" ||
                        rltlist[i]['LIS'] == "Estimativas Aprovadas") {
                    novrlt['ANA'] = novrlt['ANA'] + 1;
                } else if (rltlist[i]['LIS'] == "Impedimentos" ||
                        rltlist[i]['LIS'] == "Desenho" ||
                        rltlist[i]['LIS'] == "Aprovação da EF (BP/Usuário)" ||
                        rltlist[i]['LIS'] == "Construção Funcional" ||
                        rltlist[i]['LIS'] == "Construção Abap" ||
                        rltlist[i]['LIS'] == "Liberação de Acesso" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário" ||
                        rltlist[i]['LIS'] == "Preparação CAB" ||
                        rltlist[i]['LIS'] == "Pós Implantação" ||
                        rltlist[i]['LIS'] == "Done" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário") {
                    novrlt['EXE'] = novrlt['EXE'] + 1;
                } else if (rltlist[i]['LIS'] == "Assessment") {
                    novrlt['ASS'] = novrlt['ASS'] + 1;
                } else {
                    dump("calcArrRLTBar(); - 581", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
                }
                break;

            case 12:
                if (rltlist[i]['LIS'] == "Estimativas Reprovadas/Canceladas" ||
                        rltlist[i]['LIS'] == "Estimativas Em execução" ||
                        rltlist[i]['LIS'] == "Estimativas - Aguardando Aprovação" ||
                        rltlist[i]['LIS'] == "Estimativas Aprovadas") {
                    dezrlt['ANA'] = dezrlt['ANA'] + 1;
                } else if (rltlist[i]['LIS'] == "Impedimentos" ||
                        rltlist[i]['LIS'] == "Desenho" ||
                        rltlist[i]['LIS'] == "Aprovação da EF (BP/Usuário)" ||
                        rltlist[i]['LIS'] == "Construção Funcional" ||
                        rltlist[i]['LIS'] == "Construção Abap" ||
                        rltlist[i]['LIS'] == "Liberação de Acesso" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário" ||
                        rltlist[i]['LIS'] == "Preparação CAB" ||
                        rltlist[i]['LIS'] == "Pós Implantação" ||
                        rltlist[i]['LIS'] == "Done" ||
                        rltlist[i]['LIS'] == "Teste Funcional" ||
                        rltlist[i]['LIS'] == "Teste do Usuário") {
                    dezrlt['EXE'] = dezrlt['EXE'] + 1;
                } else if (rltlist[i]['LIS'] == "Assessment") {
                    dezrlt['ASS'] = dezrlt['ASS'] + 1;
                } else {
                    dump("calcArrRLTBar(); - 608", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
                }
                break;

            default:
                console.group("DUMP - calcArrRLTBar();");
                console.error(dat);
                console.error(rltlist[i]);
                console.groupEnd();
                dump("calcArrRLTBar(); - 613", "Data DF1 não foi cadastrado no chamado " + rltlist[i]['NOM']);
                break;
        }
    }

    console.group("Relatorio-2.2");
    //console.log();
    console.groupEnd("Relatorio-2.2");
}

function mes(i) {
    var indx = 0;
    if (i <= 0) {
        indx = 0;
    } else {
        indx = i - 1;
    }
    var arrmeses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEV"];

    return arrmeses[indx];
}

function rltLine() {

    var ctx1 = document.getElementById('myChart-line').getContext('2d');
    var chart = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: ["Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"],
            datasets: [{
                    label: "Consumo Mensal (H%)",
                    backgroundColor: 'rgb(158, 158, 158)',
                    borderColor: 'rgb(158, 158, 158)',
                    fill: false,
                    responsive: true,
                    maintainAspectRatio: true,
                    data: [rltline['NOV'], rltline['DEZ'], rltline['JAN'], rltline['FEV'], rltline['MAR'], rltline['ABR'], rltline['MAI'], rltline['JUN'], rltline['JUL'], rltline['AGO'], rltline['SET'], rltline['OUT']],
                }]
        },
        // Configuration options go here
        options: {}
    });
}

function rltBar() {

    var ctx2 = document.getElementById('myChart-bar').getContext('2d');
    var chart = new Chart(ctx2, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels: ["Out", "Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"],
            datasets: [{
                    label: "Estimativa",
                    backgroundColor: 'rgb(21, 49, 211)',
                    borderColor: 'rgb(21, 49, 211)',
                    stack: 'Stack 0',
                    fill: false,
                    responsive: true,
                    maintainAspectRatio: true,
                    data: [outrlt['ANA'], novrlt['ANA'], dezrlt['ANA'], janrlt['ANA'], fevrlt['ANA'], marrlt['ANA'], abrrlt['ANA'], mairlt['ANA'], junrlt['ANA'], julrlt['ANA'], agorlt['ANA'], setrlt['ANA']],
                },
                {
                    label: "Construção",
                    backgroundColor: 'rgb(29, 186, 113)',
                    borderColor: 'rgb(29, 186, 113)',
                    stack: 'Stack 0',
                    fill: false,
                    responsive: true,
                    maintainAspectRatio: true,
                    data: [outrlt['EXE'], novrlt['EXE'], dezrlt['EXE'], janrlt['EXE'], fevrlt['EXE'], marrlt['EXE'], abrrlt['EXE'], mairlt['EXE'], junrlt['EXE'], julrlt['EXE'], agorlt['EXE'], setrlt['EXE']],
                },
                {
                    label: "Assessment",
                    backgroundColor: 'rgb(242, 107, 24)',
                    borderColor: 'rgb(242, 107, 24)',
                    stack: 'Stack 0',
                    fill: false,
                    responsive: true,
                    maintainAspectRatio: true,
                    data: [outrlt['ASS'], novrlt['ASS'], dezrlt['ASS'], janrlt['ASS'], fevrlt['ASS'], marrlt['ASS'], abrrlt['ASS'], mairlt['ASS'], junrlt['ASS'], julrlt['ASS'], agorlt['ASS'], setrlt['ASS']],
                }]
        },
        // Configuration options go here
        options: {
            title: {
                display: false,
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                        stacked: true,
                    }],
                yAxes: [{
                        stacked: true
                    }]
            }
        }
    }
    );

}


function rltLinEst() {

    var estmes = {
        'OUT': 0,
        'NOV': 0,
        'DEZ': 0,
        'JAN': 0,
        'FEV': 0,
        'MAR': 0,
        'ABR': 0,
        'MAI': 0,
        'JUN': 0,
        'JUL': 0,
        'AGO': 0,
        'SET': 0,
    };

    var tlsmes = {
        'OUT': 0,
        'NOV': 0,
        'DEZ': 0,
        'JAN': 0,
        'FEV': 0,
        'MAR': 0,
        'ABR': 0,
        'MAI': 0,
        'JUN': 0,
        'JUL': 0,
        'AGO': 0,
        'SET': 0,
    };

    for (var i = 0; i < cards.length; i++) {
        for (var x = 0; x < listas.length; x++) {
            for (var n = 0; n < newfields.length; n++) {

                if (newfields[n]['CARDID'] == cards[i]['id'] &&
                        cards[i]['idList'] == listas[x]['ID']) {

                    if (listas[x]['NAME'] == "Estimativas Aprovadas" ||
                            listas[x]['NAME'] == "Estimativas Reprovadas/Canceladas" ||
                            listas[x]['NAME'] == "Estimativas - Aguardando Aprovação") {

                        var mes1 = "";
                        var mes2 = "";

                        if (newfields[n]['DF1'] != "") {
                            var rltdata1 = newfields[n]['DF1'];
                            var datasplit1 = rltdata1.split("-");
                            mes1 = parseInt(datasplit1[1]);

                            switch (mes1) {
                                case 1:
                                    tlsmes['JAN'] = tlsmes['JAN'] + 1;
                                    estmes['JAN'] = estmes['JAN'] + newfields[n]['HF1'];
                                    break;
                                case 2:
                                    tlsmes['FEV'] = tlsmes['FEV'] + 1;
                                    estmes['FEV'] = estmes['FEV'] + newfields[n]['HF1'];
                                    break;
                                case 3:
                                    tlsmes['MAR'] = tlsmes['MAR'] + 1;
                                    estmes['MAR'] = estmes['MAR'] + newfields[n]['HF1'];
                                    break;
                                case 4:
                                    tlsmes['ABR'] = tlsmes['ABR'] + 1;
                                    estmes['ABR'] = estmes['ABR'] + newfields[n]['HF1'];
                                    break;
                                case 5:
                                    tlsmes['MAI'] = tlsmes['MAI'] + 1;
                                    estmes['MAI'] = estmes['MAI'] + newfields[n]['HF1'];
                                    break;
                                case 6:
                                    tlsmes['JUN'] = tlsmes['JUN'] + 1;
                                    estmes['JUN'] = estmes['JUN'] + newfields[n]['HF1'];
                                    break;
                                case 7:
                                    tlsmes['JUL'] = tlsmes['JUL'] + 1;
                                    estmes['JUL'] = estmes['JUL'] + newfields[n]['HF1'];
                                    break;
                                case 8:
                                    tlsmes['AGO'] = tlsmes['AGO'] + 1;
                                    estmes['AGO'] = estmes['AGO'] + newfields[n]['HF1'];
                                    break;
                                case 9:
                                    tlsmes['SET'] = tlsmes['SET'] + 1;
                                    estmes['SET'] = estmes['SET'] + newfields[n]['HF1'];
                                    break;
                                case 10:
                                    tlsmes['OUT'] = tlsmes['OUT'] + 1;
                                    estmes['OUT'] = estmes['OUT'] + newfields[n]['HF1'];
                                    break;
                                case 11:
                                    tlsmes['NOV'] = tlsmes['NOV'] + 1;
                                    estmes['NOV'] = estmes['NOV'] + newfields[n]['HF1'];
                                    break;
                                case 12:
                                    tlsmes['DEZ'] = tlsmes['DEZ'] + 1;
                                    estmes['DEZ'] = estmes['DEZ'] + newfields[n]['HF1'];
                                    break;
                            }
                        }
                        if (newfields[n]['DF2'] != "") {
                            var rltdata2 = newfields[n]['DF2'];
                            var datasplit2 = rltdata2.split("-");
                            mes2 = parseInt(datasplit2[1]);

                            switch (mes2) {
                                case 1:
                                    tlsmes['JAN'] = tlsmes['JAN'] + 1;
                                    estmes['JAN'] = estmes['JAN'] + newfields[n]['HF2'];
                                    break;
                                case 2:
                                    tlsmes['FEV'] = tlsmes['FEV'] + 1;
                                    estmes['FEV'] = estmes['FEV'] + newfields[n]['HF2'];
                                    break;
                                case 3:
                                    tlsmes['MAR'] = tlsmes['MAR'] + 1;
                                    estmes['MAR'] = estmes['MAR'] + newfields[n]['HF2'];
                                    break;
                                case 4:
                                    tlsmes['ABR'] = tlsmes['ABR'] + 1;
                                    estmes['ABR'] = estmes['ABR'] + newfields[n]['HF2'];
                                    break;
                                case 5:
                                    tlsmes['MAI'] = tlsmes['MAI'] + 1;
                                    estmes['MAI'] = estmes['MAI'] + newfields[n]['HF2'];
                                    break;
                                case 6:
                                    tlsmes['JUN'] = tlsmes['JUN'] + 1;
                                    estmes['JUN'] = estmes['JUN'] + newfields[n]['HF2'];
                                    break;
                                case 7:
                                    tlsmes['JUL'] = tlsmes['JUL'] + 1;
                                    estmes['JUL'] = estmes['JUL'] + newfields[n]['HF2'];
                                    break;
                                case 8:
                                    tlsmes['AGO'] = tlsmes['AGO'] + 1;
                                    estmes['AGO'] = estmes['AGO'] + newfields[n]['HF2'];
                                    break;
                                case 9:
                                    tlsmes['SET'] = tlsmes['SET'] + 1;
                                    estmes['SET'] = estmes['SET'] + newfields[n]['HF2'];
                                    break;
                                case 10:
                                    tlsmes['OUT'] = tlsmes['OUT'] + 1;
                                    estmes['OUT'] = estmes['OUT'] + newfields[n]['HF2'];
                                    break;
                                case 11:
                                    tlsmes['NOV'] = tlsmes['NOV'] + 1;
                                    estmes['NOV'] = estmes['NOV'] + newfields[n]['HF2'];
                                    break;
                                case 12:
                                    tlsmes['DEZ'] = tlsmes['DEZ'] + 1;
                                    estmes['DEZ'] = estmes['DEZ'] + newfields[n]['HF2'];
                                    break;
                            }
                        }
                    }

                }

            }
        }
    }

    var rlout = estmes['OUT'] / tlsmes['OUT'];
    var rlnov = estmes['NOV'] / tlsmes['NOV'];
    var rldez = estmes['DEZ'] / tlsmes['DEZ'];
    var rljan = estmes['JAN'] / tlsmes['JAN'];
    var rlfev = estmes['FEV'] / tlsmes['FEV'];
    var rlmar = estmes['MAR'] / tlsmes['MAR'];
    var rlabr = estmes['ABR'] / tlsmes['ABR'];
    var rlmai = estmes['MAI'] / tlsmes['MAI'];
    var rljun = estmes['JUN'] / tlsmes['JUN'];
    var rljul = estmes['JUL'] / tlsmes['JUL'];
    var rlago = estmes['AGO'] / tlsmes['AGO'];
    var rlset = estmes['SET'] / tlsmes['SET'];



    var ctx1 = document.getElementById('myChart-est').getContext('2d');
    var chart = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: ["Out", "Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"],
            datasets: [{
                    label: "Estimativa (E.M)",
                    backgroundColor: 'rgb(85, 104, 214)',
                    borderColor: 'rgb(21, 49, 211)',
                    pointRadius: 0,
                    fill: false,
                    responsive: true,
                    maintainAspectRatio: true,
                    data: [rlout, rlnov, rldez, rljan, rlfev, rlmar, rlabr, rlmai, rljun, rljul, rlago, rlset],
                }]
        },
        // Configuration options go here
        options: {
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                }
            }
        }
    });

    montarInfohrs();
}

var infoshrs = [];
var arrshrs = {'mes': 'Jan', 'real': 0, 'saldo': 0};
infoshrs.push(arrshrs);
var arrshrs = {'mes': 'Fev', 'real': 0, 'saldo': 0};
infoshrs.push(arrshrs);
var arrshrs = {'mes': 'Mar', 'real': 0, 'saldo': 0};
infoshrs.push(arrshrs);
var arrshrs = {'mes': 'Abr', 'real': 0, 'saldo': 0};
infoshrs.push(arrshrs);
var arrshrs = {'mes': 'Mai', 'real': 0, 'saldo': 0};
infoshrs.push(arrshrs);
var arrshrs = {'mes': 'Jun', 'real': 0, 'saldo': 0};
infoshrs.push(arrshrs);
var arrshrs = {'mes': 'Jul', 'real': 0, 'saldo': 0};
infoshrs.push(arrshrs);
var arrshrs = {'mes': 'Ago', 'real': 0, 'saldo': 0};
infoshrs.push(arrshrs);
var arrshrs = {'mes': 'Set', 'real': 0, 'saldo': 0};
infoshrs.push(arrshrs);
var arrshrs = {'mes': 'Out', 'real': 0, 'saldo': 0};
infoshrs.push(arrshrs);
var arrshrs = {'mes': 'Nov', 'real': 0, 'saldo': 0};
infoshrs.push(arrshrs);
var arrshrs = {'mes': 'Dez', 'real': 0, 'saldo': 0};
infoshrs.push(arrshrs);

//console.error(infoshrs);

function montarInfohrs() {

    var d = new Date();
    var mn = d.getMonth();
    var ma = d.getFullYear();
    ma = parseInt(ma);
    mn = parseInt(mn);

    var conmenos = 0;

    var mn = d.getMonth();
    mn = parseInt(mn);

    for (var i = 0; i < 2; i++) {
        if (mn >= 11) {
            mn = 0;
        } else {
            mn++;
        }
    }

    for (var i = 0; i < cards.length; i++) {
        for (var n = 0; n < newfields.length; n++) {

            if (newfields[n]['CARDID'] == cards[i]['id'] &&
                    cards[i]['dueComplete'] == true) {

                if (newfields[n]['DF1'] != "") {
                    var rltdata1 = newfields[n]['DF1'];
                    var datasplit1 = rltdata1.split("-");
                    var mesdf1 = parseInt(datasplit1[1]);
                    var anodf1 = parseInt(datasplit1[2]);

                    if (anodf1 = ma) {
                        if (mesdf1 >= mn) {
                            conmenos = mesdf1 - 1;
                            infoshrs[conmenos]['real'] += newfields[n]['HF1'];
                        }
                    }
                    if (anodf1 > ma) {
                        if (mesdf1 < mn) {
                            conmenos = mesdf1 - 1;
                            infoshrs[conmenos]['real'] += newfields[n]['HF1'];
                        }
                    }

                }
            }
        }
    }

    var hrprd = 0;

    var projn = document.getElementById('titulo').innerHTML;
    for (var i = 0; i < protejos.length; i++) {
        if (protejos[i]['NOME'] == projn) {
            hrprd = protejos[i]['HRSCTR'];
        }
    }

    var projab = projn.split('-');


    var mn = d.getMonth();
    mn = parseInt(mn);

    for (var i = 0; i < 2; i++) {
        if (mn >= 11) {
            mn = 0;
        } else {
            mn++;
        }
    }

    document.getElementById('infos-hrs').innerHTML += "<tr>";
    var containg = "<th scope='row'>Hrs Real.</th>";
    containg = "<th style='border: 0px;' scope='col'>" + projab[1] + "</th>";
    for (var i = 0; i <= 11; i++) {

        if (mn >= 12) {
            mn = 0;
        }
        containg += "<th style='border: 0px;' scope='col'>" + infoshrs[mn]['mes'] + "</th>";
        mn++;
    }
    document.getElementById('infos-hrs').innerHTML += containg;
    document.getElementById('infos-hrs').innerHTML += "</tr>";

    document.getElementById('infos-hrs').innerHTML += "<tr>" +
            "<th scope='row'>Hrs Pool</th><td>175</td>" +
            "<td>" + hrprd + "</td>" +
            "<td>" + hrprd + "</td>" +
            "<td>" + hrprd + "</td>" +
            "<td>" + hrprd + "</td>" +
            "<td>" + hrprd + "</td>" +
            "<td>" + hrprd + "</td>" +
            "<td>" + hrprd + "</td>" +
            "<td>" + hrprd + "</td>" +
            "<td>" + hrprd + "</td>" +
            "<td>" + hrprd + "</td>" +
            "<td>" + hrprd + "</td>" +
            "</tr>";

    var mn = d.getMonth();
    mn = parseInt(mn);

    for (var i = 0; i < 2; i++) {
        if (mn >= 11) {
            mn = 0;
        } else {
            mn++;
        }
    }
    document.getElementById('infos-hrs').innerHTML += "<tr>";
    var containg = "<th scope='row'>Hrs Real.</th>";
    for (var i = 0; i <= 11; i++) {

        if (mn >= 12) {
            mn = 0;
        }
        containg += "<td>" + infoshrs[mn]['real'] + "</td>";
        mn++;
    }
    document.getElementById('infos-hrs').innerHTML += containg;
    document.getElementById('infos-hrs').innerHTML += "</tr>";

    var mn = d.getMonth();
    mn = parseInt(mn);

    for (var i = 0; i < 2; i++) {
        if (mn >= 11) {
            mn = 0;
        } else {
            mn++;
        }
    }
    document.getElementById('infos-hrs').innerHTML += "<tr>";
    var containg = "<th scope='row'>Hrs Saldo</th>";
    
    var anoproc = ma;
    var mesproc = mn;
    mesproc++;
    for (var i = 0; i <= 11; i++) {
        
        var escrv = 0;
        
        if (mesproc >= 13) {
            mesproc = 1;
            anoproc++;
        }
        
        for (var s = 0; s < histosaldo.length; s++) {
            if (histosaldo[s]['mes'] == mesproc && histosaldo[s]['ano'] == anoproc) {
                escrv = histosaldo[s]['total'];
            }
        }
        containg += "<td>" + escrv + "</td>";
        mesproc++;
    }
    document.getElementById('infos-hrs').innerHTML += containg;
    document.getElementById('infos-hrs').innerHTML += "</tr>";

}