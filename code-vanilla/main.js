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

// Fonction permettant le tirage au sort ludique
function spinningWheel(studentList) {
    const promiseList = [];
    for (let i = 0; i < studentList.length; i++) {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                const randomStudent = drawRandomElementFromArray(studentList);
                document.getElementById('p-random-drawn').textContent = randomStudent.firstName + " " + randomStudent.lastName;
                resolve(randomStudent);
            }, i * i * 20);
        });
        promiseList.push(promise);
    }

    return promiseList;
}

// Gestion du tirage au sort
// Gérer l'événement sur le bouton draw
document.getElementById('btn-draw').addEventListener('click', function () {
    // On trouve le plus petit nombre de speech et on filtre le tableau à tirer au sort
    const smallestSpeechCount = students.reduce((smallestCount, currentStudent) => (currentStudent.speeches.length < smallestCount) ? currentStudent.speeches.length : smallestCount, Number.POSITIVE_INFINITY);
    const remainingStudentsToTalk = students.filter(student => student.speeches.length === smallestSpeechCount);

    document.getElementById('btn-draw').setAttribute('disabled', true);
    const promiseList = spinningWheel(remainingStudentsToTalk);
    Promise.all(promiseList).then(values => {
        const lastDrawnStudent = values[values.length - 1];
        lastDrawnStudent.speech();
        createSpeechLine(lastDrawnStudent, lastDrawnStudent.speeches[lastDrawnStudent.speeches.length - 1]);
        console.log(lastDrawnStudent);
        displayStudentsList(students);
    }).finally(() => document.getElementById('btn-draw').removeAttribute('disabled'));
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

        const editedStudent = students.find(function (student) {
            return student.id == studentId;
        })

        console.log(editedStudent);

        document.getElementById('first-name').value = editedStudent.firstName;
        document.getElementById('last-name').value = editedStudent.lastName;
        document.getElementById('student-id').value = editedStudent.id;
    } else if (event.target && event.target.matches('.btn-delete')) {
        const row = event.target.closest('tr');
        const studentId = row.dataset.id;

        row.remove();
        students.splice(students.findIndex(student => student.id == studentId), 1);
    }
});

/*
 TODOs possibles :
    - Mettre en place le stockage local (localstorage)
    - Traiter l'US 11 (statistiques de temps de parole)
*/