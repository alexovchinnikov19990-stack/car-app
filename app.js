document.addEventListener("DOMContentLoaded", initApp)

function initApp(){

    console.log("APP STARTED")

    if(typeof renderFuel === "function"){
        renderFuel()
    }

    if(typeof renderService === "function"){
        renderService()
    }

    if(typeof renderOther === "function"){
        renderOther()
    }

    if(typeof updateStats === "function"){
        updateStats()
    }

    if(typeof drawCharts === "function"){
        drawCharts()
    }

}
