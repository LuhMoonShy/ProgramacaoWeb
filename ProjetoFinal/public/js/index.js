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


const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async function (event) {
    event.preventDefault(); 

    // Obter dados do formulário
    const username = document.getElementById('usernameLogin').value;
    const password = document.getElementById('passwordLogin').value;


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

    if (response.status === 200) {

        window.location.href = '/home';
    } else {  
        showAlert('danger', 'Credenciais inválidas');
    }
});

function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`);
    alertDiv.textContent = message;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000); 
}
});