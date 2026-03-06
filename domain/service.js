function addService(){

let name=document.getElementById("serviceName").value
let price=Number(document.getElementById("servicePrice").value)

if(!name||!price) return

state.service.push({name,price})

save()

renderService()
updateStats()

}

function renderService(){

let list=document.getElementById("serviceList")

list.innerHTML=""

state.service.forEach(s=>{

let li=document.createElement("li")

li.textContent=s.name+" — "+s.price

list.appendChild(li)

})

}
