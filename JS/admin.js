document.addEventListener("DOMContentLoaded", function () {
    let busForm = document.getElementById("busForm");
    if (busForm) {
        busForm.addEventListener("submit", function (event) {
            let idOK = validateBusId();
            let numberOK = validateBusNumber();
            let typeOK = validateBusType();
            let capacityOK = validateCapacity();
            let statusOK = validateStatus();
            let fitnessOK = validateFitness();

            if (!idOK || !numberOK || !typeOK || !capacityOK || !statusOK || !fitnessOK) {
                event.preventDefault();
                showResult(false, "Please correct the errors above.");
            } else {
                event.preventDefault();
                addBusToTable();
                showResult(true, "Bus added successfully!");
                busForm.reset();
            }
        });
    }

    let tripForm = document.getElementById("tripForm");
    if (tripForm) {
        tripForm.addEventListener("submit", function (event) {
            let idOK = validateTripId();
            let startOK = validateStart();
            let destOK = validateDest();
            let busOK = validateBusSelect();
            let driverOK = validateDriver();
            let depOK = validateDeparture();
            let priceOK = validatePrice();
            let confirmOK = validateConfirm();

            if (!idOK || !startOK || !destOK || !busOK || !driverOK || !depOK || !priceOK || !confirmOK) {
                event.preventDefault();
                showResult(false, "Please correct the errors above.");
            } else {
                event.preventDefault();
                addTripToTable();
                showResult(true, "Route schedule saved successfully!");
                tripForm.reset();
            }
        });
    }

    let bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            let idOK = validateBookingId();
            let nameOK = validatePassengerName();
            let phoneOK = validatePassengerPhone();
            let routeOK = validateRouteSelect();
            let seatOK = validateSeatNumber();
            let fareOK = validateFare();
            let statusOK = validateBookingStatus();
            let termsOK = validateBookingTerms();

            if (!idOK || !nameOK || !phoneOK || !routeOK || !seatOK || !fareOK || !statusOK || !termsOK) {
                event.preventDefault();
                showResult(false, "Please correct the errors above.");
            } else {
                event.preventDefault();
                addBookingToTable();
                showResult(true, "Booking recorded successfully!");
                bookingForm.reset();
            }
        });
    }

    let userForm = document.getElementById("userForm");
    if (userForm) {
        userForm.addEventListener("submit", function (event) {
            let idOK = validateUserId();
            let nameOK = validateUserName();
            let emailOK = validateEmail();
            let roleOK = validateRole();
            let statusOK = validateAccountStatus();
            let termsOK = validateUserTerms();

            if (!idOK || !nameOK || !emailOK || !roleOK || !statusOK || !termsOK) {
                event.preventDefault();
                showResult(false, "Please correct the errors above.");
            } else {
                event.preventDefault();
                addUserToTable();
                showResult(true, "User account saved successfully!");
                userForm.reset();
            }
        });
    }
});

function showResult(success, text) {
    let result = document.getElementById("ResultText");
    if (!result) return;

    result.innerHTML = text;

    if (success) {
        result.className = "success";
    } else {
        result.className = "failed";
    }
}

