# Função Arrow em JavaScript

Arrow Function ("função de seta") é a forma mais moderna de se criar funções, introduzida a partir do ECMAScript6 (ES6), elas utilizam setas para definições.

Sua sintáxe básica é:

const ArrowFunction = (parâmetro1, parâmetro2) => {
    corpo da função e
    código a ser executado
};

Arrow functions são geralmente mais fáceis e mais curtas do que funções tradicionais. Não tem seu próprio objeto "this" pois elas herdam o valor do "this" do contexto pai que estão definidas. Porem, não são adequadas para todos os casos de desenvolvimento, elas não podem ser usadas como construtores 
(pois não podem ser chamadas com 'new') e não têm as propriedades 'arguments' e 'super'.

const contadorNumerosPares = (inicio, fim) => {
  for (let i = inicio; i <= fim; i++) {
    if (i % 2 === 0) {
      console.log(i);
    }
  }
};

contadorNumerosPares(1, 10);