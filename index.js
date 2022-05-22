/* Your Code Here */
function createEmployeeRecord(employeeRecord) {
    return {
        firstName: employeeRecord[0],
        familyName: employeeRecord[1],
        title: employeeRecord[2],
        payPerHour: employeeRecord[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRecords) {
    const employees = [];
    employeeRecords.forEach(element => {
        employees.push(createEmployeeRecord(element));
    });
    return employees;
}

function createTimeInEvent(timeIn) {
    const timeInData = splitTimeIn.call(timeIn);
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(timeInData[1]),
        date: timeInData[0]
    }
    this.timeInEvents.push(timeInEvent);
    return this;
}

function splitTimeIn() {
    return this.split(" ");
}

function createTimeOutEvent(timeOut) {
    const timeOutData = splitTimeIn.call(timeOut);
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(timeOutData[1]),
        date: timeOutData[0]
    };
    this.timeOutEvents.push(timeOutEvent);
    return this;
}

function hoursWorkedOnDate(date) {
    const timeInEvent = findEventForDate(this.timeInEvents, date);
    const timeOutEvent = findEventForDate(this.timeOutEvents, date);
    const duration = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return duration;
}

function findEventForDate(timeEvents, date) {
    const timeEvent = timeEvents.find(timeEvent => timeEvent.date === date);
    return timeEvent;
}

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const wage = hoursWorked * this.payPerHour;
    return wage;
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employees) {
    let allWages = 0;
    employees.forEach(employee => {
        allWages = allWages + allWagesFor.call(employee);
    });
    return allWages;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}