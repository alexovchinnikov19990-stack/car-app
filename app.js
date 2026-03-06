document.addEventListener("DOMContentLoaded", startApp)

function startApp(){

    console.log("APP START")

    loadState()

    renderFuel()
    renderService()
    renderOther()

}
