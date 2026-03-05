// domain/service.js

import { state, generateId } from "../state.js";

export function validateServiceEntry(entry) {
  if (!entry.date) return "Дата обязательна";
  if (entry.km < state.car.startKm)
    return `Пробег должен быть ≥ ${state.car.startKm}`;
  if (!entry.title) return "Название обязательно";
  if (entry.price <= 0) return "Сумма должна быть больше 0";

  return null;
}

export function addService(entry) {
  const error = validateServiceEntry(entry);
  if (error) return { error };

  state.service.push({
    id: generateId(),
    date: entry.date,
    km: Number(entry.km),
    title: entry.title,
    price: Number(entry.price)
  });

  return { success: true };
}

export function updateService(id, updatedEntry) {
  const error = validateServiceEntry(updatedEntry);
  if (error) return { error };

  const index = state.service.findIndex(e => e.id === id);
  if (index === -1) return { error: "Запись не найдена" };

  state.service[index] = {
    id,
    date: updatedEntry.date,
    km: Number(updatedEntry.km),
    title: updatedEntry.title,
    price: Number(updatedEntry.price)
  };

  return { success: true };
}

export function removeService(id) {
  state.service = state.service.filter(e => e.id !== id);
  return { success: true };
}