var projsts = [];
var prjtsarr = [];
var chmadst = [];

var projscors = [];

var pjcors = [
    'LACTALIS',
    'rgb(37,156,212)'
];
projscors.push(pjcors);
var pjcors = [
    'COTY',
    'rgb(81,24,112)'
];
projscors.push(pjcors);
var pjcors = [
    'LDC',
    'rgb(0,78,116)'
];
projscors.push(pjcors);
var pjcors = [
    'JDE',
    'rgb(65,32,16)'
];
projscors.push(pjcors);

var corarrs = [
    'rgb(244,18,9)',
    'rgb(244,142,52)',
    'rgb(244,244,0)',
    'rgb(104,203,59)',
    'rgb(24,210,234)',
    'rgb(0,102,204)',
    'rgb(152,53,152)',
    'rgb(160,57,57)',
    'rgb(219,103,2)',
    'rgb(53,163,3)',
    'rgb(7,74,142)',
    'rgb(89,19,89)',
];

var contcor = 0;


//Desativadooooo ---------------
function radomcolor() {
    var clrs;

    var vlrR = Math.floor(Math.random() * 256);
    var vlrG = Math.floor(Math.random() * 256);
    var vlrB = Math.floor(Math.random() * 256);

    clrs = "rgb(" + vlrR + ", " + vlrG + ", " + vlrB + ")";

    return clrs;
}

for (var i = 0; i < 100; i++) {
    //var color = radomcolor();
    //corarrs.push(color);
}
//----------------------------------------

function rltBar() {

    for (var i = 0; i < cards.length; i++) {
        var desc = cards[i]['name'];
        desc = desc.split(" ");
        desc = desc[0].split("[");
        desc = desc[1].split("]");
        desc = desc[0];

        desc = desc.toUpperCase();

        if (projsts.indexOf(desc) == -1) {

            if (contcor >= 12) {
                contcor = 0;
            } else {
                contcor = contcor + 1;
            }

            projsts.push(desc);

            chmadst.push(1);
        } else {
            chmadst[projsts.indexOf(desc)] += 1;
        }
    }

    for (var h = 0; h < projsts.length; h++) {
        var stak = 'Stack ' + contcor;
        var corss = corarrs[h];
        
        for (var g = 0; g < projscors.length; g++) {
            if(projsts[h] == projscors[g][0]){
                corss = projscors[g][1];
            }
        }
        
        
        var arystemp = {
            label: projsts[h],
            backgroundColor: corss,
            borderColor: corss,
            stack: 'Stack 0',
            //stack: stak,
            fill: false,
            responsive: true,
            maintainAspectRatio: true,
            data: [chmadst[h]],
        };
        prjtsarr.push(arystemp);
    }

    console.warn(prjtsarr);

    var ctx1 = document.getElementById('myChart-bar').getContext('2d');
    var chart = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            //labels: projsts,
            datasets: prjtsarr
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
                yAxes: [{
                        //stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                xAxes: [{
                        //stacked: true,
                        gridLines: {
                            offsetGridLines: true
                        }
                    }]
            }
        }
    });
}

function diasNoMes(mes, ano) {
    var data = new Date(ano, mes, 0);
    return data.getDate();
}

function RpValorByDay(dma) {
    var vlrr = 0;

    for (a = 0; a < cards.length; a++) {
        
        var dtsc = cards[a]['due'].split("T");
        
        if(dma == dtsc[0]){
            vlrr++;
        }
    }

    return vlrr;
}

function rltLine() {

    var dthj = new Date();
    //var ttds = diasNoMes(dthj.getMonth(), dthj.getFullYear());
    var ttds = dthj.getDate();
    var dma;
    
    var rllabels = [];
    var rldata = [];
    
    var messs = dthj.getMonth();
    messs++;
    if (messs < 10) {
        messs = "0" + messs;
    }
    var anomes = dthj.getFullYear() + "-" + messs;
    
    var ddt;
    
    if (ttds <= 15) {
        
        for (i = 1; i <= 15; i++) {
            
            if(i <= 9){
                ddt = "0" + i;
            } else {
                ddt = i;
            }
            dma = anomes + "-" + ddt;
            
            var itxt = "" + i + "";
            rllabels.push(itxt);

            var vint = RpValorByDay(dma);
            rldata.push(vint);
        }
        
    } else {
        for (i = 1; i <= ttds; i++) {
            
            if(i < 9){
                ddt = "0" + i;
            } else {
                ddt = i;
            }
            dma = anomes + "-" + ddt;
            
            var itxt = "" + i + "";
            rllabels.push(itxt);

            var vint = RpValorByDay(dma);
            rldata.push(vint);
        }
    }


    var ctx1 = document.getElementById('myChart-line').getContext('2d');
    var chart = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: rllabels,
            datasets: [{
                    label: "Aberturas de chamado",
                    backgroundColor: 'rgb(40, 76, 119)',
                    borderColor: 'rgb(40, 76, 119)',
                    pointRadius: 0,
                    fill: false,
                    responsive: true,
                    maintainAspectRatio: true,
                    data: rldata,
                }]
        },
        // Configuration options go here
        options: {
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                }
            },
            scales: {
                yAxes: [{
                        //stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                xAxes: [{
                        //stacked: true,
                        gridLines: {
                            offsetGridLines: true
                        }
                    }]
            }
        }
    });
}
/*
 function rltBar() {
 
 var ctx2 = document.getElementById('myChart-bar').getContext('2d');
 var chart = new Chart(ctx2, {
 // The type of chart we want to create
 type: 'bar',
 // The data for our dataset
 data: {
 labels: [""],
 datasets: [{
 label: "Estimativa",
 backgroundColor: 'rgb(21, 49, 211)',
 borderColor: 'rgb(21, 49, 211)',
 stack: 'Stack 0',
 fill: false,
 responsive: true,
 maintainAspectRatio: true,
 data: 1,
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
 }*/
















