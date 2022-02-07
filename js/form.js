let employPayrollObject = {};

window.addEventListener('DOMContentLoaded', (event) => {
    validateInputs();
    validateDate();
});

function validateInputs() {
    const name = document.querySelector('#name');
    const nameError = document.querySelector('.name-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            nameError.textContent = "";
            return;
        }
        try {
            checkName(name.value);
            nameError.textContent = "";
        } catch (e) {
            console.error(e);
            nameError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
}

function validateDate() {
    const day = document.querySelector('#day');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');

    day.addEventListener('input', checkDate);
    month.addEventListener('input', checkDate);
    year.addEventListener('input', checkDate);
}

function checkDate() {
    const dateError = document.querySelector('.date-error');
    try {
        let date = day.value + " " + month.value + " " + year.value;
       checkStartDate(new Date(Date.parse(date)));
        dateError.textContent = "";
    } catch (e) {
        dateError.textContent = e;
    }
}