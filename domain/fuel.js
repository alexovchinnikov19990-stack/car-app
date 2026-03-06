export function calculateFuelData(list){

for(let i=0;i<list.length;i++){

const item = list[i]

item.price = item.sum / item.liters

if(i===0){

item.consumption = null

}else{

const prev = list[i-1]

const distance = item.mileage - prev.mileage

item.consumption = (item.liters / distance) * 100

}

}

return list

}
