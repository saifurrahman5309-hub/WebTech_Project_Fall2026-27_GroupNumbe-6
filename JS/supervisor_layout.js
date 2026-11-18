const links = [
  ["Dashboard", "dashboard.html"], ["Trip Management", "trips.html"],
  ["Bus Monitoring", "buses.html"], ["Ticket-Checker Assignment", "ticket-checkers.html"],
  ["Complaint Management", "complaints.html"], ["Maintenance Requests", "maintenance.html"],
  ["Reports", "reports.html"], ["My Profile", "profile.html"]
];

export function renderLayout() {
  const current = location.pathname.split("/").pop();
  const sidebar = document.getElementById("sidebar");
  const topbar = document.getElementById("topbar");
  if (sidebar) {
    sidebar.innerHTML = `<div class="brand">BUS MANAGEMENT<small>SUPERVISOR PANEL</small></div>
      <div class="nav-label">WORKSPACE</div><nav>
      ${links.map(([label, href]) => `<a class="nav-link ${current === href ? "active" : ""}" href="${href}">${label}</a>`).join("")}
      </nav>`;
  }
  if (topbar) topbar.innerHTML = `<div class="user-chip">Supervisor &nbsp; | &nbsp; <a href="../../../../index.html">Logout</a></div>`;
}


// Common toast notification function for all pages.
export function showToast(message, type = "success") {
  let container = document.getElementById("toastContainer");

  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  const isSuccess = type === "success";
  toast.className = `app-toast ${isSuccess ? "toast-success" : "toast-error"}`;
  toast.innerHTML = `
    <span class="toast-icon">${isSuccess ? "✓" : "✕"}</span>
    <span class="toast-message"></span>
    <button class="toast-close" type="button" aria-label="Close notification">×</button>
  `;
  toast.querySelector(".toast-message").textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  const close = () => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 250);
  };
  toast.querySelector(".toast-close").addEventListener("click", close);
  setTimeout(close, 3500);
}
