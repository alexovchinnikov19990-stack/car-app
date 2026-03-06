import {state} from "../state.js"

export function totalFuel(){

return state.fuel.reduce((a,b)=>a+b.sum,0)

}

export function averageConsumption(){

if(state.fuel.length<2)return "-"

let total=0
let count=0

for(let i=1;i<state.fuel.length;i++){

const prev=state.fuel[i-1]
const cur=state.fuel[i]

const dist=cur.odo-prev.odo

if(dist>0){

total+=cur.liters/dist*100
count++

}

}

return (total/count).toFixed(2)

}

export function costPerKm(){

if(state.fuel.length<2)return "-"

const first=state.fuel[0]
const last=state.fuel[state.fuel.length-1]

const dist=last.odo-first.odo

const cost=totalFuel()

return (cost/dist).toFixed(2)

}