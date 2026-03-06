function saveState(){
    localStorage.setItem("car_state", JSON.stringify(APP_STATE))
}

function loadState(){

    const data = localStorage.getItem("car_state")

    if(!data) return

    try{
        const parsed = JSON.parse(data)

        APP_STATE.fuel = parsed.fuel || []
        APP_STATE.service = parsed.service || []
        APP_STATE.other = parsed.other || []

    }catch(e){
        console.error("LOAD ERROR", e)
    }

}
