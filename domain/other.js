function addOther(){

    const name = document.getElementById("otherName").value
    const cost = Number(document.getElementById("otherCost").value)

    if(!name || !cost){
        alert("Заполни все поля")
        return
    }

    APP_STATE.other.push({
        name,
        cost
    })

    saveState()
    renderOther()
}

function renderOther(){

    const table = document.getElementById("otherTable")

    if(!table) return

    table.innerHTML = ""

    APP_STATE.other.forEach(row=>{

        const tr = document.createElement("tr")

        tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.cost}</td>
        `

        table.appendChild(tr)

    })

}
