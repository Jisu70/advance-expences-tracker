

const API_URL = `http://localhost:3000/api/main`;



let parent = document.getElementById('premiumuser');

const leadBoard = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/is-premium`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (data.isPremium === true) {


  } else {
    alert(" you are not a premium user ")
  }
}

// To show alluser tootal expenses
const allUserTotalExpenses = async () => {
  const response = await fetch(`${API_URL}/lead-board`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resultArray = await response.json();

  const expensesByUser = {};

  resultArray.forEach(user => {
    if (expensesByUser[user.User.name]) {
      expensesByUser[user.User.name] += parseFloat(user.amount);
    } else {
      expensesByUser[user.User.name] = parseFloat(user.amount);
    }
  });
  console.log(expensesByUser)
  let parent = document.getElementById('list-group');
  const sortedExp = Object.entries(expensesByUser).sort((a, b) => b[1] - a[1]);
  parent.innerHTML = '';

  sortedExp.forEach(([key, value]) => {
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `${key} total expenses: ${value}`;
    parent.appendChild(li);
  });

}



allUserTotalExpenses()








leadBoard()