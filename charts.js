// charts.js

import { getFuelWithConsumption } from "./domain/fuel.js";
import { getTotalsAllTime } from "./domain/analytics.js";
import { state } from "./state.js";

let expenseChart = null;
let fuelChart = null;
let mileageChart = null;

function destroyChart(chart) {
  if (chart) chart.destroy();
}

//
// ===== PIE — STRUCTURE =====
//

export function renderExpenseChart(canvasId) {
  const ctx = document.getElementById(canvasId);

  destroyChart(expenseChart);

  const totals = getTotalsAllTime();

  expenseChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Топливо", "Сервис", "Прочее"],
      datasets: [
        {
          data: [
            totals.fuelTotal,
            totals.serviceTotal,
            totals.otherTotal
          ]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

//
// ===== LINE — FUEL CONSUMPTION =====
//

export function renderFuelConsumptionChart(canvasId) {
  const ctx = document.getElementById(canvasId);

  destroyChart(fuelChart);

  const fuel = getFuelWithConsumption();

  const labels = fuel.map(e => e.date);
  const values = fuel.map(e => e.consumption);

  fuelChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Расход (л/100км)",
          data: values,
          spanGaps: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

//
// ===== LINE — EXPENSES OVER TIME =====
//

export function renderExpenseLineChart(canvasId) {
  const ctx = document.getElementById(canvasId);

  destroyChart(expenseChart);

  const fuel = state.fuel.map(e => ({
    date: e.date,
    value: e.totalPrice
  }));

  const service = state.service.map(e => ({
    date: e.date,
    value: e.price
  }));

  const other = state.other.map(e => ({
    date: e.date,
    value: e.price
  }));

  const combined = [...fuel, ...service, ...other]
    .sort((a, b) => a.date.localeCompare(b.date));

  const labels = combined.map(e => e.date);
  const values = combined.map(e => e.value);

  expenseChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Расходы",
          data: values
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

//
// ===== LINE — MILEAGE =====
//

export function renderMileageChart(canvasId) {
  const ctx = document.getElementById(canvasId);

  destroyChart(mileageChart);

  const fuel = getFuelWithConsumption();

  const labels = fuel.map(e => e.date);
  const values = fuel.map(e => e.km);

  mileageChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Пробег",
          data: values
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}