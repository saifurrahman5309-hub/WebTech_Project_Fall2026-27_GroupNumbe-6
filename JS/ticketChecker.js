import { renderLayout, showToast } from "./supervisor_layout.js";
import { ticketCheckers, trips } from "../../model/sampleData.js";

renderLayout();

const content = document.getElementById("pageContent");

function draw() {
  content.innerHTML = `
    <h2>Ticket-Checker List</h2>
    <p class="assignment-help">
      Select a trip and assign it to a ticket-checker. Changes are stored in sample data
      until the page is refreshed.
    </p>

    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Assigned Trip</th>
            <th>Assign / Change Trip</th>
          </tr>
        </thead>
        <tbody>
          ${ticketCheckers.map(checker => `
            <tr>
              <td>${checker.id}</td>
              <td>${checker.name}</td>
              <td>${checker.phone}</td>
              <td>${checker.assigned && checker.assigned !== "Not Assigned" ? checker.assigned : "Not Assigned"}</td>
              <td>
                <select data-trip-select="${checker.id}" aria-label="Select trip for ${checker.name}">
                  <option value="">Choose trip</option>
                  ${trips.map(trip => `
                    <option value="${trip.id}" ${checker.assigned === trip.id ? "selected" : ""}>
                      ${trip.id} - ${trip.route}
                    </option>
                  `).join("")}
                </select>
                <button type="button" data-assign="${checker.id}">Assign</button>
                <button type="button" data-unassign="${checker.id}" class="secondary-btn">Unassign</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  content.querySelectorAll("[data-assign]").forEach(button => {
    button.addEventListener("click", () => {
      const checkerId = button.dataset.assign;
      const select = content.querySelector(`[data-trip-select="${checkerId}"]`);

      if (!select || !select.value) {
        showToast("Please select a trip first.", "error");
        return;
      }

      const checker = ticketCheckers.find(item => item.id === checkerId);
      const selectedTrip = trips.find(item => item.id === select.value);

      if (!checker || !selectedTrip) {
        showToast("Ticket-checker or trip not found.", "error");
        return;
      }

      // Prevent assigning the same trip to more than one ticket-checker.
      const alreadyAssigned = ticketCheckers.find(
        item => item.id !== checkerId && item.assigned === selectedTrip.id
      );

      if (alreadyAssigned) {
        showToast(`${selectedTrip.id} is already assigned to ${alreadyAssigned.name}.`, "error");
        return;
      }

      checker.assigned = selectedTrip.id;
      draw();
      showToast(`${checker.name} successfully assigned to ${selectedTrip.id}.`, "success");
    });
  });

  content.querySelectorAll("[data-unassign]").forEach(button => {
    button.addEventListener("click", () => {
      const checker = ticketCheckers.find(item => item.id === button.dataset.unassign);

      if (!checker) {
        showToast("Ticket-checker not found.", "error");
        return;
      }

      if (!checker.assigned || checker.assigned === "Not Assigned") {
        showToast("This ticket-checker has no assigned trip.", "error");
        return;
      }

      checker.assigned = "Not Assigned";
      draw();
      showToast(`${checker.name} has been unassigned successfully.`, "success");
    });
  });
}

draw();
