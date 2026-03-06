export function validateOdo(state,newOdo){

if(state.fuel.length===0)return true

const last=state.fuel[state.fuel.length-1]

return newOdo>last.odo

}