/* 
Faça um algoritmo que imprime uma matriz A e sua transposta.
    |1 2|
A = |3 4|   =>   A = |1 3 5|
    |5 6|            |2 4 6|

*/

function imprimirMatriz(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        let linha = '';
        for (let j = 0; j < matriz[i].length; j++) {
        linha += matriz[i][j] + ' ';
        }
        console.log('|' + linha + '|');
    }
}

const matrizA = [
[1, 2],
[3, 4],
[5, 6]
];

console.log('Matriz A:');
imprimirMatriz(matrizA);

function calcularTransposta(matriz) {
    const transposta = [];
    for (let i = 0; i < matriz[0].length; i++) {
        transposta[i] = [];
        for (let j = 0; j < matriz.length; j++) {
        transposta[i][j] = matriz[j][i];
        }
    }
return transposta;
}

const matrizTransposta = calcularTransposta(matrizA);

console.log('\nMatriz Transposta de A:');
imprimirMatriz(matrizTransposta);
