import ShowData from "../view/show-data.js";
import PageLoader from "../view/pageLoader.js";

const BASE_URL = 'https://api.football-data.org/v2/';

export default class DataSource{
    static fetchAPI(endpoint){
        const API_KEY = '7f8e4d7a3bb74352a5f53bda1279fb80';
        
        return fetch(endpoint, {
            headers: {
                "X-Auth-Token" : API_KEY
            }
        })
            .then(response => response.json())
            .then((responseJSON) => {
                if(responseJSON){
                    return Promise.resolve(responseJSON);
                }else{
                    return Promise.reject(
                        new Error(`Gagal melakukan Fetch dari : ${endpoint}`)
                    );
                }
            })
            .catch(() =>{
                return Promise.reject(
                    new Error(`Gagal melakukan Fetch dari : ${endpoint}`)
                );
            })
    }

    static async getLeague(id){
        try{
            PageLoader.viewPreloader();
            if ('caches' in window) {
                caches.match(`${BASE_URL}competitions/${id}/standings`).then(function (response) {
                    if (response) {
                        response.json().then(function (result) {
                            ShowData.showLeague(result, id);
                        });
                    }
                });
            }
            const result = await DataSource.fetchAPI(`${BASE_URL}competitions/${id}/standings`);
            ShowData.showLeague(result,id);
            PageLoader.removePreloader();
        }
        catch(message){
            console.log(message);
            PageLoader.removePreloader();
        }
    }

    static async getTeam(id){
        try{
            PageLoader.viewPreloader();
            if ('caches' in window) {
                caches.match(`${BASE_URL}teams/${id}`).then(function (response) {
                    if (response) {
                        response.json().then(function (result) {
                            ShowData.showTeam(result);
                        });
                    }
                });
            }
            const result = await DataSource.fetchAPI(`${BASE_URL}teams/${id}`);
            ShowData.showTeam(result);
            PageLoader.removePreloader();
        }
        catch(message){
            console.log(message);
            PageLoader.removePreloader();
        }
    }

    static getSavedTeams() {
        ShowData.showSavedTeams();
    }
}