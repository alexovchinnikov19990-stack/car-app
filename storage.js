// storage.js

import { state } from "./state.js";

const STORAGE_KEY = "autoTracker_v1";

//
// ===== SAVE / LOAD =====
//

export function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);

    // Проверка структуры
    if (
      parsed &&
      parsed.car &&
      Array.isArray(parsed.fuel) &&
      Array.isArray(parsed.service) &&
      Array.isArray(parsed.other)
    ) {
      Object.assign(state, parsed);
    }
  } catch (e) {
    console.error("Ошибка загрузки state:", e);
  }
}

//
// ===== BACKUPS =====
//

export function createBackup() {
  const snapshot = JSON.parse(JSON.stringify(state));

  state.backups.push({
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    snapshot
  });

  saveState();
}

export function restoreBackup(id) {
  const backup = state.backups.find(b => b.id === id);
  if (!backup) return { error: "Бэкап не найден" };

  const snapshot = backup.snapshot;

  if (
    snapshot &&
    snapshot.car &&
    Array.isArray(snapshot.fuel)
  ) {
    Object.assign(state, snapshot);
    saveState();
    return { success: true };
  }

  return { error: "Битый бэкап" };
}

export function deleteBackup(id) {
  state.backups = state.backups.filter(b => b.id !== id);
  saveState();
}

//
// ===== EXPORT / IMPORT =====
//

export function exportJSON() {
  const blob = new Blob(
    [JSON.stringify(state, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "auto_backup.json";
  a.click();

  URL.revokeObjectURL(url);
}

export function importJSON(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      try {
        const parsed = JSON.parse(event.target.result);

        if (
          parsed &&
          parsed.car &&
          Array.isArray(parsed.fuel)
        ) {
          Object.assign(state, parsed);
          saveState();
          resolve({ success: true });
        } else {
          resolve({ error: "Неверная структура файла" });
        }
      } catch {
        resolve({ error: "Ошибка чтения JSON" });
      }
    };

    reader.readAsText(file);
  });
}