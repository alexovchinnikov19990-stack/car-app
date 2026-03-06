function addService(){

    const name = document.getElementById("serviceName").value
    const cost = Number(document.getElementById("serviceCost").value)

    if(!name || !cost){
        alert("Заполни все поля")
        return
    }

    APP_STATE.service.push({
        name,
        cost
    })

    saveState()
    renderService()
}

function renderService(){

    const table = document.getElementById("serviceTable")

    if(!table) return

    table.innerHTML = ""

    APP_STATE.service.forEach(row=>{

        const tr = document.createElement("tr")

        tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.cost}</td>
        `

        table.appendChild(tr)

    })

}
