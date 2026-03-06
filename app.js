import { state } from "./state.js"
import { save, load } from "./storage.js"

import { calculateFuelData } from "./domain/fuel.js"
import { validateMileage } from "./domain/validation.js"
import { totalFuel, avgConsumption, costPerKm } from "./domain/analytics.js"

load()

window.addFuel = function(){

const date = document.getElementById("date").value
const mileage = Number(document.getElementById("mileage").value)
const liters = Number(document.getElementById("liters").value)
const sum = Number(document.getElementById("sum").value)

if(!validateMileage(mileage,state.fuel)){

alert("Пробег должен быть больше предыдущего")

return

}

state.fuel.push({

date,
mileage,
liters,
sum

})

state.fuel.sort((a,b)=> new Date(a.date)-new Date(b.date))

calculateFuelData(state.fuel)

save()

render()

}

function render(){

const table = document.getElementById("fuelTable")

table.innerHTML=""

state.fuel.forEach((f,i)=>{

const tr=document.createElement("tr")

tr.innerHTML=`
<td>${f.date}</td>
<td>${f.mileage}</td>
<td>${f.liters}</td>
<td>${f.sum}</td>
<td>${f.price?.toFixed(2)}</td>
<td>${f.consumption?f.consumption.toFixed(2):"-"}</td>
<td><button onclick="removeFuel(${i})">Удалить</button></td>
`

table.appendChild(tr)

})

document.getElementById("fuelTotal").innerText=totalFuel(state.fuel)

document.getElementById("total").innerText=totalFuel(state.fuel)

const avg=avgConsumption(state.fuel)

document.getElementById("avg").innerText=avg?avg.toFixed(2):"-"

const cost=costPerKm(state.fuel)

document.getElementById("costKm").innerText=cost?cost.toFixed(2):"-"

}

window.removeFuel=function(index){

if(!confirm("Удалить запись?")) return

state.fuel.splice(index,1)

calculateFuelData(state.fuel)

save()

render()

}

render()
