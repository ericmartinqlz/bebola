import loadPage from './loadPage.js';

document.addEventListener("DOMContentLoaded", function() {
    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

    // Activate sidebar nav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav('top');
    loadNav('side');
});

function loadNav(param) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status !== 200) return;
    
            // Muat daftar tautan menu
            document.querySelectorAll(`.${param}nav`).forEach(
                elm => elm.innerHTML = xhttp.responseText
            );

            $('.dropdown-button').dropdown();

            document.querySelectorAll(`.${param}nav a.link`).forEach(function(elm) {
                elm.addEventListener("click", function(event) {
                    // Tutup sidenav
                    if(param === 'side'){
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                    }
            
                    // Muat konten halaman yang dipanggil
                    let page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                });
            });
        }
    };

    xhttp.open("GET", `assets/appShell/${param}nav.html`, true);
    xhttp.send();
}