// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('personalForm');
    const dataTable = document.getElementById('dataTable');
    let editingIndex = null;

    // Carga datos al iniciar
    loadData();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;

        const person = { name, age, email, telefono };

        if (editingIndex === null) {
            addPerson(person);
        } else {
            updatePerson(person, editingIndex);
            editingIndex = null;
        }

        form.reset();
        loadData();
    });
    
    
    function addPerson(person) {
        const people = getPeople();
        people.push(person);
        localStorage.setItem('people', JSON.stringify(people));
    }

    function updatePerson(person, index) {
        const people = getPeople();
        people[index] = person;
        localStorage.setItem('people', JSON.stringify(people));
    }

    function deletePerson(index) {
        const people = getPeople();
        people.splice(index, 1);
        localStorage.setItem('people', JSON.stringify(people));
        loadData();
    }

    function editPerson(index) {
        const people = getPeople();
        const person = people[index];
        document.getElementById('name').value = person.name;
        document.getElementById('age').value = person.age;
        document.getElementById('email').value = person.email;
        document.getElementById('telefono').value = person.telefono;
        editingIndex = index;
    }

    function loadData() {
        const people = getPeople();
        dataTable.innerHTML = '';
        people.forEach((person, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${person.name}</td>
                <td>${person.age}</td>
                <td>${person.email}</td>
                <td>${person.telefono}</td>
                <td class="actions">
                    <button class="edit" onclick="editPerson(${index})">Editar</button>
                    <button class="delete" onclick="deletePerson(${index})">Eliminar</button>
                </td>
            `;
            dataTable.appendChild(row);
        });
    }

    function getPeople() {
        const people = localStorage.getItem('people');
        return people ? JSON.parse(people) : [];
    }

    window.deletePerson = deletePerson;
    window.editPerson = editPerson;
});
