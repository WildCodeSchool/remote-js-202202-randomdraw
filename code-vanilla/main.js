import { createSpeechLine, displayStudentsList } from "./modules/dom-utils.js";
import { drawRandomElementFromArray, getMaxIdFromArray } from "./modules/utils.js";
import { Student } from "./modules/student.js";

// Représenter une liste d'étudiants sous forme de tableau
const students = [
    new Student(1, 'Jérôme', "du Camp d'Orgas"),
    new Student(2, 'Quentin', "Malavielle"),
    new Student(3, 'Loïc', "Chenuet"),
    new Student(4, 'Jordan', "Anicet"),
    new Student(5, 'Mehdi', "Hueber"),
    new Student(6, 'Nicolas', "Flichy"),
    new Student(7, 'Loïc', "Barbado"),
    new Student(8, 'Clément', "Piquenet"),
    new Student(9, 'Daniel', "Thibaut"),
    new Student(10, 'Kévin', "Piriou"),
    new Student(11, 'Patrick', "Rabourdin"),
    new Student(12, 'Marc', "Grondin")
];

// Afficher ma liste d'étudiants de départ dans le tableau
displayStudentsList(students);

// Gestion du tirage au sort
// Gérer l'événement sur le bouton draw
document.getElementById('btn-draw').addEventListener('click', function () {
    const randomStudent = drawRandomElementFromArray(students);
    document.getElementById('p-random-drawn').textContent = randomStudent.firstName + " " + randomStudent.lastName;

    createSpeechLine(randomStudent, new Date());
});

// Gestion du formulaire ==> submit
document.getElementById('form-student').addEventListener('submit', function (event) {
    event.preventDefault();

    const formValues = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value
    };

    const studentId = document.getElementById('student-id').value;
    if (studentId) {
        // Trouver le bon étudiant dans le tableau
        const editedStudent = students.find(function (student) {
            return student.id == studentId;
        });

        // Le mettre à jour
        editedStudent.firstName = formValues.firstName;
        editedStudent.lastName = formValues.lastName;
    } else {
        const newStudentId = getMaxIdFromArray(students, 'id') + 1;
        students.push(new Student(newStudentId, formValues.firstName, formValues.lastName));
    }

    displayStudentsList(students);
    document.getElementById('form-student').reset();
    document.getElementById('student-id').value = null;
});

// Gestion de l'édition d'un étudiant du tableau
document.getElementById('tbody-students').addEventListener('click', function (event) {
    if (event.target && event.target.matches('.btn-edit')) {
        const row = event.target.closest('tr');
        const studentId = row.dataset.id;
        console.log(studentId);

        const editedStudent = students.find(function (student) {
            return student.id == studentId;
        })

        console.log(editedStudent);

        document.getElementById('first-name').value = editedStudent.firstName;
        document.getElementById('last-name').value = editedStudent.lastName;
        document.getElementById('student-id').value = editedStudent.id;
    } else if (event.target && event.target.matches('.btn-delete')) {
        const row = event.target.closest('tr');
        row.remove();
        students.splice(row.rowIndex - 1, 1);
    }
});

/*
 TODOs :
    - Protéger le formulaire contre l'ajout d'un étudiant "vide" (sans prénom, ni nom), même si les champs sont required
    - Gérer l'incrémentation de la colonne speech count
    - Gérer la logique de tirage au sort (tirer tout le monde au sort avec de retirer dans toute la liste) (US 8)
    - Gérer la logique "roue de la fortune" (US 11)
    - Ajouter les statistiques (US 10)
*/