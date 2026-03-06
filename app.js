load()

renderFuel()
renderService()
renderOther()
updateStats()
drawCharts()

function openTab(id){

  document.querySelectorAll("section").forEach(s=>{
    s.classList.remove("active")
  })

  document.getElementById(id).classList.add("active")

}

function downloadBackup(){

let data = JSON.stringify(state)

let blob = new Blob([data],{type:"application/json"})

let a = document.createElement("a")

a.href = URL.createObjectURL(blob)

a.download = "car_backup.json"

a.click()

}

function restoreBackup(){

let file = document.getElementById("backupFile").files[0]

if(!file) return

let reader = new FileReader()

reader.onload = function(){

state = JSON.parse(reader.result)

save()

location.reload()

}

reader.readAsText(file)

}
