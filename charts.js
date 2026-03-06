let chart

function drawCharts(){

if(chart) chart.destroy()

let labels=[]
let data=[]

for(let i=1;i<state.fuel.length;i++){

let prev=state.fuel[i-1]
let cur=state.fuel[i]

let km=cur.km-prev.km

let cons=cur.liters/km*100

labels.push(cur.date)
data.push(cons)

}

chart=new Chart(

document.getElementById("chartFuel"),

{
type:"line",

data:{
labels:labels,

datasets:[
{
label:"Расход",
data:data
}
]

}

})

}
