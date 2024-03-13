const endUrl = "https://retoolapi.dev/XAqDln/user";

document.addEventListener("DOMContentLoaded", () => {
    const createButton = document.querySelector("#create");
    const readButton = document.querySelector("#read");
    const updateButton = document.querySelector("#update");
    const deleteButton = document.querySelector("#delete");

    function readAllUsers() {
        fetch(endUrl)
            .then((response) => response.json())
            .then((data) => adatokTablazatba(data))
    }
    readAllUsers();
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
        document.getElementById('felhasznalokLista').innerHTML=tablaHtml;
    }
});