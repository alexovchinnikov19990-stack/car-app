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
