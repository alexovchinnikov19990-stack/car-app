// domain/fuel.js

import { state } from "../state/state.js";

export function addFuelRecord(record) {

    state.fuel.push({
        date: record.date,
        mileage: Number(record.mileage),
        liters: Number(record.liters),
        sum: Number(record.sum)
    });

    normalizeFuel();
}

export function deleteFuelRecord(index){

    if(!confirm("Удалить запись?")){
        return;
    }

    state.fuel.splice(index,1);

    normalizeFuel();
}

export function normalizeFuel(){

    // сортируем по пробегу
    state.fuel.sort((a,b)=>a.mileage-b.mileage);

    // пересчет расхода
    recalcConsumption();
}

function recalcConsumption(){

    for(let i=0;i<state.fuel.length;i++){

        if(i===0){
            state.fuel[i].consumption=null;
            continue;
        }

        const prev=state.fuel[i-1];
        const cur=state.fuel[i];

        const distance=cur.mileage-prev.mileage;

        if(distance<=0){
            cur.consumption=null;
            continue;
        }

        cur.consumption=(cur.liters/distance)*100;
    }

}
