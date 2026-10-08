const API_URL = "https://jsonplaceholder.typicode.com/users";

const loadButton = document.getElementById("load-users");
const filterInput = document.getElementById("filter-input");
const statusEl = document.getElementById("status");
const usersList = document.getElementById("users-list");

// All users from the last successful load
let allUsers = [];

async function loadUsers() {
  loadButton.disabled = true;
  statusEl.textContent = "Loading users...";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    allUsers = await response.json();

    // Respect any text already typed in the filter box
    renderUsers(getFilteredUsers());
    statusEl.textContent = `Loaded ${allUsers.length} users.`;
  } catch (error) {
    statusEl.textContent = `Error: could not load users. ${error.message}`;
  } finally {
    loadButton.disabled = false;
  }
}

function renderUsers(list) {
  usersList.replaceChildren();

  if (list.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No users match your filter.";
    usersList.appendChild(emptyItem);
    return;
  }

  for (const user of list) {
    const item = document.createElement("li");

    const name = document.createElement("strong");
    name.textContent = user.name;

    const email = document.createElement("div");
    email.textContent = `Email: ${user.email}`;

    const city = document.createElement("div");
    city.textContent = `City: ${user.address.city}`;

    const company = document.createElement("div");
    company.textContent = `Company: ${user.company.name}`;

    item.append(name, email, city, company);
    usersList.appendChild(item);
  }
}

function getFilteredUsers() {
  const text = filterInput.value.trim().toLowerCase();
  return allUsers.filter((user) => user.name.toLowerCase().includes(text));
}

loadButton.addEventListener("click", loadUsers);

filterInput.addEventListener("input", () => {
  // Nothing to filter until users have been loaded
  if (allUsers.length === 0) return;
  renderUsers(getFilteredUsers());
});
