import { state } from "./state.js"

export function save(){

localStorage.setItem("carData", JSON.stringify(state))

}

export function load(){

const data = localStorage.getItem("carData")

if(data){

const parsed = JSON.parse(data)

Object.assign(state, parsed)

}

}
