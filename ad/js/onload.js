//Rotinas para quando a tela carregar
window.onload = function () {
    document.body.style.opacity = "1.0";
    montarData();
    if (configs['CFG_ABR']) {
        console.warn("A página vai atualizar em 60 segundos.");
        setTimeout(function () {
            location.reload();
        }, 60000);
    }
};