// domain/other.js

import { state, generateId } from "../state.js";

export function validateOtherEntry(entry) {
  if (!entry.date) return "Дата обязательна";
  if (!entry.title) return "Название обязательно";
  if (entry.price <= 0) return "Сумма должна быть больше 0";

  return null;
}

export function addOther(entry) {
  const error = validateOtherEntry(entry);
  if (error) return { error };

  state.other.push({
    id: generateId(),
    date: entry.date,
    title: entry.title,
    price: Number(entry.price)
  });

  return { success: true };
}

export function updateOther(id, updatedEntry) {
  const error = validateOtherEntry(updatedEntry);
  if (error) return { error };

  const index = state.other.findIndex(e => e.id === id);
  if (index === -1) return { error: "Запись не найдена" };

  state.other[index] = {
    id,
    date: updatedEntry.date,
    title: updatedEntry.title,
    price: Number(updatedEntry.price)
  };

  return { success: true };
}

export function removeOther(id) {
  state.other = state.other.filter(e => e.id !== id);
  return { success: true };
}