function validateBusId() {
    let busId = document.getElementById("busId").value.trim();
    let message = document.getElementById("BusIdError");

    if (busId === "") {
        message.innerHTML = "Enter Bus ID";
        return false;
    }

    if (!/^B-\d{3,4}$/.test(busId)) {
        message.innerHTML = "Bus ID format must be B-101 or B-1001";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateBusNumber() {
    let busNumber = document.getElementById("busNumber").value.trim();
    let message = document.getElementById("BusNumberError");

    if (busNumber === "") {
        message.innerHTML = "Enter Bus Number";
        return false;
    }

    if (busNumber.length < 5) {
        message.innerHTML = "Bus number must be at least 5 characters";
        return false;
    }

    if (!/^[A-Za-z0-9\- ]+$/.test(busNumber)) {
        message.innerHTML = "Bus number can only contain letters, numbers, hyphens, and spaces";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateBusType() {
    let busType = document.getElementById("busType").value;
    let message = document.getElementById("BusTypeError");

    if (busType === "") {
        message.innerHTML = "Select Bus Type";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateCapacity() {
    let capacity = document.getElementById("capacity").value;
    let message = document.getElementById("CapacityError");

    if (capacity === "") {
        message.innerHTML = "Enter bus capacity";
        return false;
    }

    let num = Number(capacity);
    if (isNaN(num) || num < 10 || num > 80 || !Number.isInteger(num)) {
        message.innerHTML = "Capacity must be a whole number between 10 and 80";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateStatus() {
    let status = document.querySelector('input[name="status"]:checked');
    let message = document.getElementById("StatusError");

    if (status === null) {
        message.innerHTML = "Select a bus status";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateFitness() {
    let fitness = document.getElementById("fitnessCert").checked;
    let message = document.getElementById("FitnessError");

    if (!fitness) {
        message.innerHTML = "Fitness certificate must be verified";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function addBusToTable() {
    let busId = document.getElementById("busId").value.trim();
    let busNumber = document.getElementById("busNumber").value.trim();
    let busType = document.getElementById("busType").value;
    let capacity = document.getElementById("capacity").value;
    let status = document.querySelector('input[name="status"]:checked').value;

    let emptyRow = document.getElementById("emptyRow");
    if (emptyRow) {
        emptyRow.remove();
    }

    let table = document.getElementById("busTable");
    let tr = document.createElement("tr");

    tr.innerHTML = "<td>" + busId + "</td>" +
                   "<td>" + busNumber + "</td>" +
                   "<td>" + busType + "</td>" +
                   "<td>" + capacity + " Seats</td>" +
                   "<td>" + status + "</td>";

    table.appendChild(tr);
}

function validateTripId() {
    let tripId = document.getElementById("tripId").value.trim();
    let message = document.getElementById("TripIdError");

    if (tripId === "") {
        message.innerHTML = "Enter Trip ID";
        return false;
    }

    if (!/^TRP-\d{3,4}$/.test(tripId)) {
        message.innerHTML = "Trip ID format must be TRP-101 or TRP-1001";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateStart() {
    let start = document.getElementById("startLocation").value.trim();
    let message = document.getElementById("StartError");

    if (start === "") {
        message.innerHTML = "Enter start location";
        return false;
    }

    if (start.length < 3) {
        message.innerHTML = "Start location must be at least 3 characters";
        return false;
    }

    if (!/^[A-Za-z\s]+$/.test(start)) {
        message.innerHTML = "Start location must contain letters only";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateDest() {
    let start = document.getElementById("startLocation").value.trim();
    let dest = document.getElementById("destination").value.trim();
    let message = document.getElementById("DestError");

    if (dest === "") {
        message.innerHTML = "Enter destination";
        return false;
    }

    if (dest.length < 3) {
        message.innerHTML = "Destination must be at least 3 characters";
        return false;
    }

    if (!/^[A-Za-z\s]+$/.test(dest)) {
        message.innerHTML = "Destination must contain letters only";
        return false;
    }

    if (start.toLowerCase() === dest.toLowerCase()) {
        message.innerHTML = "Start location and destination cannot be the same";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateBusSelect() {
    let bus = document.getElementById("busSelect").value;
    let message = document.getElementById("BusSelectError");

    if (bus === "") {
        message.innerHTML = "Select an assigned bus";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateDriver() {
    let driver = document.getElementById("driverName").value.trim();
    let message = document.getElementById("DriverError");

    if (driver === "") {
        message.innerHTML = "Enter driver name";
        return false;
    }

    if (driver.length < 3) {
        message.innerHTML = "Driver name must be at least 3 characters";
        return false;
    }

    if (!/^[A-Za-z\s.]+$/.test(driver)) {
        message.innerHTML = "Driver name can only contain letters, dots, and spaces";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateDeparture() {
    let dep = document.getElementById("departureTime").value;
    let message = document.getElementById("DepartureError");

    if (dep === "") {
        message.innerHTML = "Select departure time";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validatePrice() {
    let price = document.getElementById("ticketPrice").value;
    let message = document.getElementById("PriceError");

    if (price === "") {
        message.innerHTML = "Enter ticket price";
        return false;
    }

    let num = Number(price);
    if (isNaN(num) || num < 50 || num > 5000 || !Number.isInteger(num)) {
        message.innerHTML = "Price must be a whole number between 50 and 5000 BDT";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateConfirm() {
    let confirm = document.getElementById("scheduleConfirm").checked;
    let message = document.getElementById("ConfirmError");

    if (!confirm) {
        message.innerHTML = "You must confirm this route";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function addTripToTable() {
    let tripId = document.getElementById("tripId").value.trim();
    let start = document.getElementById("startLocation").value.trim();
    let dest = document.getElementById("destination").value.trim();
    let bus = document.getElementById("busSelect").value;
    let driver = document.getElementById("driverName").value.trim();
    let dep = document.getElementById("departureTime").value;
    let price = document.getElementById("ticketPrice").value;

    let emptyRow = document.getElementById("emptyTripRow");
    if (emptyRow) {
        emptyRow.remove();
    }

    let table = document.getElementById("tripTable");
    let tr = document.createElement("tr");

    tr.innerHTML = "<td>" + tripId + "</td>" +
                   "<td>" + start + " to " + dest + "</td>" +
                   "<td>" + bus + "</td>" +
                   "<td>" + driver + "</td>" +
                   "<td>" + dep + "</td>" +
                   "<td>" + price + " BDT</td>";

    table.appendChild(tr);
}

function validateBookingId() {
    let bookingId = document.getElementById("bookingId").value.trim();
    let message = document.getElementById("BookingIdError");

    if (bookingId === "") {
        message.innerHTML = "Enter Booking ID";
        return false;
    }

    if (!/^BKG-\d{3,4}$/.test(bookingId)) {
        message.innerHTML = "Booking ID format must be BKG-101 or BKG-1001";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validatePassengerName() {
    let name = document.getElementById("passengerName").value.trim();
    let message = document.getElementById("PassengerNameError");

    if (name === "") {
        message.innerHTML = "Enter passenger name";
        return false;
    }

    if (name.length < 3) {
        message.innerHTML = "Passenger name must be at least 3 characters";
        return false;
    }

    if (!/^[A-Za-z\s.]+$/.test(name)) {
        message.innerHTML = "Passenger name can only contain letters, dots, and spaces";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validatePassengerPhone() {
    let phone = document.getElementById("passengerPhone").value.trim();
    let message = document.getElementById("PassengerPhoneError");

    if (phone === "") {
        message.innerHTML = "Enter phone number";
        return false;
    }

    if (!/^01[3-9]\d{8}$/.test(phone)) {
        message.innerHTML = "Enter valid 11-digit BD phone number starting with 01 (e.g. 01712345678)";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateRouteSelect() {
    let route = document.getElementById("routeSelect").value;
    let message = document.getElementById("RouteSelectError");

    if (route === "") {
        message.innerHTML = "Select an assigned route";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateSeatNumber() {
    let seat = document.getElementById("seatNumber").value.trim();
    let message = document.getElementById("SeatNumberError");

    if (seat === "") {
        message.innerHTML = "Enter seat number";
        return false;
    }

    if (!/^[A-J][1-4]$/.test(seat)) {
        message.innerHTML = "Seat format must be A1 to J4 (e.g. A1, B2, C4)";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateFare() {
    let fare = document.getElementById("fare").value;
    let message = document.getElementById("FareError");

    if (fare === "") {
        message.innerHTML = "Enter fare amount";
        return false;
    }

    let num = Number(fare);
    if (isNaN(num) || num < 50 || num > 5000 || !Number.isInteger(num)) {
        message.innerHTML = "Fare must be a whole number between 50 and 5000 BDT";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateBookingStatus() {
    let status = document.querySelector('input[name="bookingStatus"]:checked');
    let message = document.getElementById("BookingStatusError");

    if (status === null) {
        message.innerHTML = "Select booking status";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateBookingTerms() {
    let terms = document.getElementById("terms").checked;
    let message = document.getElementById("TermsError");

    if (!terms) {
        message.innerHTML = "Payment and verification confirmation is required";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function addBookingToTable() {
    let bookingId = document.getElementById("bookingId").value.trim();
    let name = document.getElementById("passengerName").value.trim();
    let phone = document.getElementById("passengerPhone").value.trim();
    let route = document.getElementById("routeSelect").value;
    let seat = document.getElementById("seatNumber").value.trim();
    let fare = document.getElementById("fare").value;
    let status = document.querySelector('input[name="bookingStatus"]:checked').value;

    let emptyRow = document.getElementById("emptyBookingRow");
    if (emptyRow) {
        emptyRow.remove();
    }

    let table = document.getElementById("bookingTable");
    let tr = document.createElement("tr");

    tr.innerHTML = "<td>" + bookingId + "</td>" +
                   "<td>" + name + "</td>" +
                   "<td>" + phone + "</td>" +
                   "<td>" + route + "</td>" +
                   "<td>" + seat + "</td>" +
                   "<td>" + fare + " BDT</td>" +
                   "<td>" + status + "</td>";

    table.appendChild(tr);
}

function validateUserId() {
    let userId = document.getElementById("userId").value.trim();
    let message = document.getElementById("UserIdError");

    if (userId === "") {
        message.innerHTML = "Enter User ID";
        return false;
    }

    if (!/^USR-\d{3,4}$/.test(userId)) {
        message.innerHTML = "User ID format must be USR-101 or USR-1001";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateUserName() {
    let name = document.getElementById("name").value.trim();
    let message = document.getElementById("NameError");

    if (name === "") {
        message.innerHTML = "Enter your full name";
        return false;
    }

    if (name.length < 3) {
        message.innerHTML = "Name must be at least 3 characters";
        return false;
    }

    if (!/^[A-Za-z\s.]+$/.test(name)) {
        message.innerHTML = "Name can contain only letters, dots, and spaces";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateEmail() {
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("EmailError");

    if (email === "") {
        message.innerHTML = "Enter your email address";
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        message.innerHTML = "Enter a valid email address (e.g. name@example.com)";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateRole() {
    let role = document.getElementById("role").value;
    let message = document.getElementById("RoleError");

    if (role === "") {
        message.innerHTML = "Select a role";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateAccountStatus() {
    let status = document.querySelector('input[name="accountStatus"]:checked');
    let message = document.getElementById("AccountStatusError");

    if (status === null) {
        message.innerHTML = "Select account status";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function validateUserTerms() {
    let terms = document.getElementById("terms").checked;
    let message = document.getElementById("TermsError");

    if (!terms) {
        message.innerHTML = "Authorization confirmation is required";
        return false;
    }

    message.innerHTML = "";
    return true;
}

function addUserToTable() {
    let userId = document.getElementById("userId").value.trim();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let role = document.getElementById("role").value;
    let status = document.querySelector('input[name="accountStatus"]:checked').value;

    let emptyRow = document.getElementById("emptyUserRow");
    if (emptyRow) {
        emptyRow.remove();
    }

    let table = document.getElementById("userTable");
    let tr = document.createElement("tr");

    tr.innerHTML = "<td>" + userId + "</td>" +
                   "<td>" + name + "</td>" +
                   "<td>" + email + "</td>" +
                   "<td>" + role + "</td>" +
                   "<td>" + status + "</td>";

    table.appendChild(tr);
}