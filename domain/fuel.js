function addFuel(){

    const date = document.getElementById("fuelDate").value
    const odo = Number(document.getElementById("fuelOdo").value)
    const liters = Number(document.getElementById("fuelLiters").value)
    const price = Number(document.getElementById("fuelPrice").value)

    if(!date || !odo || !liters || !price){
        alert("Заполни все поля")
        return
    }

    APP_STATE.fuel.push({
        date,
        odo,
        liters,
        price
    })

    saveState()
    renderFuel()
}

function renderFuel(){

    const table = document.getElementById("fuelTable")

    if(!table) return

    table.innerHTML = ""

    APP_STATE.fuel.forEach(row=>{

        const tr = document.createElement("tr")

        const sum = (row.liters * row.price).toFixed(2)

        tr.innerHTML = `
        <td>${row.date}</td>
        <td>${row.odo}</td>
        <td>${row.liters}</td>
        <td>${sum}</td>
        `

        table.appendChild(tr)

    })

}
