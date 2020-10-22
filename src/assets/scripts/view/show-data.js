import loadPage from './loadPage.js';
import DBFunct from "../data/db.js";

let idTitle = '';

export default class ShowData{
    static showLeague(dataLeague, id){
        let titleHTML = '';
        let dataHTML = '';
        getIdTitle(id);
        titleHTML = `<div class="card">
                        <h2 class="text-center">Liga ${idTitle}</h2>
                    </div>`;
        document.querySelector('#league').innerHTML = titleHTML;

        dataLeague.standings[0].table.forEach(function (data){
            dataHTML += `<div class="card horizontal card-league">
                            <div class="card-image league-crest">
                                <img src="${data.team.crestUrl.replace(
                                    /^http:\/\//i,
                                    'https://'
                                )}" class="crest-img" alt="badge"/>
                            </div>
                            <div class="card-stacked league-info">
                                <div class="card-content">
                                    <h3>${data.team.name}</h3>
                                    <div class="row">
                                        <div class="col s4">
                                            <p><b>${data.won} <span class="teks-hijau">Win</span></b></p>
                                        </div>
                                        <div class="col s4">
                                            <p><b>${data.draw} <span class="teks-kuning">Draws</span></b></p>
                                        </div>
                                        <div class="col s4">
                                            <p><b>${data.lost} <span class="teks-merah">Lost</span></b></p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col s6 l4">
                                            <p>Points : ${data.points}</p>
                                        </div>
                                        <div class="col s6 l4">
                                            <p>Posisi ke-${data.position}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-action">
                                    <a href="#team${data.team.id}" class="linked">Lihat Tim</a>
                                </div>
                            </div>
                        </div>`;
        })
        document.querySelector('#body-content').innerHTML += dataHTML;

        document.querySelectorAll('.linked').forEach(function (lnk) {
            lnk.addEventListener('click', function (event) {
                let href = event.target.getAttribute("href");
                loadPage(href.substr(1));
            });
        });
    }

    static showTeam(dataTeam){
        let teamHeadHTML = '';
        let dataHTML = '';
        let memberList = '';
        
        teamHeadHTML = `
        <div class="card" id="team">
            <img src="${dataTeam.crestUrl.replace(
                /^http:\/\//i,
                'https://'
            )}" class="crest-img" alt="badge"/>
            <h2 class="text-center">${dataTeam.name}</h2>
            <p class="text-center">Founded : ${dataTeam.founded}</p>
            <a class="btn-floating waves-effect waves-light" id="simpan">
                <i class="material-icons">save</i>
            </a>
        </div>
        `;

        dataTeam.squad.forEach(function (member){
            memberList += `
                <div class="card green lighten-5 row">
                    <p class="col s12 m6 l6">${member.name}</p>
                    <p class="col s12 m6 l6">: ${member.position || member.role}</p>
                </div>
            `;
        })

        dataHTML = `
            <div class="card">
                <div class="row">
                    <div class="col s12" style="margin-bottom: 30px">
                        <ul class="tabs">
                            <li class="tab col s6"><a href="#teaminfo">Informasi Tim</a></li>
                            <li class="tab col s6"><a href="#teammember">Anggota Tim</a></li>
                        </ul>
                    </div>
                    <div id="teaminfo" class="col s12">
                        <table>
                            <tr>
                                <th>Short Name</th>
                                <td>${dataTeam.shortName || 'Tidak Ada'}</td>
                            </tr>
                            <tr>
                                <th>TLA</th>
                                <td>${dataTeam.tla || 'Tidak Ada'}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>${dataTeam.address || 'Tidak Ada'}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>${dataTeam.phone || 'Tidak Ada'}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>${dataTeam.email || 'Tidak Ada'}</td>
                            </tr>
                            <tr>
                                <th>Website</th>
                                <td>${dataTeam.website || 'Tidak Ada'}</td>
                            </tr>
                        </table>
                    </div>
                    <div id="teammember" class="col s12">
                        ${memberList}
                    </div>
                </div>
            </div>`;
        document.querySelector('#teamx').innerHTML = `${teamHeadHTML}${dataHTML}`;

        $('.tabs').tabs();

        const save = document.getElementById("simpan");
        async function checkFav(){
            if (await DBFunct.isFav(dataTeam.id)){
                save.innerHTML = '<i class="material-icons">delete</i>';
            }
        }
        checkFav();

        save.onclick = async function() {
            if (await DBFunct.isFav(dataTeam.id)) {
                DBFunct.deleteTeamFav(dataTeam.id);
                save.innerHTML = '<i class="material-icons">save</i>';
                M.toast({ html: `Hapus Tim Favorit : ${dataTeam.name}` });
            } else {
                DBFunct.saveForLater(dataTeam);
                save.innerHTML = '<i class="material-icons">delete</i>';
                M.toast({ html: `Simpan Tim Favorit : ${dataTeam.name}` });
            }
        }
    }

    static showSavedTeams(){
        let savedTeamsHTML = '<h2 class="text-center">Tim Favorit</h2>';
        DBFunct.getAll().then(function(teams) {
            teams.forEach(function(team) {
                savedTeamsHTML += `
                    <div class="card horizontal card-league">
                        <div class="card-image league-crest">
                            <img src="${team.crestUrl.replace(
                                /^http:\/\//i,
                                'https://'
                            )}" class="crest-img" alt="badge"/>
                        </div>
                        <div class="card-stacked league-info">
                            <div class="card-content">
                                <h2>${team.name}</h2>
                                <p>Founded : ${team.founded}</p>
                            </div>
                            <div class="card-action">
                                <a href="#team${team.id}" class="linked">Lihat Tim</a>
                            </div>
                        </div>
                    </div>`;
            });
            document.getElementById("saved-team").innerHTML = savedTeamsHTML;
            document.querySelectorAll('.linked').forEach(function (lnk) {
                lnk.addEventListener('click', function (event) {
                    let href = event.target.getAttribute("href");
                    loadPage(href.substr(1));
                });
            });
        });
    }
}


function getIdTitle(id){
    if(id==2002){ idTitle = 'Jerman'}
    else if(id==2003){ idTitle = 'Belanda' }
    else if(id==2021){ idTitle = 'Inggris' }
    else if(id==2014){ idTitle = 'Spanyol' }
    else if(id==2015){ idTitle = 'Perancis' }
    else{ idTitle = '' }

    return idTitle;
}