function calcularImc(pesoKg, alturaM) {
  if (!(pesoKg > 0) || !(alturaM > 0)) {
    throw new Error("Peso e altura devem ser maiores que zero");
  }
  return Math.round((pesoKg / (alturaM * alturaM)) * 10) / 10;
}

function classificarImc(imc) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  return "Obesidade";
}

if (typeof module !== "undefined") {
  module.exports = { calcularImc, classificarImc };
}
