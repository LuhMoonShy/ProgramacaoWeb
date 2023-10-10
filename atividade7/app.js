const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Configuração do Mustache como template engine
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Rota para exibir o formulário
app.get('/', (req, res) => {
  res.render('formulario');
});

// Rota para processar o formulário
app.post('/marcar-consulta', (req, res) => {
  const { nome, cpf, dataNascimento, endereco, uf, cep, email, telefone, especialidade, dataHora, medicamentosAlergicos, informacoesAdicionais } = req.body;

  // Verifique se algum campo está vazio
  const camposVazios = [];
  if (!nome) camposVazios.push('Nome');
  if (!cpf) camposVazios.push('CPF');
  if (!dataNascimento) camposVazios.push('Data de Nascimento');
  if (!endereco) camposVazios.push('Endereço');
  if (!uf) camposVazios.push('UF');
  if (!cep) camposVazios.push('CEP');
  if (!email) camposVazios.push('E-mail');
  if (!telefone) camposVazios.push('Telefone');
  if (!especialidade) camposVazios.push('Especialidade Médica');
  if (!dataHora) camposVazios.push('Data e Hora');
  if (!medicamentosAlergicos) camposVazios.push('Medicamentos Alergicos');

  if (camposVazios.length > 0) {
    res.render('formulario', { erro: `Campos obrigatórios não preenchidos: ${camposVazios.join(', ')}` });
  } else {
    // Faça algo com os dados, por exemplo, salvar no banco de dados
    // Redirecione ou exiba uma mensagem de sucesso
    res.send('Consulta marcada com sucesso!');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
