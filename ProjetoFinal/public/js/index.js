// public/js/index.js

document.addEventListener('DOMContentLoaded', function() {
    const signupContainer = document.getElementById('signup-container');
    const loginContainer = document.getElementById('login-container');
    const signupBtn = document.getElementById('signup-btn');
    const loginBtn = document.getElementById('login-btn');
  
    signupBtn.addEventListener('click', function() {
        signupContainer.style.display = 'block';
        loginContainer.style.display = 'none';
    });

    loginBtn.addEventListener('click', function() {
        signupContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Ao enviar o formulário de login
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Impedir o envio padrão do formulário

        // Obter dados do formulário
        const username = document.getElementById('usernameLogin').value;
        const password = document.getElementById('passwordLogin').value;

        // Enviar requisição para o servidor
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        // Verificar se o login foi bem-sucedido (você pode ajustar essa lógica conforme necessário)
        if (response.status === 200) {
            // Redirecionar para a página home.html
            window.location.href = '/home';
        } else {
            // Se as credenciais forem inválidas, exibir mensagem de alerta (você pode ajustar conforme necessário)
            showAlert('danger', 'Credenciais inválidas');
        }
    });

    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', `alert-${type}`);
        alertDiv.textContent = message;

        document.body.appendChild(alertDiv);

        // Limpar a mensagem após alguns segundos (opcional)
        setTimeout(() => {
            alertDiv.remove();
        }, 5000); // 5000 milissegundos = 5 segundos
    }
});