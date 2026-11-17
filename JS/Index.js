console.log("Index.js Connected");

function goToUser(user) {
    if (user === "admin") {
        window.location.href = "Page/Dashboard.html";
    } else {
        alert(user.toUpperCase() + " portal is under development by group member.");
    }
}
