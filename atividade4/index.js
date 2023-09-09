/* 
No seu repositório de atividades no github, crie uma pasta atividade4 e implemente uma aplicação web com as rotas:

/somar/:a/:b
/subtrair/:a/:b
/multiplicar/:a/:b
/dividir/:a/:b

Que devem retornar o valor equivalente da operação considerando os valores a e b de entrada pela URL.

Exemplo: https://github.com/jpmacleure/programacao-web-2s-2023/tree/main/app_web1

A aplicação deve conter um arquivo index.js na raiz e um módulo calculadora.js na pasta util.

Como solução, poste o link da pasta atividade4 do seu github.
*/

const express = require('express');
const app = express();
const calculadora = require('./util/calculadora');

app.get('/somar/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const resultado = calculadora.somar(a, b);
    res.send(`A soma de ${a} e ${b} é ${resultado}`);
});

app.get('/subtrair/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const resultado = calculadora.subtrair(a, b);
    res.send(`A subtração de ${a} e ${b} é ${resultado}`);
});

app.get('/multiplicar/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const resultado = calculadora.multiplicar(a, b);
    res.send(`A multiplicação de ${a} e ${b} é ${resultado}`);
});

app.get('/dividir/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const resultado = calculadora.dividir(a, b);
    res.send(`A divisão de ${a} por ${b} é ${resultado}`);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
