module.exports = {
    somar: (a, b) => a + b,
    subtrair: (a, b) => a - b,
    multiplicar: (a, b) => a * b,
    dividir: (a, b) => (b === 0 ? 'Não é possível dividir por zero' : a / b),
};
