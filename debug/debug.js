export const DEBUG = true;

export function log(...args){

    if(!DEBUG) return;

    console.log(
        "[AUTO APP]",
        ...args
    );

}

export function dumpState(state){

    if(!DEBUG) return;

    console.log("===== STATE =====");
    console.log(JSON.stringify(state, null, 2));

}
