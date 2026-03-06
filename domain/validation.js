// domain/validation.js

export function validateFuelInput(data){

    if(!data.date){
        alert("Укажите дату");
        return false;
    }

    if(data.mileage<=0){
        alert("Некорректный пробег");
        return false;
    }

    if(data.liters<=0){
        alert("Некорректный объем топлива");
        return false;
    }

    if(data.sum<0){
        alert("Некорректная сумма");
        return false;
    }

    return true;

}
