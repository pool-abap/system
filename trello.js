class Trello {
		
	constructor(key, token) {
		if(key == "" || token == ""){
			throw "KEY ou TOKEN vazio - obrigatório o preenchimento";
		} else {
			this.key = key;
			this.token = token;
		}
	}
  
	boards(){		
		this.url = "https://api.trello.com/1/members/me/boards?key=" + this.key + "&token=" + this.token;
		this.ajax1 = $.ajax({
			url: this.url,
			type: 'GET',
			dataType: 'json',
			beforeSend: function () {
				console.log("Buscando Boards...");
			}
		})
			.done(function (data) {
				console.log(data);
				return data;
			})
			.fail(function (jqXHR, textStatus, data) {
				throw "Erro AJAX";
			});
	}
    
	cards(id){
		url = "https://api.trello.com/1/boards/" + id + "/cards/?key=" + this.key + "&token=" + this.token;
		var ajax2 = $.ajax({
			url: this.url,
			type: 'get',
			dataType: 'json',
			beforeSend: function () {
				console.log("Buscando Cards...");
			}
		})
            .done(function (data) {
				return data;
			})
			.fail(function (jqXHR, textStatus, data) {
				throw "Erro AJAX";
			});
	}
	  
	teste(){
		return true;
	}
}