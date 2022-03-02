import { createSpeechLine, createStudentLine } from "./modules/dom-utils.js";
import { drawRandomElementFromArray } from "./modules/utils.js";

// Représenter une liste d'étudiants sous forme de tableau
const students = [
    { firstName: 'Jérôme', lastName: "du Camp d'Orgas" },
    { firstName: 'Quentin', lastName: 'Malavielle' },
    { firstName: 'Loïc', lastName: 'Chenuet' },
    { firstName: 'Jordan', lastName: 'Anicet' },
    { firstName: 'Mehdi', lastName: 'Hueber' },
    { firstName: 'Nicolas', lastName: 'Flichy' },
    { firstName: 'Loïc', lastName: 'Barbado' },
    { firstName: 'Clément', lastName: 'Piquenet' },
    { firstName: 'Marc', lastName: 'Grondin' },
    { firstName: 'Daniel', lastName: 'Thibaut' },
    { firstName: 'Kévin', lastName: 'Piriou' },
    { firstName: 'Patrick', lastName: 'Rabourdin' }
];

// Afficher ma liste d'étudiants de départ dans le tableau
for (let student of students) {
    createStudentLine(student);
}

// Gestion du tirage au sort
// Gérer l'événement sur le bouton draw
document.getElementById('btn-draw').addEventListener('click', function () {
    const randomStudent = drawRandomElementFromArray(students);
    document.getElementById('p-random-drawn').textContent = randomStudent.firstName + " " + randomStudent.lastName;

    createSpeechLine(randomStudent, new Date());
});

// Gestion du formulaire ==> submit
document.getElementById('form-student').addEventListener('submit', function(event) {
    event.preventDefault();

    const student = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value
    };
    const rowNumber = document.getElementById('row-number').value;

    if (rowNumber) {
        const row = document.getElementById('tbody-students').rows[rowNumber - 1];
        row.children[0].textContent = student.firstName;
        row.children[1].textContent = student.lastName;

        students[rowNumber - 1] = student;
    } else {
        students.push(student);
        createStudentLine(student);
    }

    document.getElementById('form-student').reset();
    document.getElementById('row-number').value = null;
});

// Gestion de l'édition d'un étudiant du tableau
document.getElementById('tbody-students').addEventListener('click', function(event) {
    if (event.target && event.target.matches('.btn-edit')) {
        const row = event.target.closest('tr');
        const firstName = row.children[0].textContent;
        const lastName = row.children[1].textContent;

        document.getElementById('first-name').value = firstName;
        document.getElementById('last-name').value = lastName;
        document.getElementById('row-number').value = row.rowIndex;
    } else if (event.target && event.target.matches('.btn-delete')) {
        const row = event.target.closest('tr');
        row.remove();
        students.splice(row.rowIndex - 1, 1);
    }
});

/*
 TODOs :
    - Meilleure gestion des données (ici on modifie à la fois le DOM et la liste des étudiants, c'est mal 😑)
    - Protéger le formulaire contre l'ajout d'un étudiant "vide" (sans prénom, ni nom), même si les champs sont required
    - Gérer l'incrémentation de la colonne speech count
    - Gérer la logique de tirage au sort (tirer tout le monde au sort avec de retirer dans toute la liste) (US 8)
    - Gérer la logique "roue de la fortune" (US 11)
    - Ajouter les statistiques (US 10)
*/