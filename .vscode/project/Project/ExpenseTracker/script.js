let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editIndex = null;

const form = document.getElementById("expenseForm");
const list = document.getElementById("list");
const filter = document.getElementById("filter");

const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("category");

form.addEventListener("submit", addTransaction);
filter.addEventListener("change", render);

function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

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

  const data = { desc, amount, date, category };

  if (editIndex !== null) {
    transactions[editIndex] = data;
    editIndex = null;
  } else {
    transactions.push(data);
  }

  saveToLocalStorage();
  form.reset();
  render();
}

function render() {
  list.innerHTML = "";
  let income = 0, expense = 0;

  transactions
    .filter(t => filter.value === "All" || t.category === filter.value)
    .forEach((t, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
  <td data-label="Description">${t.desc}</td>
  <td data-label="Amount" class="${t.category === "Income" ? "income" : "expense"}">₹${t.amount}</td>
  <td data-label="Date">${t.date}</td>
  <td data-label="Category">${t.category}</td>
  <td data-label="Actions">
   <span class="action-btn edit-btn" onclick="editTransaction(${index})">Edit</span>
<span class="action-btn delete-btn" onclick="deleteTransaction(${index})">Delete</span>

  </td>
`;


      list.appendChild(tr);

      t.category === "Income"
        ? income += t.amount
        : expense += t.amount;
    });

  document.getElementById("income").innerText = `₹${income}`;
  document.getElementById("expense").innerText = `₹${expense}`;
  document.getElementById("balance").innerText = `₹${income - expense}`;
}

function editTransaction(index) {
  const t = transactions[index];
  descInput.value = t.desc;
  amountInput.value = t.amount;
  dateInput.value = t.date;
  categoryInput.value = t.category;
  editIndex = index;
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveToLocalStorage();
  render();
}

// Initial render
render();


