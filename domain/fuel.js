function addFuel(){

let date = document.getElementById("fuelDate").value
let km = Number(document.getElementById("fuelKm").value)
let liters = Number(document.getElementById("fuelLiters").value)
let price = Number(document.getElementById("fuelPrice").value)

if(!date || !km || !liters || !price) return

state.fuel.push({date,km,liters,price})

state.fuel.sort((a,b)=> new Date(a.date)-new Date(b.date))

save()

renderFuel()
updateStats()
drawCharts()

}

function deleteFuel(i){

if(!confirm("Удалить запись?")) return

state.fuel.splice(i,1)

save()

renderFuel()
updateStats()
drawCharts()

}

function renderFuel(){

let tbody = document.querySelector("#fuelTable tbody")

tbody.innerHTML=""

state.fuel.forEach((f,i)=>{

let prev = state.fuel[i-1]

let pricePer = (f.price/f.liters).toFixed(2)

let cons="-"

if(prev){

let km = f.km-prev.km

cons = (f.liters/km*100).toFixed(2)

}

tbody.innerHTML+=`

<tr>

<td>${f.date}</td>
<td>${f.km}</td>
<td>${f.liters}</td>
<td>${f.price}</td>
<td>${pricePer}</td>
<td>${cons}</td>

<td>
<button onclick="deleteFuel(${i})">X</button>
</td>

</tr>

`

})

}
