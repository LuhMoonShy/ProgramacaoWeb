// public/js/settings.js
document.addEventListener('DOMContentLoaded', function () {
const settingsForm = document.getElementById('settings-form');
const deleteBtn = document.getElementById('delete-btn');
const successMessageContainer = document.getElementById('success-message');

settingsForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('emailSettings').value;
    const username = document.getElementById('usernameSettings').value;
    const password = document.getElementById('passwordSettings').value;

    try {
        const response = await fetch('/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        });

        const data = await response.json();

        if (data.success) {
            successMessageContainer.textContent = 'Alterações salvas com sucesso!';
            successMessageContainer.style.display = 'block';
            setTimeout(() => {
                successMessageContainer.style.display = 'none';
                window.location.href = '/settings';
            }, 2000);

            settingsForm.reset();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
    }
});

deleteBtn.addEventListener('click', async function () {
    if (confirm('Tem certeza de que deseja excluir seu perfil?')) {
        try {
            const response = await fetch('/user/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            console.log('Response data:', data);

            if (data.success) {
                alert(data.message);
                window.location.href = '/'; 
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir o perfil');
        }
    }
});

settingsForm.reset();
});
