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
        password: {
            title: 'password',
            value: profile.password,
            type: 'password'
        }
    };


    function renderProfileHTML() {

        var innerHTML = '';

        Object.values(profileObject).map(item => {

            const randomID = global.GlobalObjectScope().generateID_short();

            innerHTML += `
                <div class="d-block mb-2">
                    <div class="mb-2 font-weight-bold"><p id="title">${item.title}</p></div>
                    <div class="line-1 d-flex">
                        <div class="edit-input w-100">
                            <input type="${item.type}" readonly class="profile-input form-control-plaintext px-2" id="${randomID}" value="${item.value}">
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
            `
        });

        return innerHTML;
    };


    function buildProfilePage() {

        document.querySelector(".main-content").innerHTML = renderProfileHTML();
        editProfileInput();
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
        'buildProfilePage': buildProfilePage
    };

}