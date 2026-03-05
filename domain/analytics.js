// domain/analytics.js

import { state } from "../state.js";
import { getFuelWithConsumption } from "./fuel.js";

//
// ===== HELPERS =====
//

function sum(arr) {
  return arr.reduce((acc, val) => acc + val, 0);
}

function filterByMonth(array, month) {
  return array.filter(e => e.date.startsWith(month));
}

//
// ===== TOTALS ALL TIME =====
//

export function getTotalsAllTime() {
  const fuelTotal = sum(state.fuel.map(e => e.totalPrice));
  const serviceTotal = sum(state.service.map(e => e.price));
  const otherTotal = sum(state.other.map(e => e.price));

  const grandTotal = fuelTotal + serviceTotal + otherTotal;

  const fuelComputed = getFuelWithConsumption();
  const consumptions = fuelComputed
    .map(e => e.consumption)
    .filter(e => e !== null);

  const averageConsumption =
    consumptions.length > 0
      ? sum(consumptions) / consumptions.length
      : null;

  const totalDistance = getTotalDistance();
  const costPerKm =
    totalDistance > 0 ? grandTotal / totalDistance : null;

  return {
    fuelTotal,
    serviceTotal,
    otherTotal,
    grandTotal,
    averageConsumption,
    costPerKm
  };
}

//
// ===== MONTH TOTALS =====
//

export function getTotalsByMonth(month) {
  const fuel = filterByMonth(state.fuel, month);
  const service = filterByMonth(state.service, month);
  const other = filterByMonth(state.other, month);

  const fuelTotal = sum(fuel.map(e => e.totalPrice));
  const serviceTotal = sum(service.map(e => e.price));
  const otherTotal = sum(other.map(e => e.price));
  const grandTotal = fuelTotal + serviceTotal + otherTotal;

  const fuelComputed = getFuelWithConsumption();
  const monthlyComputed = fuelComputed.filter(e =>
    e.date.startsWith(month)
  );

  const consumptions = monthlyComputed
    .map(e => e.consumption)
    .filter(e => e !== null);

  const averageConsumption =
    consumptions.length > 0
      ? sum(consumptions) / consumptions.length
      : null;

  return {
    fuelTotal,
    serviceTotal,
    otherTotal,
    grandTotal,
    averageConsumption
  };
}

//
// ===== DISTANCE =====
//

function getTotalDistance() {
  const fuelSorted = getFuelWithConsumption();

  if (fuelSorted.length === 0) return 0;

  const lastKm = fuelSorted[fuelSorted.length - 1].km;
  return lastKm - state.car.startKm;
}