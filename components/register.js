function renderRegisterPage() {

    const App = AppVisualisationScope();
    App.resetState();

    document.getElementById('main-app').innerHTML = `
         <section class="register-app d-flex justify-content-center" id="login-app-box">

            <form class="col-10 justify-content-center mb-n2">

                <div class="d-flex flex-column align-items-center login-logo-box justify-content-center mb-4"
                    id="login-logo-box">
                    <img src="./images/avatar.png" alt="" id="login-form-logo">
                    <h3>REGISTER</h3>
                </div>

                <div class="my-3">
                    <label for="register-username" class="form-label">Felhasználónév</label>
                    <input type="text" class="form-control" id="register-username">
                    <div class="form-text"></div>
                </div>
                <div class="mb-3">
                    <label for="register-email" class="form-label">Emailcím</label>
                    <input type="email" class="form-control" id="register-email">
                </div>
                <div class="mb-3">
                    <label for="register-password" class="form-label">Jelszó</label>
                    <input type="password" name="password" class="form-control" id="register-password" autocomplete="on">
                </div>
                <div class="mb-3">
                    <label for="register-password-again" class="form-label">Jelszó megerősítése</label>
                    <input type="password" name="password" class="form-control" id="register-password-again" autocomplete="on">
                </div>

                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="remember-me-checker">
                    <label class="form-check-label" for="remember-me-checker">Elfogadom a felhasználási
                        feltételeket!</label>
                </div>

                <button type="button" class="btn btn-primary rounded-pill mb-3 w-100">Regisztráció</button>
                <button type="button" class="btn btn-light rounded-pill mb-3 w-100" id="back-to-login-button">Vissza</button>
            </form>

        </section>
    `

    document.getElementById("back-to-login-button").onclick = function () {
        console.log("render login....");
        const Login = LoginPageScope();
        Login.renderLoginPage();
    }

    var LoginImage = document.getElementById('login-form-logo');

    if (LoginImage) {
        LoginImage.onclick = function () {

            const App = AppVisualisationScope();
            App.loadVisualisation();
        }
    }
}