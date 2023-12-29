let grades = [65.95, 96.1, 56.98, 78.62, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

let gradeInput = document.getElementById('newGrade');
gradeInput.addEventListener('keypress', addNewGrade)
function addNewGrade(event) {
    if (event.key === 'Enter') {
        let enteredGrade = gradeInput.value;
        if (!isNaN(enteredGrade) && enteredGrade >= 0 && enteredGrade <= 100 && enteredGrade != '') {
            grades.push(parseFloat(enteredGrade));
            // console.log('Entered grade:', enteredGrade);
            // console.log('Updated grades:', grades);
            gradeInput.value = '';
            let afterAddition = countStudentsByGradeRange();
            updatePage(afterAddition);
        }
        else {
            // console.log('Invalid grade entered!');
            window.alert('Invalid grade entered!')
            gradeInput.value = '';
        }
        event.preventDefault();
    }
}

let limitValues = document.querySelectorAll('.GradeLimit');
let originalLimits = [];
limitValues.forEach(limitValue => {
    originalLimits.push(limitValue.value);
    limitValue.addEventListener('keypress', updateGradeLimit);
});

function updateGradeLimit(event) {
    if (event.key === 'Enter') {
        let index = Array.from(limitValues).indexOf(event.target);
        console.log('Index:', index);
        let enteredLimit = event.target.value;  //event.target is the point which is triggering the event 
        if (!isNaN(enteredLimit) && enteredLimit != '' && enteredLimit >= 0 && enteredLimit <= 100) {
            event.target.innerHTML = enteredLimit;
            // console.log('Entered limit:', enteredLimit);
            let limitChange = countStudentsByGradeRange();
            updatePage(limitChange);
            event.target.blur();
        }
        else {
            event.target.value = originalLimits[index];
            event.target.blur();
            window.alert("Invalid limit Entered !!")
            // console.log('Invalid limit entered')
        }
        event.preventDefault();
    }
}


function countStudentsByGradeRange() {
    let studentCounts = {};
    grades.forEach(grade => {
        let gradeCategory = getGradeCategory(grade);
        if (!studentCounts[gradeCategory]) {
            // console.log(studentCounts[gradeCategory])
            studentCounts[gradeCategory] = 0;
        }
        studentCounts[gradeCategory]++;
    });
    return studentCounts;
}


function getGradeCategory(grade) {
    let gradeLimits = {
        'A+': parseFloat(document.getElementById("A+").value),
        'A': parseFloat(document.getElementById('A').value),
        'A-': parseFloat(document.getElementById('A-').value),
        'B+': parseFloat(document.getElementById('B+').value),
        'B': parseFloat(document.getElementById('B').value),
        'B-': parseFloat(document.getElementById('B-').value),
        'C+': parseFloat(document.getElementById('C+').value),
        'C': parseFloat(document.getElementById('C').value),
        'C-': parseFloat(document.getElementById('C-').value),
        'D': parseFloat(document.getElementById('D').value),
        'F': parseFloat(document.getElementById('F').value)
    };

    if (grade >= gradeLimits["A+"]) {
        return "A+";
    }
    else if (grade >= gradeLimits['A']) {
        return 'A';
    } else if (grade >= gradeLimits['A-']) {
        return 'A-';
    } else if (grade >= gradeLimits['B+']) {
        return 'B+';
    } else if (grade >= gradeLimits['B']) {
        return 'B';
    } else if (grade >= gradeLimits['B-']) {
        return 'B-';
    } else if (grade >= gradeLimits['C+']) {
        return 'C+';
    } else if (grade >= gradeLimits['C']) {
        return 'C';
    } else if (grade >= gradeLimits['C-']) {
        return 'C-';
    } else if (grade >= gradeLimits['D']) {
        return 'D';
    } else {
        return 'F';
    }
}

let studentInEachCategory = countStudentsByGradeRange();

function updatePage(studentInEachCategory) {
    Object.keys(studentInEachCategory).forEach(grade => {
        let countElement = document.getElementById(`count${grade}`);
        // console.log(document.getElementById(`count${grade}`));
        if (countElement) {
            countElement.innerHTML = studentInEachCategory[grade];
        }
    });
}

updatePage(studentInEachCategory);
// console.log(studentInEachCategory);

