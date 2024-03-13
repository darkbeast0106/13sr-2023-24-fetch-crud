const endUrl = "https://retoolapi.dev/XAqDln/user";

document.addEventListener("DOMContentLoaded", () => {
    const createButton = document.querySelector("#create");
    const readButton = document.querySelector("#read");
    const updateButton = document.querySelector("#update");
    const deleteButton = document.querySelector("#delete");
    const userForm = document.querySelector("#userForm")
    const userList = document.querySelector("#userList")

    createButton.addEventListener('click',() => {
        userForm.classList.remove("d-none");
        userList.classList.add("d-none");
    })
    
    readButton.addEventListener('click',() => {
        userForm.classList.add("d-none");
        userList.classList.remove("d-none");
        readAllUsers();
    })

    function readAllUsers() {
        fetch(endUrl)
            .then((response) => response.json())
            .then((data) => adatokTablazatba(data))
    }

    function adatokTablazatba(data) {
        let tablaHtml = '<table class="table table-striped"><thead><tr><th>id</th><th>username</th><th>location</th><th>salary</th></tr></thead><tbody>';


        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let tableRow = `<tr>
                <td>${element.id}</td>
                <td>${element.username}</td>
                <td>${element.location}</td>
                <td>${element.salary}</td>
            </tr>`;
            tablaHtml += tableRow;
        }

        tablaHtml += '</tbody></table>';
        userList.innerHTML=tablaHtml;
    }


    
    readAllUsers();
});