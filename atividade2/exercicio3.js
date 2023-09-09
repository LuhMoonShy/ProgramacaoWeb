/*
Faça um algoritmo de multiplicação matrizes: AxB = C;

É primordial que o número de colunas da primeira matriz seja igual
ao número de linhas da segunda matriz. Se for diferente, o
algoritmo deve informar “Não é possível calcular”;
*/


var matrizA = [
    [1, 2],
    [3, 4]
];

var matrizB = [
    [5, 6],
    [7, 8]
];


function multiplicarMatrizes(matrizA, matrizB) {
    var linhasA = matrizA.length;
    var colunasA = matrizA[0].length;
    var linhasB = matrizB.length;
    var colunasB = matrizB[0].length;


    if (colunasA !== linhasB) {
        return "Não é possível calcular a multiplicação das matrizes.";
    }


    var matrizC = new Array(linhasA);
    for (var i = 0; i < linhasA; i++) {
        matrizC[i] = new Array(colunasB).fill(0);
    }


    for (var i = 0; i < linhasA; i++) {
        for (var j = 0; j < colunasB; j++) {
            for (var k = 0; k < colunasA; k++) {
                matrizC[i][j] += matrizA[i][k] * matrizB[k][j];
            }
        }
    }

return matrizC;
}

var matrizC = multiplicarMatrizes(matrizA, matrizB);

console.log("Matriz C:");
for (var i = 0; i < matrizC.length; i++) {
    console.log(matrizC[i].join(" "));
}
