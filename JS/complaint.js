import { renderLayout, showToast } from "./supervisor_layout.js";
import { complaints } from "../../model/sampleData.js";

renderLayout();

const content = document.getElementById("pageContent");
function draw() {
 content.innerHTML = `<h2>Customer Complaints</h2>
  <table>
        <thead>
         <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Subject</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${complaints.map(c=>`<tr>
          <td>${c.id}</td>
          <td>${c.customer}</td>
          <td>${c.subject}</td>
          <td>${c.date}</td>
          <td>
            <select data-id="${c.id}">
              ${["Pending","Under Review","Resolved","Forwarded"].map(s=>`<option ${c.status===s?"selected":""}>${s}</option>`).join("")}
            </select>
          </td>
        </tr>`).join("")}
      </tbody>
    </table>`;
 content.querySelectorAll("select").forEach(el => el.addEventListener("change", e => {
   const complaint = complaints.find(x => x.id === e.target.dataset.id);
   if (!complaint) {
     showToast("Complaint could not be found.", "error");
     return;
   }
   complaint.status = e.target.value;
   showToast(`Complaint ${complaint.id} status updated successfully.`, "success");
 }));
}
draw();
