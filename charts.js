import {state} from "./state.js"

let consChart
let costChart
let odoChart

export function drawCharts(){

const labels=state.fuel.map(x=>x.date)

const cons=[]
const cost=[]
const odo=[]

for(let i=1;i<state.fuel.length;i++){

const prev=state.fuel[i-1]
const cur=state.fuel[i]

const dist=cur.odo-prev.odo

cons.push((cur.liters/dist*100).toFixed(2))
cost.push(cur.sum)
odo.push(cur.odo)

}

if(consChart)consChart.destroy()
if(costChart)costChart.destroy()
if(odoChart)odoChart.destroy()

consChart=new Chart(
document.getElementById("consChart"),
{
type:"line",
data:{labels,datasets:[{label:"Расход",data:cons}]}
})

costChart=new Chart(
document.getElementById("costChart"),
{
type:"line",
data:{labels,datasets:[{label:"Расходы",data:cost}]}
})

odoChart=new Chart(
document.getElementById("odoChart"),
{
type:"line",
data:{labels,datasets:[{label:"Пробег",data:odo}]}
})

}