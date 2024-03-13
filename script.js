const endUrl = "https://retoolapi.dev/XAqDln/user";

document.addEventListener("DOMContentLoaded", () => {
    const createButton = document.querySelector("#create");
    const readButton = document.querySelector("#read");
    const userForm = document.querySelector("#userForm");
    const userFormSubmitButton = document.querySelector("#userFormSubmitButton");
    const userList = document.querySelector("#userList");
    const idInput = document.querySelector("#id");
    const usernameInput = document.querySelector("#username");
    const locationInput = document.querySelector("#location");
    const salaryInput = document.querySelector("#salary");

    createButton.addEventListener('click',() => {
        clearUserForm();
        displayCreateButton();
        displayUserForm();
    })
    
    readButton.addEventListener('click',() => {
        displayUserList();
    })

    function displayUserForm() {
        userList.classList.add("d-none");
        userForm.classList.remove("d-none");
    }

    function displayUserList() {
        readAllUsers();
        userForm.classList.add("d-none");
        userList.classList.remove("d-none");
    }

    userForm.addEventListener('submit', event => {
        event.preventDefault();
        const id = parseInt(idInput.value);
        const username = usernameInput.value;
        const location = locationInput.value;
        const salary = parseInt(salaryInput.value);
        const user = {
            username: username,
            location: location,
            salary: salary
        };
        if (id == 0) {
            createUser(user);
        } else {
            updateUser(id, user);
        }
    });

    async function updateUser(id, user) {
        const response = await fetch(endUrl + "/" + id, {
            method: "PATCH",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            alert("Hiba történt")
            return;
        }
        displayUserList();
    }

    async function createUser(user) {
        const response = await fetch(endUrl, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            displayUserList();
        } else {
            alert("hiba történt")
        }
    }

    function clearUserForm() {
        idInput.value = 0;
        usernameInput.value = "";
        locationInput.value = "";
        salaryInput.value = "";
    }

    async function deleteUser(id) {
        const userConfirm = confirm(`Biztos szeretné törölni a ${id} sorszámú elemet?`)
        if (!userConfirm) {
            return;
        }
        const response = await fetch(endUrl + "/" + id, {
            method: "DELETE"
        });
        readAllUsers();
        if (!response.ok) {
            alert("Sikertelen törlés");
        }
    }

    function readAllUsers() {
        fetch(endUrl)
            .then((response) => response.json())
            .then((data) => adatokTablazatba(data))
    }

    function adatokTablazatba(data) {
        let tablaHtml = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>id</th>
                    <th>username</th>
                    <th>location</th>
                    <th>salary</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>`;


        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let tableRow = `<tr>
                <td>${element.id}</td>
                <td>${element.username}</td>
                <td>${element.location}</td>
                <td>${element.salary}</td>
                <td>
                    <button type="button" class="btn btn-outline-success" onclick="loadUserUpdateForm(${element.id})">Módosítás</button>
                    
                    <button type="button" class="btn btn-outline-danger" onclick="deleteUser(${element.id})">Törlés</button>
                </td>
            </tr>`;
            tablaHtml += tableRow;
        }

        tablaHtml += '</tbody></table>';
        userList.innerHTML=tablaHtml;
    }

    async function loadUserUpdateForm(id) {
        const response = await fetch(endUrl + "/" + id);
        if (!response.ok) {
            readAllUsers();
            alert("Hiba történt a módosítási űrlap megnyitása során");
            return;
        } 
        const user = await response.json();
        console.log(user);
        idInput.value = user.id;
        usernameInput.value = user.username;
        locationInput.value = user.location;
        salaryInput.value = user.salary;

        displayUpdateButton();
        displayUserForm();
    }

    function displayUpdateButton() {
        userFormSubmitButton.textContent = "Módosítás";
        userFormSubmitButton.classList.remove("btn-outline-primary");
        userFormSubmitButton.classList.add("btn-outline-success");
    }

    function displayCreateButton() {
        userFormSubmitButton.textContent = "Felvétel";
        userFormSubmitButton.classList.remove("btn-outline-success");
        userFormSubmitButton.classList.add("btn-outline-primary");
    }
    
    window.deleteUser = deleteUser;
    window.loadUserUpdateForm = loadUserUpdateForm;
    readAllUsers();
});