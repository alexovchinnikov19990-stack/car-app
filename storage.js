import {state} from "./state.js"

export function save(){

localStorage.setItem("carData", JSON.stringify(state))

}

export function load(){

const data = localStorage.getItem("carData")

if(data){

const parsed = JSON.parse(data)

state.fuel = parsed.fuel || []
state.service = parsed.service || []
state.other = parsed.other || []
state.odoHistory = parsed.odoHistory || []

}

}

export function createBackup(){

const blob = new Blob(
[JSON.stringify(state)],
{type:"application/json"}
)

const url = URL.createObjectURL(blob)

const a=document.createElement("a")

a.href=url
a.download="belgee-backup.json"
a.click()

}

export function restoreBackup(file){

const reader=new FileReader()

reader.onload=e=>{

const data=JSON.parse(e.target.result)

Object.assign(state,data)

save()
location.reload()

}

reader.readAsText(file)

}