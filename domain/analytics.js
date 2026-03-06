function updateStats(){

let fuel=state.fuel.reduce((s,f)=>s+f.price,0)

let service=state.service.reduce((s,f)=>s+f.price,0)

let other=state.other.reduce((s,f)=>s+f.price,0)

let total=fuel+service+other

document.getElementById("fuelTotal").textContent=fuel
document.getElementById("serviceTotal").textContent=service
document.getElementById("otherTotal").textContent=other

document.getElementById("allTotal").textContent=total

if(state.fuel.length>1){

let liters=0
let km=0

for(let i=1;i<state.fuel.length;i++){

liters+=state.fuel[i].liters
km+=state.fuel[i].km-state.fuel[i-1].km

}

let avg=(liters/km*100).toFixed(2)

document.getElementById("avg").textContent=avg

document.getElementById("kmCost").textContent=(fuel/km).toFixed(2)

}

}
