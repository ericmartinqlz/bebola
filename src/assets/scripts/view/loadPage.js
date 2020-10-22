import imgTentangBola from "../../images/tentang-bola.jpg";
import imgProfil from "../../images/profil.jpg";
import DataSource from "../data/data-source.js";
import PageLoader from "../view/pageLoader.js";

export default function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    PageLoader.removePreloader();
    let id = '';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const content = document.querySelector("#body-content");
            if (this.status == 200) {                
                content.innerHTML = xhttp.responseText;

                if(page === 'home'){
                    document.getElementById('tentang-bola').src = imgTentangBola;
                }else if(page === 'about'){
                    document.getElementById('profil-img').src = imgProfil;
                }else if(page.substring(0,6) === 'league'){
                    DataSource.getLeague(id);
                }else if(page.substring(0,4) === 'team'){
                    DataSource.getTeam(id);
                }else if (page === "saved") {
                    DataSource.getSavedTeams();
                }

            } else if (this.status == 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    if(page.substring(0,6)==='league'){
        id = page.substr(6);
        xhttp.open("GET", "assets/pages/league.html", true);
        xhttp.send();
    }else if(page.substring(0,4)==='team'){
        id = page.substr(4);
        xhttp.open("GET", "assets/pages/team.html", true);
        xhttp.send();
    }else{
        xhttp.open("GET", "assets/pages/" + page + ".html", true);
        xhttp.send();
    }
}