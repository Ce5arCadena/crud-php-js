document.addEventListener('DOMContentLoaded', () => {
    const errorEmail = document.querySelector('#errorEmailLogin');
    const errorPassword = document.querySelector('#errorPasswordLogin');

    const formLogin = document.querySelector('.form-login');
    let hasError = false;

    

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(formLogin);
        const user = formData.get('user');
        const password = formData.get('password');

        errorEmail.textContent = "";
        errorPassword.textContent = "";
        hasError = false;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/;

        // Validación de usuario
        if (!user) {
            errorEmail.textContent = "El usuario es requerido";
            hasError = true;
        } else if (user.length <= 3) {
            errorEmail.textContent = "El usuario debe tener más de 3 caracteres";
            hasError = true;
        }

        // Validación de contraseña
        if (!password) {
            errorPassword.textContent = "La contraseña es requerida";
            hasError = true;
        } else if (password.length <= 6) {
            errorPassword.textContent = "La contraseña debe tener más de 6 caracteres";
            hasError = true;
        } else if (!passwordRegex.test(password)) {
            errorPassword.textContent = "Debe contener una mayúscula, una minúscula y un carácter especial";
            hasError = true;
        }

        if (hasError) return;
        const response = await createSession(formData);
        // const result = await response.json();

        console.log(response);
    });

    const createSession = async(data) => {
        try {
            const response = await fetch('validateLogin.php', {
                method: 'POST',
                body: data
            });
            const result = await response.json();

            if (result.ok) {
                window.location.href = 'index.php';
            }
            console.log('😉😉😉', result);
        } catch (error) {
            console.log(error);
        };
    };
});