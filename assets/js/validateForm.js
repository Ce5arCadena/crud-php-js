window.addEventListener('DOMContentLoaded', () => {
    const formCreate = document.querySelector('#form-create');

    // Moodal de creación
    const modalCreate = document.querySelector(".modal-create");

    // Botón de Editar
    const btnEdit = document.querySelectorAll(".btn-edit");

    // Mensajes de error
    const errorName = document.querySelector('#nameHelp');
    const genderError = document.querySelector('#genderHelp');
    const lastNameError = document.querySelector('#lastNameHelp');

    formCreate.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Valores del form
        const form = new FormData(formCreate);
        const name = form.get('nombre');
        const gender = form.get('genero');
        const lastName = form.get('apellido');

        toggleError(errorName, !name ? 'El nombre es requerido' : '');
        toggleError(genderError, !gender ? 'El genero es requerido' : '');
        toggleError(lastNameError, !lastName ? 'El apellido es requerido' : '');

        if (!name || !lastName || !gender) return;

        const isEdit = form.get('id') ? true : false;
        await saveUser(form, isEdit);
        formCreate.reset();
    });

    btnEdit.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            if (e.target.dataset.id) {
                await getUser(e.target.dataset.id);
            }
        });
    });

    const toggleError = (element, message) => {
        if (message) {
            element.classList.remove('d-none');
            element.textContent = message;
        } else {
            element.classList.add('d-none');
            element.textContent = "";
        }
    };

    const printUserByPost = (dataUser) => {
        const rowSearch = document.querySelector(`tr[id-user="${dataUser.id}"]`);
        console.log(rowSearch, dataUser);
        if (!rowSearch) return;

        rowSearch.innerHTML = `
            <th scope="row"> ${dataUser.id} </th>
            <td>${dataUser.nombre}</td>
            <td>${dataUser.apellido}</td>
            <td>${dataUser.genero}</td>
            <td>${dataUser.fecha}</td>
            <td>
                <button 
                    data-id="${dataUser.id}" 
                    class="btn btn-danger btn-edit"
                >
                    Editar
                </button>
                <button
                    data-id="${dataUser.id}"  
                    class="btn btn-warning btn-delete"
                >
                    Eliminar
                </button>
            </td>
        `;

        const newButton = rowSearch.querySelector(".btn-edit");
        if (newButton) {
            newButton.addEventListener('click', async(e) => {
                await getUser(dataUser.id);
            });
        }

        modalCreate.classList.add('d-none');
    };

    const saveUser = async (body, isEdit) => {
        try {
            const response = await fetch('Api.php', {
                method: 'POST',
                body
            });

            const result = await response.json();
            console.log(isEdit);
            if (isEdit) {
                printUserByPost(result);
            } else if (!isEdit && result) {
                const row = `
                    <tr>
                        <th scope="row">${result.id}</th>
                        <td>${result.nombre}</td>
                        <td>${result.apellido}</td>
                        <td>${result.genero}</td>
                        <td>${new Date().toISOString().split('T')[0]}</td>
                        <td>
                            <button 
                                data-id="${result.id}" 
                                class="btn btn-danger btn-edit"
                            >
                                Editar
                            </button>
                            <button
                                data-id="${result.id}"  
                                class="btn btn-warning btn-delete"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `;
                const table = document.querySelector('.table-users tbody');

                table.insertAdjacentHTML('beforeend', row);
                modalCreate.classList.add('d-none');
            };
        } catch (error) {
            console.log(error);
        };
    };

    const getUser = async(id) => {
        try {
            const response = await fetch(`Api.php?id=${id}`, {
                method: 'GET'
            });

            const result = await response.json();

            modalCreate.classList.toggle('d-none');
            formCreate.id.value = result.id;
            formCreate.genero.value = result.genero;
            formCreate.nombre.value = result.nombre;
            formCreate.apellido.value = result.apellido;

            // Valores del form
            const form = new FormData(formCreate);
            const name = form.get('nombre');
            const gender = form.get('genero');
            const lastName = form.get('apellido');

            toggleError(errorName, !name ? 'El nombre es requerido' : '');
            toggleError(genderError, !gender ? 'El genero es requerido' : '');
            toggleError(lastNameError, !lastName ? 'El apellido es requerido' : '');

            if (!name || !lastName || !gender) return;
        } catch (error) {
            console.log('👨‍🦱👨‍🦱👨‍🦱', error);
        };
    };
});
