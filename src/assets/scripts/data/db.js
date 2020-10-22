import idb from "./idb.js";

const dbPromised = idb.open("bebola", 1, function(upgradeDb) {
    const articlesObjectStore = upgradeDb.createObjectStore("favteam", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", { unique: false });
});

export default class DBFunct{
    static saveForLater(team) {
        dbPromised
            .then(function(db) {
                let tx = db.transaction("favteam", "readwrite");
                let store = tx.objectStore("favteam");
                store.add(team);
                return tx.complete;
        })
            .then(function() {
                console.log("Artikel berhasil di simpan.");
        });
    }

    static getAll() {
        return new Promise(function(resolve) {
            dbPromised
                .then(function(db) {
                    var tx = db.transaction("favteam", "readonly");
                    var store = tx.objectStore("favteam");
                    return store.getAll();
                })
                .then(function(team) {
                    resolve(team);
                });
        });
    }

    static isFav(id) {
        return dbPromised
            .then(async (db) => {
                const tx = await db.transaction('favteam', 'readonly');
                const data = await tx.objectStore('favteam').get(id);
                return data == undefined ? false : true;
            });
    }

    static deleteTeamFav(id) {
        dbPromised
            .then((db) => {
                const tx = db.transaction('favteam', 'readwrite');
                tx.objectStore('favteam').delete(id);
                return tx.complete;
            });
    }
}