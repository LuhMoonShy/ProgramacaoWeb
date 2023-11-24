document.addEventListener('DOMContentLoaded', function () {
    let draggedBox = null;

    function addAnime(containerId) {
        const container = document.getElementById(containerId);
        const name = prompt('Digite o nome do anime:');

        if (name !== null && name.trim() !== '') {
            const animeBox = document.createElement('div');
            animeBox.classList.add('anime-box');
            animeBox.textContent = name;
            animeBox.draggable = true;

            const optionsMenu = document.createElement('span');
            optionsMenu.classList.add('options-menu');
            optionsMenu.innerHTML = '&#8285;';
            animeBox.appendChild(optionsMenu);

            container.appendChild(animeBox);

            animeBox.addEventListener('dragstart', function (e) {
                draggedBox = this;
                e.dataTransfer.effectAllowed = 'move';
            });

            optionsMenu.addEventListener('click', function (e) {
                e.stopPropagation();
                showOptionsMenu(optionsMenu);
            });

            animeBox.dataset.optionsMenuClick = optionsMenuClick.toString();

            saveAnime(name, containerId);
        }
    }

    function showOptionsMenu(optionsMenu) {
        const action = prompt('Escolha uma opção:\n1. Editar\n2. Excluir');
        const animeBox = optionsMenu.parentNode;
        if (action === '1') {
            editAnime(animeBox);
        } else if (action === '2') {
            deleteAnime(animeBox);
        }
    }

function editAnime(box) {
    const newName = prompt('Digite o novo nome do anime:', box.textContent);
    if (newName !== null && newName.trim() !== '') {
        box.textContent = newName;

        // Remove todos os event listeners do optionsMenu antes de adicionar novamente
        const optionsMenu = box.querySelector('.options-menu');
        const newOptionsMenu = optionsMenu.cloneNode(true);
        optionsMenu.parentNode.replaceChild(newOptionsMenu, optionsMenu);

        newOptionsMenu.addEventListener('click', function (e) {
            e.stopPropagation();
            showOptionsMenu(newOptionsMenu);
        });

        updateAnime(box);
    }
}

    function deleteAnime(box) {
        if (confirm('Tem certeza de que deseja excluir este anime?')) {
            box.parentNode.removeChild(box);
            deleteAnimeServer(box);
        }
    }

    function optionsMenuClick(e) {
        e.stopPropagation();
        showOptionsMenu(this);
    }

    function handleDrop(e) {
        e.preventDefault();
        const container = this;

        if (draggedBox.parentNode !== container) {
            draggedBox.parentNode.removeChild(draggedBox);
            container.appendChild(draggedBox);
        }

        draggedBox = null;

        updateContainer(container);
    }

    document.querySelectorAll('.anime-container').forEach(function (container) {
        container.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        container.addEventListener('drop', handleDrop);
    });

    document.getElementById('to-watch-container-btn').addEventListener('click', function () {
        addAnime('to-watch-container');
    });

    document.getElementById('watched-container-btn').addEventListener('click', function () {
        addAnime('watched-container');
    });

    function saveAnime(name, container) {
        fetch('/anime/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, container }),
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    console.error('Erro ao salvar anime:', data.message);
                }
            })
            .catch(error => {
                console.error('Erro ao salvar anime:', error);
            });
    }

    function getAnimes() {
        fetch('/anime/getAll')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const animes = data.animes;

                    animes.forEach(anime => {
                        const animeBox = document.createElement('div');
                        animeBox.classList.add('anime-box');
                        animeBox.textContent = anime.name;
                        animeBox.draggable = true;

                        const optionsMenu = document.createElement('span');
                        optionsMenu.classList.add('options-menu');
                        optionsMenu.innerHTML = '&#8285;';
                        animeBox.appendChild(optionsMenu);

                        animeBox.addEventListener('dragstart', function (e) {
                            draggedBox = this;
                            e.dataTransfer.effectAllowed = 'move';
                        });

                        optionsMenu.addEventListener('click', function (e) {
                            e.stopPropagation();
                            showOptionsMenu(optionsMenu);
                        });

                        animeBox.dataset.optionsMenuClick = optionsMenuClick.toString();

                        const containerId = anime.container === 'to-watch-container' ? 'to-watch-container' : 'watched-container';
                        document.getElementById(containerId).appendChild(animeBox);
                    });
                } else {
                    console.error('Erro ao obter animes:', data.message);
                }
            })
            .catch(error => {
                console.error('Erro ao obter animes:', error);
            });
    }

    function updateAnime(box) {
        const name = box.textContent;
        const container = box.parentNode.id;

        fetch('/anime/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: box.id, name, container }),
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    console.error('Erro ao atualizar anime:', data.message);
                }
            })
            .catch(error => {
                console.error('Erro ao atualizar anime:', error);
            });
    }

    function deleteAnimeServer(box) {
        const animeId = box.id;

        fetch(`/anime/delete/${animeId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    console.error('Erro ao excluir anime:', data.message);
                }
            })
            .catch(error => {
                console.error('Erro ao excluir anime:', error);
            });
    }

    function updateContainer(container) {
        const animeId = draggedBox.id;
        const newContainer = container.id;

        fetch('/anime/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: animeId, container: newContainer }),
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    console.error('Erro ao atualizar container do anime:', data.message);
                }
            })
            .catch(error => {
                console.error('Erro ao atualizar container do anime:', error);
            });
    }

    getAnimes();
});
