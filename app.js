// app.js

import { loadState, saveState, createBackup } from "./storage.js";
import { addFuel, removeFuel, updateFuel, getFuelWithConsumption } from "./domain/fuel.js";
import { addService, removeService } from "./domain/service.js";
import { addOther, removeOther } from "./domain/other.js";
import { getTotalsAllTime } from "./domain/analytics.js";
import {
  renderExpenseChart,
  renderFuelConsumptionChart,
  renderExpenseLineChart,
  renderMileageChart
} from "./charts.js";

//
// ===== INIT =====
//

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  refreshUI();
});

//
// ===== REFRESH =====
//

function refreshUI() {
  renderTotals();
  renderFuelTable();
  renderCharts();
  saveState();
}

//
// ===== TOTALS =====
//

function renderTotals() {
  const totals = getTotalsAllTime();

  const container = document.getElementById("totals");

  container.innerHTML = `
    <p>Топливо: ${totals.fuelTotal.toFixed(2)}</p>
    <p>Сервис: ${totals.serviceTotal.toFixed(2)}</p>
    <p>Прочее: ${totals.otherTotal.toFixed(2)}</p>
    <p><strong>Всего: ${totals.grandTotal.toFixed(2)}</strong></p>
    <p>Средний расход: ${
      totals.averageConsumption
        ? totals.averageConsumption.toFixed(2)
        : "-"
    }</p>
    <p>Стоимость 1 км: ${
      totals.costPerKm ? totals.costPerKm.toFixed(2) : "-"
    }</p>
  `;
}

//
// ===== FUEL TABLE =====
//

function renderFuelTable() {
  const fuel = getFuelWithConsumption();
  const container = document.getElementById("fuelTable");

  container.innerHTML = fuel
    .map(
      e => `
      <tr>
        <td>${e.date}</td>
        <td>${e.km}</td>
        <td>${e.liters}</td>
        <td>${e.totalPrice}</td>
        <td>${e.pricePerLiter.toFixed(2)}</td>
        <td>${e.consumption ? e.consumption.toFixed(2) : "-"}</td>
        <td>
          <button onclick="deleteFuel('${e.id}')">Удалить</button>
        </td>
      </tr>
    `
    )
    .join("");
}

//
// ===== CHARTS =====
//

function renderCharts() {
  renderExpenseChart("expensePie");
  renderFuelConsumptionChart("fuelLine");
  renderExpenseLineChart("expenseLine");
  renderMileageChart("mileageLine");
}

//
// ===== GLOBAL ACTIONS =====
//

window.addFuelFromForm = function () {
  const date = document.getElementById("fuelDate").value;
  const km = Number(document.getElementById("fuelKm").value);
  const liters = Number(document.getElementById("fuelLiters").value);
  const totalPrice = Number(document.getElementById("fuelPrice").value);

  const result = addFuel({ date, km, liters, totalPrice });

  if (result.error) {
    alert(result.error);
    return;
  }

  refreshUI();
};

window.deleteFuel = function (id) {
  removeFuel(id);
  refreshUI();
};

window.createBackupNow = function () {
  createBackup();
  alert("Бэкап создан");
};