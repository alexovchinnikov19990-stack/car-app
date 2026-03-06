// domain/analytics.js

import { state } from "../state/state.js";

export function getAverageConsumption(){

    const values=state.fuel
        .map(r=>r.consumption)
        .filter(v=>v!==null);

    if(values.length===0){
        return 0;
    }

    const sum=values.reduce((a,b)=>a+b,0);

    return sum/values.length;

}

export function getFuelChartData(){

    const labels=[];
    const values=[];

    state.fuel.forEach(r=>{

        if(r.consumption!==null){

            labels.push(r.date);
            values.push(r.consumption);

        }

    });

    return {labels,values};

}
