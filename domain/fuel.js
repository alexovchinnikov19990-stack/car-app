// domain/fuel.js

import { state, generateId } from "../state.js";

//
// ===== VALIDATION =====
//

export function validateFuelEntry(entry, isEdit = false, editingId = null) {
  if (!entry.date) return "Дата обязательна";
  if (entry.km == null || entry.km < state.car.startKm)
    return `Пробег должен быть ≥ ${state.car.startKm}`;
  if (entry.liters <= 0) return "Литры должны быть больше 0";
  if (entry.totalPrice <= 0) return "Сумма должна быть больше 0";

  const testArray = state.fuel
    .filter(e => (isEdit ? e.id !== editingId : true))
    .concat({ ...entry })
    .sort((a, b) => a.km - b.km);

  for (let i = 1; i < testArray.length; i++) {
    if (testArray[i].km <= testArray[i - 1].km) {
      return "Пробег должен строго возрастать";
    }
  }

  return null;
}

//
// ===== CRUD =====
//

export function addFuel(entry) {
  const error = validateFuelEntry(entry);
  if (error) return { error };

  const newEntry = {
    id: generateId(),
    date: entry.date,
    km: Number(entry.km),
    liters: Number(entry.liters),
    totalPrice: Number(entry.totalPrice)
  };

  state.fuel.push(newEntry);

  return { success: true };
}

export function updateFuel(id, updatedEntry) {
  const error = validateFuelEntry(updatedEntry, true, id);
  if (error) return { error };

  const index = state.fuel.findIndex(e => e.id === id);
  if (index === -1) return { error: "Запись не найдена" };

  state.fuel[index] = {
    id,
    date: updatedEntry.date,
    km: Number(updatedEntry.km),
    liters: Number(updatedEntry.liters),
    totalPrice: Number(updatedEntry.totalPrice)
  };

  return { success: true };
}

export function removeFuel(id) {
  state.fuel = state.fuel.filter(e => e.id !== id);
  return { success: true };
}

//
// ===== COMPUTED =====
//

export function getSortedFuel() {
  return [...state.fuel].sort((a, b) => a.km - b.km);
}

export function getFuelWithConsumption() {
  const sorted = getSortedFuel();
  const result = [];

  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];
    let consumption = null;
    let pricePerLiter = null;

    if (i > 0) {
      const prev = sorted[i - 1];
      const distance = current.km - prev.km;

      if (distance > 0) {
        consumption = (current.liters / distance) * 100;
      }
    }

    pricePerLiter = current.totalPrice / current.liters;

    result.push({
      ...current,
      pricePerLiter,
      consumption
    });
  }

  return result;
}