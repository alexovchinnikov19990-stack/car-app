// state.js

export const state = {
  version: "1.0.0",

  car: {
    model: "Belgee X50",
    startKm: 5,
    mileageHistory: []
  },

  fuel: [],
  service: [],
  other: [],
  backups: []
};

export function generateId() {
  return crypto.randomUUID();
}