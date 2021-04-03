import * as st from './state.js';
const state = st.state;

export function ProfilePageScope() {

    function renderProfilePage() {

        document.querySelector(".main-content").innerHTML = `
            <div>
                <form>

                    <div class="d-block mb-2 username">
                    <div class="mb-2 font-weight-bold"><p class="">Felhasználónév</p></div>
                        <div class="line-1 d-flex">
                            <div class="edit-input w-100">
                                <input type="text" readonly class="form-control-plaintext px-2" id="username-input" value="username">
                            </div>
                            <div class="edit-buttons d-flex">
                                <button type="button" class="btn btn-secondary ms-1" id="edit-element-button"><i class="fas fa-edit"></i></button>
                            </div>
                            <div class="edit-buttons d-none">   
                            <button type="button" class="btn btn-secondary ms-1 align-items-center w-50" id="save-edit-input-btn"><i class="fas fa-check"></i></button>
                            <button type="button" class="btn btn-danger ms-1 align-items-center w-50" id="close-edit-input-btn"><i class="fas fa-check"></i></button>
                        </div>
                        </div>
                        <div class="form-text mb-2 justify-content-start text-danger d-none" id="input-alert">
                            <div class="input-alert-text ms-1">Hibás adatok!</div>
                        </div>
                    </div>

                    <div class="d-block mb-2 email">
                    <div class="mb-2 font-weight-bold"><p class="">Email</p></div>
                    <div class="line-1 d-flex">
                        <div class="edit-input w-100">
                            <input type="email" readonly class="form-control-plaintext px-2" id="username-input" value="user@birdy.com">
                        </div>
                        <div class="edit-buttons d-flex">
                            <button type="button" class="btn btn-secondary ms-1" id="edit-element-button"><i class="fas fa-edit"></i></button>
                        </div>
                        <div class="edit-buttons d-none">   
                        <button type="button" class="btn btn-secondary ms-1 align-items-center w-50" id="save-edit-input-btn"><i class="fas fa-check"></i></button>
                        <button type="button" class="btn btn-danger ms-1 align-items-center w-50" id="close-edit-input-btn"><i class="fas fa-check"></i></button>
                    </div>
                    </div>
                    <div class="form-text mb-2 justify-content-start text-danger d-none" id="input-alert">
                        <div class="input-alert-text ms-1">Hibás adatok!</div>
                    </div>
                </div>

                <div class="d-block mb-2 password">
                    <div class="mb-2 font-weight-bold"><p class="">Jelszó</p></div>
                    <div class="line-1 d-flex">
                        <div class="edit-input w-100">
                            <input type="password" readonly class="form-control-plaintext px-2" id="username-input" value="password">
                        </div>
                        <div class="edit-buttons d-flex">
                            <button type="button" class="btn btn-secondary ms-1" id="edit-element-button"><i class="fas fa-edit"></i></button>
                        </div>
                        <div class="edit-buttons d-none">   
                        <button type="button" class="btn btn-secondary ms-1 align-items-center w-50" id="save-edit-input-btn"><i class="fas fa-check"></i></button>
                        <button type="button" class="btn btn-danger ms-1 align-items-center w-50" id="close-edit-input-btn"><i class="fas fa-check"></i></button>
                    </div>
                    </div>
                    <div class="form-text mb-2 justify-content-start text-danger d-none" id="input-alert">
                        <div class="input-alert-text ms-1">Hibás adatok!</div>
                    </div>
            </div>

                </form>
            </div>
        `
    }


    return {
        'renderProfilePage': renderProfilePage
    }

}