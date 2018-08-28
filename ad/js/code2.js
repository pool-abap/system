var saldohrmes = 0;
var saldohrprxmes = 0;

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
    mes++; //Para ajustar pas 1-12

    var prxmes = 0;

    if (mes >= 12) {
        prxmes = 0;
    } else {
        prxmes = mes + 1;
    }

    for (var z = 0; z < newfields.length; z++) {
        var datatemp = newfields[z]['DF1'];
        var datemp2 = datatemp.split("-");
        var mesproc = datemp2[1];

        if (mes == mesproc) {
            saldohrmes = saldohrmes + newfields[z]['HF1'];
            saldohrmes = saldohrmes + newfields[z]['HF2'];
        }

        if (prxmes == mesproc) {
            saldohrprxmes = saldohrprxmes + newfields[z]['HF1'];
            saldohrprxmes = saldohrprxmes + newfields[z]['HF2'];
        }
    }

    document.getElementById("saldo-atual").innerHTML = saldohrmes + "h";
    document.getElementById("saldo-prxmes").innerHTML = saldohrprxmes + "h";
	
	
	for (var pj = 0; pj < protejos.length; pj++) {
		
		if(protejos[pj]['NOME'] == titulo){
			
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
			
			var ttlms = protejos[pj]['HRSCTR'] * dif;
			var vcnt = 0;
			var hrssome = 0;
			console.error(protejos[pj]['HRSCTR'] + " Hora contrato");
			console.error(dif + " Dif de meses");
			console.error(ttlms + " Valor do Saldo Total");
			for (var i = 0; i < cards.length; i++) {
				for (var z = 0; z < newfields.length; z++) {
					if (newfields[z]['CARDID'] == cards[i]['id']) {
						ttlms = ttlms - newfields[z]['HF1'];
						ttlms = ttlms - newfields[z]['HF2'];
						var tt = newfields[z]['HF1'] + newfields[z]['HF2'];
						hrssome = hrssome + newfields[z]['HF1'] + newfields[z]['HF2'];
						console.error(vcnt + " - Card " + cards[i]['name'] + " " + tt + " Horas gastas");
						vcnt++;
					}
				}
			}
			console.error("Soma horas - " + hrssome);
		}
	}
	
	document.getElementById("saldott").innerHTML = ttlms;
	
	if(ttlms < 0){
		document.getElementById("div-saldo").style.backgroundColor = "#C82333";
	}
	if(ttlms == 0){
		document.getElementById("div-saldo").style.backgroundColor = "#E0A800";
	}
	if(ttlms > 0){
		document.getElementById("div-saldo").style.backgroundColor = "#218838";
	}
}

function calcArrRLT() {

    for (var i = 0; i < cards.length; i++) {
        //for (var y = 0; y < listas.length; y++) {
            for (var z = 0; z < newfields.length; z++) {

                if (cards[i]['dueComplete'] == true &&
                        cards[i]['id'] == newfields[z]['CARDID']) {

                    var rltdata = newfields[z]['DF1'];
                    var datasplit = rltdata.split("-");
                    var mes = parseInt(datasplit[1]);

                    switch (mes) {
                        case 1:
                            rltline['JAN'] = rltline['JAN'] + newfields[z]['HF1'];
                            break;
                        case 2:
                            rltline['FEV'] = rltline['FEV'] + newfields[z]['HF1'];
                            break;
                        case 3:
                            rltline['MAR'] = rltline['MAR'] + newfields[z]['HF1'];
                            break;
                        case 4:
                            rltline['ABR'] = rltline['ABR'] + newfields[z]['HF1'];
                            break;
                        case 5:
                            rltline['MAI'] = rltline['MAI'] + newfields[z]['HF1'];
                            break;
                        case 6:
                            rltline['JUN'] = rltline['JUN'] + newfields[z]['HF1'];
                            break;
                        case 7:
                            rltline['JUL'] = rltline['JUL'] + newfields[z]['HF1'];
                            break;
                        case 8:
                            rltline['AGO'] = rltline['AGO'] + newfields[z]['HF1'];
                            break;
                        case 9:
                            rltline['SET'] = rltline['SET'] + newfields[z]['HF1'];
                            break;
                        case 10:
                            rltline['OUT'] = rltline['OUT'] + newfields[z]['HF1'];
                            break;
                        case 11:
                            rltline['NOV'] = rltline['NOV'] + newfields[z]['HF1'];
                            break;
                        case 12:
                            rltline['DEZ'] = rltline['DEZ'] + newfields[z]['HF1'];
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
                    dump("calcArrRLTBar();", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
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
                    dump("calcArrRLTBar();", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
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
                    dump("calcArrRLTBar();", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
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
                    dump("calcArrRLTBar();", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
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
                    dump("calcArrRLTBar();", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
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
                    dump("calcArrRLTBar();", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
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
                    dump("calcArrRLTBar();", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
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
                    dump("calcArrRLTBar();", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
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
                    dump("calcArrRLTBar();", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
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
                    dump("calcArrRLTBar();", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
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
                    dump("calcArrRLTBar();", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
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
                    dump("calcArrRLTBar();", "Lista " + rltlist[i]['LIS'] + " não foi mapeada na função.");
                }
                break;

            default:
                dump("calcArrRLTBar();", "Data " + dat + " não foi mapeada na função.");
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
            labels: ["Out", "Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"],
            datasets: [{
                    label: "Consumo Mensal (H%)",
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    fill: false,
                    responsive: false,
                    maintainAspectRatio: false,
                    data: [rltline['OUT'], rltline['NOV'], rltline['DEZ'], rltline['JAN'], rltline['FEV'], rltline['MAR'], rltline['ABR'], rltline['MAI'], rltline['JUN'], rltline['JUL'], rltline['AGO'], rltline['SET']],
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
                    label: "Analyze",
                    backgroundColor: 'rgb(21, 49, 211)',
                    borderColor: 'rgb(21, 49, 211)',
                    stack: 'Stack 0',
                    fill: false,
                    responsive: true,
                    maintainAspectRatio: true,
                    data: [outrlt['ANA'], novrlt['ANA'], dezrlt['ANA'], janrlt['ANA'], fevrlt['ANA'], marrlt['ANA'], abrrlt['ANA'], mairlt['ANA'], junrlt['ANA'], julrlt['ANA'], agorlt['ANA'], setrlt['ANA']],
                },
                {
                    label: "Execution",
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