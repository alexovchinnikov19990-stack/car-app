import { state } from "../state/state.js";

export const DEBUG = true;

export function log(...args){

    if(!DEBUG) return;

    console.log(
        "[AUTO APP]",
        ...args
    );

}

export function dumpState(){

    console.table(state.fuel);

}
