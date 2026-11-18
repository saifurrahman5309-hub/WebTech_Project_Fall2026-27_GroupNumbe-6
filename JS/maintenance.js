import { renderLayout, showToast } from "./supervisor_layout.js";
import { maintenanceRequests } from "../../model/sampleData.js";
renderLayout();
const content = document.getElementById("pageContent");
function draw() {
 content.innerHTML = `<div class="request-form">
 <h2>Submit Maintenance Request</h2>
   <form id="requestForm"><label>Bus Registration<input name="bus" required placeholder="e.g. DHA-11-2045"></label><label>Issue Description<textarea name="issue" required rows="3" placeholder="Describe the issue"></textarea></label><button>Submit Request</button></form></div><br><h2>Maintenance Requests</h2>
 <table>
    <thead>
      <tr>
       <th>Request ID</th>
       <th>Bus</th>
       <th>Issue</th>
       <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${maintenanceRequests.map(r=>`<tr>
        <td>${r.id}</td>
        <td>${r.bus}</td>
        <td>${r.issue}</td>
        <td><span class="status">${r.status}</span></td>
      </tr>`).join("")}
    </tbody>
  </table>`;
 document.getElementById("requestForm").addEventListener("submit", e => {
   e.preventDefault();
   const form = e.target;
   if (!form.checkValidity()) {
     showToast("Please fill in all required fields.", "error");
     form.reportValidity();
     return;
   }
   try {
     const data = new FormData(form);
     maintenanceRequests.unshift({
       id: `MR-${Date.now()}`,
       bus: String(data.get("bus")).trim(),
       issue: String(data.get("issue")).trim(),
       status: "Pending"
     });
     draw();
     showToast("Maintenance request submitted successfully.", "success");
   } catch (error) {
     showToast("Failed to submit maintenance request. Please try again.", "error");
   }
 });
}
draw();
