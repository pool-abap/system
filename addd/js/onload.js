//Rotinas para quando a tela carregar
            window.onload = function () {
                document.body.style.opacity = "1.0";

                setInterval(function () {
                    montarDtHr();
                }, 100);

                if (configs['CFG_ABR']) {
                    
                }
            };