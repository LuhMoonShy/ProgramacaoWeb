# Promises em JavaScript

As Promises são um recurso fundamental em javascript que torna mais fácil trabalhar com operações assincronas. Elas são usadas basicamente para lidar com tarefas que podem levar um tempo para serem concluidas, como solicitações de rede ou carregamento de recursos externos.Para criar uma Promise, você utiliza o construtor Promise. Uma Promise tem dois estados possíveis: pendente (pending) e resolvida (fulfilled) ou rejeitada (rejected). Por exemplo:

const minhaPromise = new Promise((resolve, reject) => {
  // Aqui você coloca o código assíncrono que deseja executar
  // Se a operação for bem-sucedida, chame resolve(valor)
  // Se ocorrer um erro, chame reject(erro)
});

Resumindo as Promises são uma maneira poderosa de lidar com código assíncrono em JavaScript, tornando-o mais legível e fácil de manter. Elas desempenham um papel fundamental em operações de rede, manipulação de eventos assíncronos e muito mais.