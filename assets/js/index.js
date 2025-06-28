document.addEventListener('DOMContentLoaded', () => {
    const btnCreate = document.querySelector("#btnCreate");
    const btnLogout = document.querySelector('.btn-logout');
    const formCreate = document.querySelector('#form-create');
    const btnDelete = document.querySelectorAll(".btn-delete");

    // modal
    const modalCreate = document.querySelector(".modal-create");
    const btnClose = document.querySelector(".btn-close");

    btnCreate.addEventListener("click", () => {
        modalCreate.classList.toggle('d-none');
    });

    btnLogout.addEventListener('click', async(e) => {
        await logout();
    });

    // Cerrar el modal
    btnClose.addEventListener("click", () => {
        modalCreate.classList.toggle('d-none');
        formCreate.reset();
    });

    btnDelete.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.dataset.id;
            if (!id) return;

            const response = await fetch(`Api.php?id=${id}`, {
                method: 'GET'
            });

            const result = await response.json();

            // Creación de ventana modal para Confirmar o Cancelar al Eliminar
            const section = document.createElement('section');
            section.classList.add('z-3','position-absolute','top-0','start-0','w-100','height-modal','modal-delete');
            const div = document.createElement("div");
            div.classList.add("row","w-100","h-100","d-flex","justify-content-center","align-items-center");
            const divChild = document.createElement("div");
            divChild.classList.add("col-4","bg-body-secondary","p-2","rounded", "d-flex", "flex-column", "justify-content-center", "gap-2");

            const divDescription = document.createElement("div");
            const h3 = document.createElement("h3");
            h3.textContent = `¿Seguro que deseas Eliminar a ${result.nombre}?`;
            divDescription.appendChild(h3);

            const divButtons = document.createElement("div");
            divButtons.classList.add("d-flex", "justify-content-center", "gap-2");

            // Botones
            const buttonCancel = document.createElement("button");
            buttonCancel.textContent = "Cancelar";
            buttonCancel.classList.add("btn","btn-danger");
            buttonCancel.addEventListener("click", () => {
                section.classList.add("d-none");
            });
            const buttonConfirm = document.createElement("button");
            buttonConfirm.textContent = "Confirmar";
            buttonConfirm.classList.add("btn","btn-success", "btn-delete-user");
            buttonConfirm.dataset["iduser"] = id;

            // Armar la modal con los div y Botones
            divButtons.appendChild(buttonCancel);
            divButtons.appendChild(buttonConfirm);
            divChild.appendChild(divDescription);
            divChild.appendChild(divButtons);
            div.appendChild(divChild);
            section.appendChild(div);

            // main en donde vamos a unir el modal
            const mainElement = document.querySelector("main");
            mainElement.appendChild(section);

            buttonConfirm.addEventListener("click", async ({target}) => {
                const id = target.dataset.iduser;
                if (!id) return;
        
                const response = await fetch(`Api.php?action=delete&id=${id}`, {
                    method: 'GET'
                });
        
                const result = await response.json();

                if (result.id) {
                    section.classList.toggle('d-none');
                    const tableTr = document.querySelector(`tr[id-user="${result.id}"]`);
                    if (tableTr) tableTr.remove();
                };
            });
        });
    });

    const logout = async() => {
        try {
            const response = await fetch('Logout.php', {
                method: 'GET'
            });

            const result = await response.json();
            if (result.ok) {
                window.location.href = 'login.php';
            };
        } catch (error) {
            console.log(error);
        }
    };
});