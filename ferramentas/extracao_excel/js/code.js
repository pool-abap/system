<!doctype html>
<html lang="pt-br">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

        <title>Extração Trello Excel</title>

        <link rel="shortcut icon" href="https://rentadrone.cl/wp-content/uploads/2016/12/pie-chart-1.png" />
		
		<style type="text/css">
			.principal {
				float: left;
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0px;
				left: 0px;
				bottom: 0px;
				right: 0px;
				background-color: rgba(0, 0, 0, 0.1);
			}
			#btnext {
				float: left;
				position: absolute;
				width: 118px;
				height: 38px;
				margin-left: calc(50% - 59px);
				margin-right: calc(50% - 59px);
				top: calc(50% - 19px);
				left: 0px;
				bottom: 0px;
				right: 0px;
			}
		</style>
	    
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://api.trello.com/1/client.js?key=dfb54d90bc0945c459d85ea11fda3e49"></script>
        <script type="text/javascript">

            var me;
			var url = ""; //Variavel onde vai receber todos os link AJAX
			var cards = []; //Array que vai receber os cards do board selecionado
			var labels = []; //Array que vai receber os labels do board selecionado

            window.Trello.authorize({
                type: 'redirect',
                name: 'Sistema ABAP Softtek',
                persist: false,
                scope: {
                    read: true,
                    write: true,
                    account: true},
                expiration: '1hour',
                success: authenticationSuccess,
                error: authenticationFailure
            });

            function authenticationFailure() {
                console.log("%cErro na Autenticação.", "font-family: 'Arial'; font-weight: bold; color: red; font-size: 15px");
                throw new Error("Erro na Autenticação.");
            }

            function authenticationSuccess() {
                console.log("%cAutenticado com sucesso.", "font-family: 'Arial'; font-weight: bold; color: green; font-size: 15px");
            }

            window.onload = function (e) {

                Trello.members.get("me", function (data) {
                    me = data;
                    console.log(me);
                }, function (err) {
                    console.log("Erro");
                    console.log(err);
                });

            }
			
			function Extrair() {
			
				try {
					
					/* Inicio Logica */
					url = "https://api.trello.com/1/boards/" + me['idBoards'][0];
					var ajax1 = $.ajax({
						url: url,
						type: 'GET',
						dataType: 'json',
						beforeSend: function () {
							console.log("Buscando Board...");
						}
					})
						.done(function (data) {
							console.log(data);
						})
						.fail(function (jqXHR, textStatus, data) {
							throw "A requisição AJAX para buscar os Boards falhou!.";
						});
		
				}
				catch(err) {
					document.body.innerHTML = document.body.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>" +
								"<strong>Erro!</strong> Tivemos um erro interno para ultilizar a API Trello, aperte F5, se o erro persistir por favor entrar em contado com os desenvolvedores." +
								"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
								"<span aria-hidden='true'>&times;</span>" +
								"</button>" +
								"</div>";
					document.getElementById("progressbar").innerHTML = "";
					document.getElementById("btnext").style.display = "block";
					return;
				}
			
				console.log('Iniciando extração...');
				document.getElementById("btnext").style.display = "none";
				document.getElementById("progressbar").innerHTML = "<div class='progress-bar' role='progressbar' style='width: 0%' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100'></div>";
				
				setTimeout(function(){
					document.getElementById("progressbar").innerHTML = "<div class='progress-bar' role='progressbar' style='width: 25%' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div>";
				}, 1000);
				
				setTimeout(function(){
					document.getElementById("progressbar").innerHTML = "<div class='progress-bar' role='progressbar' style='width: 50%' aria-valuenow='50' aria-valuemin='0' aria-valuemax='100'></div>";
				}, 2000);
				
				setTimeout(function(){
					document.getElementById("progressbar").innerHTML = "<div class='progress-bar' role='progressbar' style='width: 75%' aria-valuenow='75' aria-valuemin='0' aria-valuemax='100'></div>";
				}, 3000);
				
				
				setTimeout(function(){
					document.getElementById("progressbar").innerHTML = "<div class='progress-bar' role='progressbar' style='width: 100%' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'></div>";
				}, 4000);
				
				setTimeout(function(){
					console.log('Escolha a pasta para salvar...');
					
					//window.open('data:application/vnd.ms-excel,' + $('#dvData').html());
					
					var excel = document.createElement('a');
					var data_type = 'data:application/vnd.ms-excel';
					var table_div = document.getElementById('dvData');
					var table_html = table_div.outerHTML.replace(/ /g, '%20');
					excel.href = data_type + ', ' + table_html;
					excel.download = 'Extracao_Trello.xls';
					excel.click();
					
					console.log('Extração completa...');
					document.getElementById("progressbar").innerHTML = "";
					document.getElementById("btnext").style.display = "block";
				}, 4500);
				
				
			}
        </script>
    </head>
    <body>
		<main class="principal">
			<div class="progress" id="progressbar">
			</div>
			<button type="button" id="btnext" onclick="Extrair();" class="btn btn-success"><b>Extrair Excel</b></button>
		</main>
		
		<div id="dvData" style="display: none;">
			<table>
				<tr>
					<th>Column One</th>
					<th>Column Two</th>
					<th>Column Three</th>
				</tr>
				<tr>
					<td>row1 Col1</td>
					<td>row1 Col2</td>
					<td>row1 Col3</td>
				</tr>
				<tr>
					<td>row2 Col1</td>
					<td>row2 Col2</td>
					<td>row2 Col3</td>
				</tr>
				<tr>
					<td>row3 Col1</td>
					<td>row3 Col2</td>
					<td><a href="http://www.jquery2dotnet.com/">http://www.jquery2dotnet.com/</a>
					</td>
				</tr>
			</table>
		</div>
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </body>
</html>
