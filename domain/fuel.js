function addFuel(){

    const date = document.getElementById("fuel_date").value
    const odometer = Number(document.getElementById("fuel_odometer").value)
    const liters = Number(document.getElementById("fuel_liters").value)
    const price = Number(document.getElementById("fuel_price").value)

    if(!date || !odometer || !liters || !price){
        alert("Заполните все поля")
        return
    }

    state.fuel.push({
        id: Date.now(),
        date,
        odometer,
        liters,
        price
    })

    saveState()

    renderFuel()
    updateStats()
    drawCharts()
}

function deleteFuel(id){

    if(!confirm("Удалить запись?")){
        return
    }

    state.fuel = state.fuel.filter(f => f.id !== id)

    saveState()

    renderFuel()
    updateStats()
    drawCharts()
}

function renderFuel(){

    const table = document.getElementById("fuel_table")

    if(!table) return

    const fuelSorted = [...state.fuel].sort((a,b)=>a.date.localeCompare(b.date))

    let html = ""

    fuelSorted.forEach(f => {

        html += `
        <tr>
            <td>${f.date}</td>
            <td>${f.odometer}</td>
            <td>${f.liters}</td>
            <td>${f.price}</td>
            <td>
                <button onclick="deleteFuel(${f.id})">✕</button>
            </td>
        </tr>
        `
    })

    table.innerHTML = html
}

function calculateFuelConsumption(){

    const fuelSorted = [...state.fuel].sort((a,b)=>a.date.localeCompare(b.date))

    const results = []

    for(let i=1;i<fuelSorted.length;i++){

        const prev = fuelSorted[i-1]
        const curr = fuelSorted[i]

        const distance = curr.odometer - prev.odometer

        if(distance <= 0) continue

        const consumption = (curr.liters / distance) * 100

        results.push({
            date: curr.date,
            value: Number(consumption.toFixed(2))
        })
    }

    return results
}
