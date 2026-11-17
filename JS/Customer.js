console.log("Customer.js Connected");

function showError(id, msg) { document.getElementById(id).innerHTML = msg; }
function clearError(id) { document.getElementById(id).innerHTML = ""; }

function clearAllErrors() {
    let errors = document.querySelectorAll(".input-error");
    for (let i = 0; i < errors.length; i++) { errors[i].innerHTML = ""; }
    let result = document.getElementById("ResultText");
    result.className = "";
    result.innerHTML = "";
}

function validateCustomerForm() {
    let isValid = true;

    let name = document.getElementById("CustomerName").value.trim();
    if (name.length < 3) { showError("NameError", "Name must be at least 3 characters."); isValid = false; } else { clearError("NameError"); }

    let email = document.getElementById("CustomerEmail").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError("EmailError", "Enter a valid email."); isValid = false; } else { clearError("EmailError"); }

    let phone = document.getElementById("CustomerPhone").value.trim();
    if (!/^01[3-9][0-9]{8}$/.test(phone)) { showError("PhoneError", "Must be 11 digits starting 013-019."); isValid = false; } else { clearError("PhoneError"); }

    let genders = document.getElementsByName("gender");
    let genderSelected = false;
    for (let i = 0; i < genders.length; i++) { if (genders[i].checked) genderSelected = true; }
    if (!genderSelected) { showError("GenderError", "Please select a gender."); isValid = false; } else { clearError("GenderError"); }

    let dob = document.getElementById("CustomerDOB").value;
    if (!dob) { showError("DOBError", "Please select your DOB."); isValid = false; } else {
        let birthYear = new Date(dob).getFullYear();
        let currentYear = new Date().getFullYear();
        if (currentYear - birthYear < 16) { showError("DOBError", "Must be at least 16 years old."); isValid = false; } else { clearError("DOBError"); }
    }

    let nid = document.getElementById("CustomerNID").value.trim();
    if (!/^[0-9]{10}$/.test(nid)) { showError("NIDError", "NID must be exactly 10 digits."); isValid = false; } else { clearError("NIDError"); }

    let address = document.getElementById("CustomerAddress").value.trim();
    if (address.length < 10) { showError("AddressError", "Address must be at least 10 characters."); isValid = false; } else { clearError("AddressError"); }

    let username = document.getElementById("UserName").value.trim();
    if (!/^[A-Za-z][A-Za-z0-9_]{3,14}$/.test(username)) { showError("UserNameError", "Start with a letter; 4-15 chars."); isValid = false; } else { clearError("UserNameError"); }

    let password = document.getElementById("Password").value;
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        showError("PasswordError", "Needs 8+ chars, upper, lower, and number."); isValid = false;
    } else { clearError("PasswordError"); }

    let confirm = document.getElementById("ConfirmPassword").value;
    if (confirm !== password || confirm === "") { showError("ConfirmError", "Passwords do not match."); isValid = false; } else { clearError("ConfirmError"); }

    let resultBox = document.getElementById("ResultText");
    if (isValid) {
        resultBox.className = "success";
        resultBox.innerHTML = "Registration Successful! You can now <a href='CustomerDashboard.html' style='color: #166534; text-decoration: underline;'>Go to Dashboard</a>";
    } else {
        resultBox.className = "failed";
        resultBox.innerHTML = "Please fix the errors marked in red.";
    }
    return false;
}