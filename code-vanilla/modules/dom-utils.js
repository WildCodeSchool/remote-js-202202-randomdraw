// Une fonction à réaliser pour afficher / ajouter une ligne à mon tableau
export function createStudentLine(student) {
    const colFirstName = document.createElement('td');
    colFirstName.textContent = student.firstName;
    const colLastName = document.createElement('td');
    colLastName.textContent = student.lastName;
    const colSpeechesCount = document.createElement('td');
    colSpeechesCount.textContent = 0;

    const colEditBtn = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.textContent = '🖊';
    editBtn.value = 'edit';
    editBtn.className = 'btn-edit';
    colEditBtn.append(editBtn);

    const colDeleteBtn = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.value = 'delete';
    deleteBtn.className = 'btn-delete';
    colDeleteBtn.append(deleteBtn);

    const studentLine = document.createElement('tr');
    studentLine.setAttribute('data-id', student.id);
    studentLine.append(colFirstName);
    studentLine.append(colLastName);
    studentLine.append(colSpeechesCount);
    studentLine.append(colEditBtn);
    studentLine.append(colDeleteBtn);

    document.getElementById('tbody-students').append(studentLine);
}

// Gérer l'ajout de l'étudiant tiré au sort dans le tableau des speeches
export function createSpeechLine(student, date) {
    const colFirstName = document.createElement('td');
    colFirstName.textContent = student.firstName;
    const colLastName = document.createElement('td');
    colLastName.textContent = student.lastName;

    const colSpeechesDate = document.createElement('td');
    colSpeechesDate.textContent = date.toLocaleDateString();
    const colSpeechesTime = document.createElement('td');
    colSpeechesTime.textContent = date.toLocaleTimeString();

    const speechLine = document.createElement('tr');
    speechLine.append(colFirstName);
    speechLine.append(colLastName);
    speechLine.append(colSpeechesDate);
    speechLine.append(colSpeechesTime);

    document.getElementById('tbody-speeches').prepend(speechLine);
}

export function displayStudentsList(studentList) {
    const tableBody = document.getElementById('tbody-students');
    tableBody.innerHTML = "";
    // while (tableBody.rows.length > 0) {
    //     tableBody.deleteRow(-1);
    // }

    for (let student of studentList) {
        createStudentLine(student);
    }
}