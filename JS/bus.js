import { renderLayout } from "./supervisor_layout.js";
import { buses } from "../../model/sampleData.js";


renderLayout();

const items = buses;

document.getElementById("pageContent").innerHTML = `
<h2>Bus List</h2>
<p class="bus-summary">View bus availability and operational status.</p>
<table>
  <thead>
    <tr>
      <th>Bus ID</th>
      <th>Registration</th>
      <th>Type</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    ${items.map(bus=>`
      <tr>
        <td>${bus.id}</td>
        <td>${bus.number}</td>
        <td>${bus.type}</td>
        <td><span class="status">${bus.status}</span></td>
      </tr>`).join("")}
  </tbody>
</table>`;


