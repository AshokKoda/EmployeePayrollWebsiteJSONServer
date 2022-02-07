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

function redirect() {
    console.log("redirect")
    //resetForm();
    window.location.replace(site_properties.home_page)
}

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        if(site_properties.use_local_storage.match("true")){
            createAndUpdateStorage();
            alert("Data Stored With Name "+employPayrollObject._name);
            redirect();
        } else {
            alert("Data Stored With Name "+employPayrollObject._name);
            redirect();
            createOrUpdateEmployeeInJsonServer();
        }
    } catch (e) {
        console.log(e)
        return;
    }
}

const setEmployeePayrollObject = () => {
    employPayrollObject._name = getInputValueId('#name');
    employPayrollObject._profilePic = getSelectedValue('[name=profile]').pop();
    employPayrollObject._gender = getSelectedValue('[name=gender]').pop();
    employPayrollObject._department = getSelectedValue('[name=department]');
    employPayrollObject._salary = getInputValueId('#salary');
    employPayrollObject._note = getInputValueId('#notes').replace(/\s/g, ' ');
    let date = getInputValueId('#day') + " " + getInputValueId('#month') + " " + getInputValueId('#year');
    employPayrollObject._startDate = Date.parse(date);
}

const getInputValueId = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getSelectedValue = (propertyValue) => {
    let allItem = document.querySelectorAll(propertyValue);
    let setItem = [];
    allItem.forEach(item => {
        if (item.checked) {
            setItem.push(item.value);
        }
    });
    return setItem;
}

function createOrUpdateEmployeeInJsonServer() {
    let url=site_properties.server_url;
    let methodCall="POST";
    let message="Data Store with name ";
    
    makeServiceCall(methodCall,url,true,employPayrollObject)
        .then(response=>{
             alert(message +employPayrollObject._name)
             redirect();
        })
        .catch(error=>{
            console.log("inside error")
            throw error
        });
}