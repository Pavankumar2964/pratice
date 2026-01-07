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

  saveAndRender();
  form.reset();
}

function render() {
  list.innerHTML = "";
  let income = 0, expense = 0;

  transactions
    .filter(t => filter.value === "All" || t.category === filter.value)
    .forEach(t => {
      const index = transactions.indexOf(t);
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${t.desc}</td>
        <td class="${t.category === 'Income' ? 'income' : 'expense'}">₹${t.amount}</td>
        <td>${t.date}</td>
        <td>${t.category}</td>
        <td>
          <span class="action-btn" onclick="edit(${index})">Edit</span>
          <span class="action-btn" onclick="remove(${index})">Delete</span>
        </td>
      `;

      list.appendChild(tr);

      t.category === "Income" ? income += t.amount : expense += t.amount;
    });

  document.getElementById("income").innerText = `₹${income}`;
  document.getElementById("expense").innerText = `₹${expense}`;
  document.getElementById("balance").innerText = `₹${income - expense}`;
}

function edit(index) {
  const t = transactions[index];
  descInput.value = t.desc;
  amountInput.value = t.amount;
  dateInput.value = t.date;
  categoryInput.value = t.category;
  editIndex = index;
}

function remove(index) {
  transactions.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  render();
}

render();
