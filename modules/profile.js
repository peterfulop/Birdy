import * as st from './state.js';
import * as global from './global.js';
const state = st.state;

export function ProfilePageScope() {



    const profile = {
        id: "adca5734c8ec4916fd133abb91dce99b",
        username: "mrpeterer",
        email: "mrpeter@gmail.com",
        password: "8f0593d009b9ba416d39a25cac472264",
        regDate: "2021.01.01  18:25:58"
    };

    const profileObject = {
        username: {
            title: 'Felhasználónév',
            value: profile.username,
            type: 'text'
        },
        email: {
            title: 'Emailcím',
            value: profile.email,
            type: 'text'
        },
        actual_password: {
            title: 'Aktuális jelszó',
            value: '',
            type: 'password'
        },
        new_password: {
            title: 'Új jelszó',
            value: '',
            type: 'password'
        },
        confirm_password: {
            title: 'Jelszó megerősítése',
            value: '',
            type: 'password'
        }
    };

    const randomID = global.GlobalObjectScope().generateID_short();

    function renderProfileHTML() {


        var innerHTML = '';

        innerHTML += `
        <div class="d-flex block-1">
            <div class="d-flex w-100">
                <div class="d-flex flex-column col me-5">

                    <div>
                        <div class="font-weight-bold"><p class="mb-1" id="">Username</p></div>
                        <input type="text" readonly class="profile-input form-control px-2 mb-2" id="${global.GlobalObjectScope().generateID_short()}" value="username">
                    </div>

                    ${showHidePassword('Alapértelmezett jelszó')}

                </div>

                <div class="d-flex flex-column mt-3 w-25" style="max-width:200px">
                <img src="./images/avatar.png" alt="..." class="img-thumbnail p-2">
                    <div class="btn btn-secondary my-2 p-0">
                    <label for="file-upload" class="d-block w-100 cursor-pointer"><i class="fas fa-upload"></i></label>
                    <input id="file-upload" type="file"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex block-2">
                <div class="d-block mb-2 w-100">
                <div class="mb-2 font-weight-bold"><p class="mb-1" id="title">Emailcím</p></div>
                <div class="line-1 d-flex">
                    <div class="edit-input w-100">
                        <input type="email" readonly class="profile-input form-control px-2" id="${randomID}" value="user@email.com">
                    </div>
                    <div class="edit-button-container d-flex" id="${randomID}">
                        <button type="button" class="profile-edit-btn btn-small btn btn-secondary ms-1" id="${randomID}"><i class="fas fa-edit"></i></button>
                    </div>
                    <div class="update-button-container d-none" id="${randomID}">
                        <button type="button" class="profile-update-btn btn-small btn btn-success ms-1 align-items-center" id="save-edit-input-btn"><i class="fas fa-check"></i></button>
                        <button type="button" class="profile-close-btn btn-small btn btn-danger ms-1 align-items-center" id="close-edit-input-btn"><i class="fas fa-times"></i></button>
                    </div>
                </div>
                <div class="form-text mb-2 justify-content-start text-danger d-none" id="input-alert">
                    <div class="input-alert-text ms-1">Hibás adatok!</div>
                </div>
            </div>
        </div>
        <div class="d-flex block-3">
            <div class="d-block mb-2 w-100">
                ${showHidePassword('Új jelszó')}
            </div>
        </div>
        <div class="d-flex block-3">
            <div class="d-block mb-2 w-100">
                ${showHidePassword('Új jelszó megerősítése')}
            </div>
        </div>

        <div class="d-flex block-5">
            <div class="d-flex my-2 w-100">
                <button type="button" class="profile-close-btn btn btn-success w-100" id="close-edit-input-btn">Mentés!</button>
            </div>
            <div class="form-text mb-2 justify-content-start text-danger d-none" id="input-alert">
                <div class="input-alert-text ms-1">Hibás adatok!</div>
            </div>
        </div>

        </div>

   
            `
        return innerHTML;

    };



    function showHidePassword(title) {

        const autoID = global.GlobalObjectScope().generateID_short();

        const alertMessage = `
        <div class="form-text justify-content-start text-danger d-flex" id="input-alert">
            <div class="input-alert-text">Hibás adatok!</div>
        </div>`

        return `
        <div class="d-block password-container">
                <div class="font-weight-bold">
                    <p class="mb-1" id="">${title}</p>
                </div>
            <div class="d-flex">
            <div class="d-flex profile-input-container w-100">
                <input type="password" class="form-control px-2 mb-2 password-input" data-autoid="${autoID}" value="">
                <div class="show-hide-password-block ms-1">
                    <input type="checkbox" class="btn-check show-password-btn" id="${autoID}" data-autoid="${autoID}" autocomplete="off" checked="">
                        <label class="btn btn-outline-listen btn-small password-icons" for="${autoID}" data-autoid="${autoID}" id="show-hide-btn">
                            <i class="fas fa-eye" data-autoid="${autoID}"></i>
                        </label>
                </div>
            </div>
            </div>
            <div class="form-text justify-content-start text-danger d-flex" id="input-alert">
            <div class="input-alert-text">Hibás adatok!</div>
            </div>
        </div>
        `
    };


    function showHidePw(pwButtons, pwInputs, pwIcons) {

        for (const button of pwButtons) {

            button.addEventListener('click', () => {

                for (const input of pwInputs) {

                    if (input.dataset.autoid === button.dataset.autoid) {

                        if (input.type === 'password') {
                            input.type = 'text';

                            for (const input of pwIcons) {

                                if (input.dataset.autoid === button.dataset.autoid) {
                                    input.classList.remove('fa-eye');
                                    input.classList.add('fa-eye-slash');
                                };
                            };
                        }
                        else {
                            input.type = 'password';
                            for (const input of pwIcons) {
                                if (input.dataset.autoid === button.dataset.autoid) {
                                    input.classList.remove('fa-eye-slash');
                                    input.classList.add('fa-eye');
                                };
                            };
                        };
                    };
                };
            });
        };

    };


    function buildProfilePage() {

        document.querySelector(".main-content").innerHTML = renderProfileHTML();

        const pwButtons = document.querySelectorAll('.show-password-btn');
        const pwInputs = document.querySelectorAll('.password-input');
        const pwIcons = document.querySelectorAll('.password-icons > i');

        showHidePw(pwButtons, pwInputs, pwIcons);

    };

    function editProfileInput() {

        const editInputs = document.querySelectorAll('.profile-input');
        const editButtons = document.querySelectorAll('.profile-edit-btn');
        const updateButtons = document.querySelectorAll('.profile-update-btn');
        const closeButtons = document.querySelectorAll('.profile-close-btn');

        const editBtnContainer = document.querySelectorAll('.edit-button-container');
        const updateBtnContainer = document.querySelectorAll('.update-button-container');


        editInputs.forEach(input => {

            input.addEventListener('focusout', () => {

                input.readOnly = true;
                input.classList.remove('form-control');
                input.classList.add('form-control-plaintex');

                for (const container of updateBtnContainer) {

                    if (input.id === container.id) {
                        container.classList.remove('d-flex');
                        container.classList.add('d-none');
                    }
                };

                for (const container of editBtnContainer) {

                    if (input.id === container.id) {
                        container.classList.add('d-flex');
                        container.classList.remove('d-none');
                    }
                };
            })
        })

        editButtons.forEach(editButton => {

            editButton.addEventListener('click', () => {

                for (const input of editInputs) {

                    if (input.id === editButton.id) {
                        input.readony = false;
                        input.classList.remove('form-control-plaintex');
                        input.classList.add('form-control');
                        input.readOnly = false;
                        input.focus();
                    }
                    else {
                        input.readOnly = true;
                        input.classList.remove('form-control');
                        input.classList.add('form-control-plaintex');
                    }
                };


                for (const container of updateBtnContainer) {

                    if (container.id === editButton.id) {
                        container.classList.remove('d-none');
                        container.classList.add('d-flex');
                    }
                    else {
                        container.classList.remove('d-flex');
                        container.classList.add('d-none');
                    }
                };

                for (const container of editBtnContainer) {

                    if (container.id === editButton.id) {
                        container.classList.add('d-none');
                        container.classList.remove('d-flex');

                    }
                    else {
                        container.classList.add('d-flex');
                        container.classList.remove('d-none');
                    }
                };

            })

        });

    }


    return {
        buildProfilePage
    };

}