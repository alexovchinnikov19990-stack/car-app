import {state} from "./state.js"
import {load,save,createBackup,restoreBackup} from "./storage.js"

import {addFuelRecord,removeFuel} from "./domain/fuel.js"
import {totalFuel,averageConsumption,costPerKm} from "./domain/analytics.js"

import {drawCharts} from "./charts.js"

window.createBackup=createBackup

document
.getElementById("restoreFile")
.addEventListener("change",e=>{

restoreBackup(e.target.files[0])

})

load()

function render(){

const table=document.getElementById("fuelTable")

table.innerHTML=""

state.fuel.forEach((f,i)=>{

const price=(f.sum/f.liters).toFixed(2)

let cons="-"

if(i>0){

const prev=state.fuel[i-1]

const dist=f.odo-prev.odo

cons=(f.liters/dist*100).toFixed(2)

}

table.innerHTML+=`

<tr>

<td>${f.date}</td>
<td>${f.odo}</td>
<td>${f.liters}</td>
<td>${f.sum}</td>
<td>${price}</td>
<td>${cons}</td>

<td>
<button onclick="delFuel(${i})">Удалить</button>
</td>

</tr>

`

})

document.getElementById("fuelTotal").innerText=totalFuel()

document.getElementById("total").innerText=totalFuel()

document.getElementById("avg").innerText=averageConsumption()

document.getElementById("costkm").innerText=costPerKm()

drawCharts()

save()

}

window.addFuel=function(){

const date=document.getElementById("date").value
const odo=document.getElementById("odo").value
const liters=document.getElementById("liters").value
const sum=document.getElementById("sum").value

addFuelRecord(date,odo,liters,sum)

render()

}

window.delFuel=function(i){

removeFuel(i)

render()

}

render()