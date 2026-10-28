const test = require("node:test");
const assert = require("node:assert/strict");
const { calcularImc, classificarImc } = require("../src/imc.js");

test("calcula o IMC", () => {
  assert.equal(calcularImc(70, 1.75), 22.9);
});

test("classifica as faixas", () => {
  assert.equal(classificarImc(17), "Abaixo do peso");
  assert.equal(classificarImc(22.9), "Peso normal");
  assert.equal(classificarImc(27), "Sobrepeso");
  assert.equal(classificarImc(35), "Obesidade");
});

test("rejeita valores invalidos", () => {
  assert.throws(() => calcularImc(0, 1.75));
  assert.throws(() => calcularImc(70, -1));
});
