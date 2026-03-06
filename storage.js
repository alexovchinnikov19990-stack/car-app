function save(){

localStorage.setItem("carData",JSON.stringify(state))

}

function load(){

let data = localStorage.getItem("carData")

if(data){

state = JSON.parse(data)

}

}
