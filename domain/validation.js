function validateNumber(value) {
  if (value === null || value === undefined) return false
  if (value === "") return false
  if (isNaN(value)) return false
  return true
}

function validateText(value) {
  if (!value) return false
  if (value.trim() === "") return false
  return true
}
