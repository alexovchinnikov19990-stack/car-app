import { state } from "./state.js";

export function updateState(mutator){

    const clone = structuredClone(state);

    mutator(clone);

    Object.keys(state).forEach(k=>delete state[k]);

    Object.assign(state, clone);

    state.meta.lastUpdate = new Date().toISOString();

    saveLocal();

}

function saveLocal(){

    localStorage.setItem(
        "car_app_state",
        JSON.stringify(state)
    );

}

export function loadLocal(){

    const data = localStorage.getItem("car_app_state");

    if(!data) return;

    const parsed = JSON.parse(data);

    Object.assign(state, parsed);

}
