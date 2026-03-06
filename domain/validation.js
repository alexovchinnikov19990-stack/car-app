export function validateMileage(newMileage, fuelList){

if(fuelList.length === 0) return true

const maxMileage = Math.max(...fuelList.map(f => f.mileage))

return newMileage > maxMileage

}
