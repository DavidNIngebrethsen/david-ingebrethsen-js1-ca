console.log("Contact Script is running")
const output = document.querySelector("#output")
const submissionForm = document.querySelector("#submission-form")

const nameField = document.querySelector("#name-field")
const subjectField = document.querySelector("#subject-field")
const emailField = document.querySelector("#email-field")
const addressField = document.querySelector("#address-field")

const nameLog = document.querySelector("#name-log")
const subjectLog = document.querySelector("#subject-log")
const emailLog = document.querySelector("#email-log")
const addressLog = document.querySelector("#address-log")
const submitLog = document.querySelector("#submit-log")

submissionForm.addEventListener("submit", (event) => {
    validation()
    event.preventDefault()
})

function validation() {

    let nameValid = false
    let subjectValid = false
    let emailValid = false
    let addressValid = false

    if (nameField.value) {
        nameValid = true
        nameLog.style.display = "none"
        nameLog.innerHTML = ""
    } else {
        nameLog.style.display = "block"
        nameLog.innerHTML = "<p>Required</p>"
    }

    if (subjectField.value.length > 9) {
        subjectValid = true
        subjectLog.style.display = "none"
        subjectLog.innerHTML = ""
    } else {
        subjectLog.style.display = "block"
        subjectLog.innerHTML = "<p>Must be at least 10 characters</p>"
    }

    if (emailCheck()) {
        emailValid = true
        emailLog.style.display = "none"
        emailLog.innerHTML = ""
    } else {
        emailLog.style.display = "block"
        emailLog.innerHTML = "<p>Must be a valid email</p>"
    }

    if (addressField.value.length > 24) {
        addressValid = true
        addressLog.style.display = "none"
        addressLog.innerHTML = ""
    } else {
        addressLog.style.display = "block"
        addressLog.innerHTML = "<p>Must be at least 25 characters</p>"
    }

    if (nameValid && subjectValid && emailValid && addressValid) {
        output.style.display = "block"
        output.innerHTML = "<h3>Valid</h3>"
    } else {
        output.style.display = "none"
        output.innerHTML = ""
    }
}

function emailCheck() {
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return regEx.test(emailField.value)
}