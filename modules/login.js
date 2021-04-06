import * as app from '../script/app.js';
import * as reg from './register.js';
import * as st from './state.js';
const state = st.state;

export function LoginPageScope() {

    function renderLoginPage() {

        //resetState();

        document.getElementById('main-app').innerHTML = `
    
            <section class="login-app d-flex justify-content-center" id="login-app-box">
    
                <form class="col-10 justify-content-center mb-n2">
    
                    <div class="d-flex flex-column align-items-center login-logo-box justify-content-center mb-4"
                        id="login-logo-box">
                        <img src="./images/avatar.png" alt="logo" id="login-form-logo">
                        <h3>LOGIN</h3>
                    </div>
    
                    <div class="my-3">
                        <label for="login-username" class="form-label">Felhasználónév</label>
                        <input type="text" class="form-control" id="login-username">
                        <div class="form-text"></div>
                    </div>
                    <div class="mb-3">
                        <label for="login-password" class="form-label">Jelszó</label>
                        <input type="password" class="form-control" id="login-password" autocomplete="on">
                    </div>
    
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="remember-me-checker">
                        <label class="form-check-label" for="remember-me-checker">Emlékezz rám!</label>
                    </div>
    
                    <button type="button" class="btn btn-primary rounded-pill w-100 mb-3">Bejelentkezés</button>
                    <button type="button" class="btn btn-light rounded-pill mb-3 w-100" id="register-new-user-button">Regisztráció</button>
                    <button type="button" class="btn btn-link rounded-pill mb-3 w-100">Elfelejtett jelszó</button>
    
                    <div class="d-flex social-icon-bar align-items-center justify-content-center">
                        <div class="social-icon-box"><i class="fab fa-google"></i></div>
                        <div class="social-icon-box"><i class="fab fa-facebook-f"></i></div>
                    </div>
                </form>
            </section>
        `

        document.getElementById("register-new-user-button").onclick = function () {
            console.log("render register....");
            reg.renderRegisterPage();
        }

        var LoginImage = document.getElementById('login-form-logo');

        if (LoginImage) {
            LoginImage.onclick = function () {
                const App = app.AppVisualisationScope();
                App.loadVisualisation();
            }
        }


    }


    return {
        renderLoginPage
    }


}