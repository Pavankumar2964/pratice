let transactions = [];
let editId = null;

const API_URL = "https://expense-backend.onrender.com/transactions";

const form = document.getElementById("expenseForm");
const list = document.getElementById("list");
const filter = document.getElementById("filter");

const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("category");

form.addEventListener("submit", addTransaction);
filter.addEventListener("change", render);

/* ---------------- BACKEND ---------------- */

// Load transactions
async function loadTransactions() {
  const res = await fetch(API_URL);
  transactions = await res.json();
  render();
}

// Add OR Update
async function saveTransaction(data) {
  const method = editId ? "PUT" : "POST";
  const url = editId ? `${API_URL}/${editId}` : API_URL;

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  editId = null;
  loadTransactions();
}

// Delete
async function deleteTransaction(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTransactions();
}

/* ---------------- UI ---------------- */

function addTransaction(e) {
  e.preventDefault();

  const desc = descInput.value.trim();
  const amount = Number(amountInput.value);
  const date = dateInput.value;
  const category = categoryInput.value;

  if (!desc || amount <= 0 || !date) {
    alert("Enter valid details");
    return;
  }

  saveTransaction({ desc, amount, date, category });
  form.reset();
}

function render() {
  list.innerHTML = "";
  let income = 0, expense = 0;

  transactions
    .filter(t => filter.value === "All" || t.category === filter.value)
    .forEach(t => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${t.desc}</td>
        <td class="${t.category === "Income" ? "income" : "expense"}">₹${t.amount}</td>
        <td>${t.date}</td>
        <td>${t.category}</td>
        <td>
          <span class="action-btn" onclick="edit('${t._id}')">Edit</span>
          <span class="action-btn" onclick="remove('${t._id}')">Delete</span>
        </td>
      `;

      list.appendChild(tr);

      t.category === "Income"
        ? (income += t.amount)
        : (expense += t.amount);
    });

  document.getElementById("income").innerText = `₹${income}`;
  document.getElementById("expense").innerText = `₹${expense}`;
  document.getElementById("balance").innerText = `₹${income - expense}`;
}

function edit(id) {
  const t = transactions.find(tx => tx._id === id);
  descInput.value = t.desc;
  amountInput.value = t.amount;
  dateInput.value = t.date;
  categoryInput.value = t.category;
  editId = id;
}

function remove(id) {
  deleteTransaction(id);
}

// Initial load
loadTransactions();
