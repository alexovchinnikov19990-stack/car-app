function addOther(){

let name=document.getElementById("otherName").value
let price=Number(document.getElementById("otherPrice").value)

if(!name||!price) return

state.other.push({name,price})

save()

renderOther()
updateStats()

}

function renderOther(){

let list=document.getElementById("otherList")

list.innerHTML=""

state.other.forEach(o=>{

let li=document.createElement("li")

li.textContent=o.name+" — "+o.price

list.appendChild(li)

})

}
