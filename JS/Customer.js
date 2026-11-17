console.log("Customer.js Connected");

function showError(id, msg) {
    let el = document.getElementById(id);
    if (el) { el.innerHTML = msg; }
}

function clearError(id) {
    let el = document.getElementById(id);
    if (el) { el.innerHTML = ""; }
}

function clearAllErrors() {
    let errors = document.querySelectorAll(".input-error");
    for (let i = 0; i < errors.length; i++) { errors[i].innerHTML = ""; }
    let result = document.getElementById("ResultText");
    if (result) {
        result.className = "";
        result.innerHTML = "";
    }
}

function getTodayString() {
    let now = new Date();
    return now.getFullYear() + "-" +
           String(now.getMonth() + 1).padStart(2, "0") + "-" +
           String(now.getDate()).padStart(2, "0");
}

function calculateAge(dobString) {
    let birth = new Date(dobString);
    let today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    let monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

function validateCustomerForm() {
    let isValid = true;

    let name = document.getElementById("CustomerName").value.trim();
    if (name.length < 3) { showError("NameError", "Name must be at least 3 characters."); isValid = false; } else { clearError("NameError"); }

    let email = document.getElementById("CustomerEmail").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError("EmailError", "Enter a valid email."); isValid = false; } else { clearError("EmailError"); }

    let phone = document.getElementById("CustomerPhone").value.trim();
    if (!/^01[3-9][0-9]{8}$/.test(phone)) { showError("PhoneError", "Must be 11 digits starting 013-019."); isValid = false; } else { clearError("PhoneError"); }

    let genderSelected = document.querySelector('input[name="gender"]:checked') !== null;
    if (!genderSelected) { showError("GenderError", "Please select a gender."); isValid = false; } else { clearError("GenderError"); }

    let dob = document.getElementById("CustomerDOB").value;
    if (!dob) {
        showError("DOBError", "Please select your DOB."); isValid = false;
    } else if (calculateAge(dob) < 16) {
        showError("DOBError", "Must be at least 16 years old."); isValid = false;
    } else {
        clearError("DOBError");
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

    let confirmPassword = document.getElementById("ConfirmPassword").value;
    if (confirmPassword !== password || confirmPassword === "") { showError("ConfirmError", "Passwords do not match."); isValid = false; } else { clearError("ConfirmError"); }

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

document.addEventListener("DOMContentLoaded", function () {
    let seats = document.querySelectorAll(".seat:not(.booked)");
    for (let i = 0; i < seats.length; i++) {
        seats[i].addEventListener("click", function () {
            this.classList.toggle("selected");
            clearError("SeatError");
        });
    }
});

function validateSearchForm() {
    let isValid = true;

    let from = document.getElementById("FromCity").value;
    let to = document.getElementById("ToCity").value;

    if (from === "") { showError("FromError", "Select departure city."); isValid = false; } else { clearError("FromError"); }

    if (to === "") { showError("ToError", "Select destination city."); isValid = false; }
    else if (to === from) { showError("ToError", "Departure and destination cannot be the same."); isValid = false; }
    else { clearError("ToError"); }

    let date = document.getElementById("TravelDate").value;
    if (!date) { showError("TravelDateError", "Select a travel date."); isValid = false; }
    else if (date < getTodayString()) { showError("TravelDateError", "Date cannot be in the past."); isValid = false; }
    else { clearError("TravelDateError"); }

    let result = document.getElementById("SearchResult");
    if (isValid) {
        result.className = "success";
        result.innerHTML = "Searching for buses...";
    } else {
        result.className = "failed";
        result.innerHTML = "Please fix the errors marked in red.";
    }
}

function validateSeatSelection() {
    let selected = document.querySelectorAll(".seat.selected");
    let result = document.getElementById("SeatResult");

    if (selected.length === 0) {
        showError("SeatError", "Please select at least one seat.");
        result.className = "";
        result.innerHTML = "";
        return;
    }
    if (selected.length > 5) {
        showError("SeatError", "You can select a maximum of 5 seats.");
        result.className = "";
        result.innerHTML = "";
        return;
    }

    clearError("SeatError");
    let names = [];
    for (let i = 0; i < selected.length; i++) { names.push(selected[i].innerHTML); }
    result.className = "success";
    result.innerHTML = "Seats selected: " + names.join(", ") + ". Proceeding to payment...";
}

function cancelTicket(btn) {
    let row = btn.parentNode.parentNode;
    let ticketNo = row.cells[0].textContent;

    if (!confirm("Cancel ticket " + ticketNo + "?")) { return; }

    row.parentNode.removeChild(row);

    let result = document.getElementById("TicketResult");
    result.className = "success";
    result.innerHTML = "Ticket " + ticketNo + " has been cancelled.";
}

function downloadTicket(btn) {
    let c = btn.parentNode.parentNode.cells;

    let text = "BUS TICKET\n" +
               "Ticket No: " + c[0].textContent + "\n" +
               "Route: "     + c[1].textContent + "\n" +
               "Date: "      + c[2].textContent + "\n" +
               "Seat: "      + c[3].textContent + "\n" +
               "Fare: "      + c[4].textContent + "\n";

    let blob = new Blob([text], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = c[0].textContent + ".txt";
    link.click();
    URL.revokeObjectURL(link.href);
}

let profileFields = [
    { view: "NameView",    input: "ProfileName" },
    { view: "EmailView",   input: "ProfileEmail" },
    { view: "PhoneView",   input: "ProfilePhone" },
    { view: "AddressView", input: "ProfileAddress" }
];

function setEditMode(editing) {
    for (let i = 0; i < profileFields.length; i++) {
        document.getElementById(profileFields[i].view).style.display  = editing ? "none" : "inline";
        document.getElementById(profileFields[i].input).style.display = editing ? "block" : "none";
    }
    document.getElementById("EditBtn").style.display       = editing ? "none" : "inline-block";
    document.getElementById("SaveBtn").style.display       = editing ? "inline-block" : "none";
    document.getElementById("CancelEditBtn").style.display = editing ? "inline-block" : "none";
}

function startEditProfile() {
    for (let i = 0; i < profileFields.length; i++) {
        document.getElementById(profileFields[i].input).value =
            document.getElementById(profileFields[i].view).textContent;
    }
    let result = document.getElementById("ProfileResult");
    result.className = "";
    result.innerHTML = "";
    setEditMode(true);
}

function cancelEditProfile() {
    let ids = ["ProfileNameError", "ProfileEmailError", "ProfilePhoneError", "ProfileAddressError"];
    for (let i = 0; i < ids.length; i++) { clearError(ids[i]); }
    let result = document.getElementById("ProfileResult");
    result.className = "";
    result.innerHTML = "";
    setEditMode(false);
}

function saveProfile() {
    let isValid = true;

    let name = document.getElementById("ProfileName").value.trim();
    if (name.length < 3) { showError("ProfileNameError", "Name must be at least 3 characters."); isValid = false; } else { clearError("ProfileNameError"); }

    let email = document.getElementById("ProfileEmail").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError("ProfileEmailError", "Enter a valid email."); isValid = false; } else { clearError("ProfileEmailError"); }

    let phone = document.getElementById("ProfilePhone").value.trim();
    if (!/^01[3-9][0-9]{8}$/.test(phone)) { showError("ProfilePhoneError", "Must be 11 digits starting 013-019."); isValid = false; } else { clearError("ProfilePhoneError"); }

    let address = document.getElementById("ProfileAddress").value.trim();
    if (address.length < 10) { showError("ProfileAddressError", "Address must be at least 10 characters."); isValid = false; } else { clearError("ProfileAddressError"); }

    let result = document.getElementById("ProfileResult");
    if (isValid) {
        document.getElementById("NameView").textContent    = name;
        document.getElementById("EmailView").textContent   = email;
        document.getElementById("PhoneView").textContent   = phone;
        document.getElementById("AddressView").textContent = address;
        setEditMode(false);
        result.className = "success";
        result.innerHTML = "Profile updated successfully!";
    } else {
        result.className = "failed";
        result.innerHTML = "Please fix the errors marked in red.";
    }
}

function validateSupportForm() {
    let isValid = true;

    let name = document.getElementById("SupportName").value.trim();
    if (name.length < 3) { showError("SupportNameError", "Name must be at least 3 characters."); isValid = false; } else { clearError("SupportNameError"); }

    let email = document.getElementById("SupportEmail").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError("SupportEmailError", "Enter a valid email."); isValid = false; } else { clearError("SupportEmailError"); }

    let issue = document.getElementById("IssueType").value;
    if (issue === "") { showError("IssueTypeError", "Select an issue type."); isValid = false; } else { clearError("IssueTypeError"); }

    let message = document.getElementById("SupportMessage").value.trim();
    if (message.length < 10 || message.length > 300) { showError("SupportMessageError", "Message must be 10 to 300 characters."); isValid = false; } else { clearError("SupportMessageError"); }

    let resultBox = document.getElementById("ResultText");
    if (isValid) {
        resultBox.className = "success";
        resultBox.innerHTML = "Message sent! Our team will contact you soon.";
    } else {
        resultBox.className = "failed";
        resultBox.innerHTML = "Please fix the errors marked in red.";
    }
    return false;
}

function toggleFaq(cell) {
    let answerRow = cell.parentNode.nextElementSibling;
    if (answerRow.style.display === "none") {
        answerRow.style.display = "table-row";
    } else {
        answerRow.style.display = "none";
    }
}