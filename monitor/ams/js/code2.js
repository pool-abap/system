var projsts = [];
var chmadst = [];

function rltBar() {
	
	for (var i = 0; i < cards.length; i++) {
		var desc = cards[i]['name'];
		desc = desc.split(" ");
		desc = desc[0].split("[");
		desc = desc[1].split("]");
		desc = desc[0];
		
		desc = desc.toUpperCase();
		
		if(projsts.indexOf(desc) == -1){
			projsts.push(desc);
			chmadst.push(1);
		} else {
			chmadst[projsts.indexOf(desc)] += 1;
		}
	}
	

    var ctx1 = document.getElementById('myChart-bar').getContext('2d');
    var chart = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels: projsts,
            datasets: [{
                    label: "Quantidade de chamados Mensal",
                    backgroundColor: 'rgb(40, 76, 119)',
                    borderColor: 'rgb(40, 76, 119)',
                    fill: false,
                    responsive: false,
                    maintainAspectRatio: true,
                    data: chmadst,
                }]
        },
        // Configuration options go here
        options: {}
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
















