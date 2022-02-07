let employeePayrollList;

window.addEventListener('DOMContentLoaded', (event) => {
    if (site_properties.use_local_storage.match("true")) {
        getDataFromLocalStorage();
    } else
        getPayrollDataFromServer();
})

const strigifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(date).toLocaleDateString('en-GB', options);
    return newDate;
}

function processEmployeePayrollDataResponse() {
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    createInnerHtml();
    //localStorage.removeItem("edit-emp");
}

const getDataFromLocalStorage = () => {
    employeePayrollList = localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();
}

const getPayrollDataFromServer = () => {

    makeServiceCall("GET", site_properties.server_url, true)
        .then(response => {
            employeePayrollList = JSON.parse(response);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("Get Error Status : " + JSON.stringify(error));
            employeePayrollList = [];
            processEmployeePayrollDataResponse();
        })
}

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th>" +
        "<th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    for (let empPayrollData of employeePayrollList) {
        innerHtml = `${innerHtml}
            <tr>
            <td><img src ="${empPayrollData._profilePic}"></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDepartmentHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${strigifyDate(empPayrollData._startDate)}</td>
            <td>
                <img id ="${empPayrollData.id}" src="../assets/icons/delete-black-18dp.svg" alt="Delete" onClick=remove(this)>
                <img id ="${empPayrollData.id}" src="../assets/icons/create-black-18dp.svg" alt="Edit" onClick=update(this)>
            </td>
        </tr>`
            ;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const getDepartmentHtml = (data) => {
    let deptHtml = '';
    for (let dept of data) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
    }
    return deptHtml;
}