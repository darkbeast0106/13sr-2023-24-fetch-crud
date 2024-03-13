const endUrl = "https://retoolapi.dev/XAqDln/user";

document.addEventListener("DOMContentLoaded", () => {
    const createButton = document.querySelector("#create");
    const readButton = document.querySelector("#read");
    const userForm = document.querySelector("#userForm");
    const userList = document.querySelector("#userList");
    const usernameInput = document.querySelector("#username");
    const locationInput = document.querySelector("#location");
    const salaryInput = document.querySelector("#salary");

    createButton.addEventListener('click',() => {
        userList.classList.add("d-none");
        userForm.classList.remove("d-none");
    })
    
    readButton.addEventListener('click',() => {
        displayUserList();
    })

    function displayUserList() {
        readAllUsers();
        userForm.classList.add("d-none");
        userList.classList.remove("d-none");
    }

    userForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = usernameInput.value;
        const location = locationInput.value;
        const salary = parseInt(salaryInput.value);
        const user = {
            username: username,
            location: location,
            salary: salary
        };
        createUser(user);
    });

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
            clearUserForm();
        } else {
            alert("hiba történt")
        }
    }

    function clearUserForm() {
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
                    <button type="button" class="btn btn-outline-danger" onclick="deleteUser(${element.id})">Törlés</button>
                </td>
            </tr>`;
            tablaHtml += tableRow;
        }

        tablaHtml += '</tbody></table>';
        userList.innerHTML=tablaHtml;

        window.deleteUser = deleteUser;
    }


    
    readAllUsers();
});