import { state } from "../state/state.js";

export function exportBackup(){

    const data = JSON.stringify(state, null, 2);

    const blob = new Blob(
        [data],
        { type:"application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "belgee_backup.json";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

}

export function importBackup(file){

    const reader = new FileReader();

    reader.onload = function(){

        const data = JSON.parse(reader.result);

        localStorage.setItem(
            "car_app_state",
            JSON.stringify(data)
        );

        location.reload();

    };

    reader.readAsText(file);

}

const KEY = "belgee_data";
const BACKUPS = "belgee_backups";

let changeCounter = 0;

export function saveState(state){

localStorage.setItem(KEY, JSON.stringify(state));

changeCounter++;

if(changeCounter >= 5){

createAutoBackup();

changeCounter = 0;

}

}

export function loadState(){

const raw = localStorage.getItem(KEY);

if(!raw) return null;

return JSON.parse(raw);

}

function createAutoBackup(){

const backups = JSON.parse(
localStorage.getItem(BACKUPS) || "[]"
);

const current = localStorage.getItem(KEY);

backups.unshift({

date: new Date().toISOString(),
data: current

});

if(backups.length > 3){

backups.pop();

}

localStorage.setItem(
BACKUPS,
JSON.stringify(backups)
);

}

export function exportBackup(){

const data = localStorage.getItem(KEY);

const blob = new Blob([data], {
type: "application/json"
});

const a = document.createElement("a");

a.href = URL.createObjectURL(blob);

a.download = "belgee_backup.json";

a.click();

}

export function importBackup(file){

const reader = new FileReader();

reader.onload = function(){

localStorage.setItem(KEY, reader.result);

location.reload();

};

reader.readAsText(file);

}
