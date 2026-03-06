export function totalFuel(list){

return list.reduce((sum,i)=>sum+i.sum,0)

}

export function avgConsumption(list){

const valid = list.filter(i=>i.consumption)

if(valid.length===0) return null

const sum = valid.reduce((s,i)=>s+i.consumption,0)

return sum/valid.length

}

export function costPerKm(list){

if(list.length<2) return null

const total = totalFuel(list)

const km = list[list.length-1].mileage - list[0].mileage

return total/km

}
