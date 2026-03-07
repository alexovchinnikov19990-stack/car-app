document.addEventListener("DOMContentLoaded", startApp)

function startApp(){

    console.log("APP START")

    loadState()

    renderFuel()
    renderService()
    renderOther()

}

function drawCharts(){

    if(typeof Chart === "undefined") return

    const data = calculateFuelConsumption()

    const labels = data.map(d=>d.date)
    const values = data.map(d=>d.value)

    const ctx = document.getElementById("fuelChart")

    if(!ctx) return

    if(window.fuelChart){
        window.fuelChart.destroy()
    }

    window.fuelChart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Расход л/100км",
                data: values
            }]
        }
    })
}
