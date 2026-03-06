import {state} from "../state.js"
import {validateOdo} from "./validation.js"

export function addFuelRecord(date,odo,liters,sum){

if(!validateOdo(state,odo)){

alert("Пробег должен быть больше предыдущего")

return

}

state.fuel.push({

date,
odo:Number(odo),
liters:Number(liters),
sum:Number(sum)

})

}

export function removeFuel(i){

state.fuel.splice(i,1)

}