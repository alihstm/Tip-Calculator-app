// Get elements
const tipAmount = document.getElementById("tipAmount");
const total = document.getElementById("total");
const resetBtn = document.getElementById("reset-btn");
const billInput = document.getElementById("Bill");
const peopleInput = document.getElementById("People");
const billWarning = document.getElementById("bill-warning");
const peopleWarning = document.getElementById("people-warning");

// Tip percentages
const tipValues = [5 / 100, 10 / 100, 15 / 100, 25 / 100, 50 / 100, 75 / 100];

// Get tip buttons
const tips = Array.from({ length: 6 }, (_, i) => document.getElementById(`tip${i + 1}`));

// Add event listener to each tip button
tips.forEach((tip, index) => {
  tip.addEventListener("click", () => {
    // Remove active class from all tips
    tips.forEach((t) => t.classList.remove("active"));
    // Add active class to the clicked tip
    tip.classList.add("active");

    // Calculate tip amount
    const tipPercent = tipValues[index];
    const amount = calculateTip(billInput.value, peopleInput.value, tipPercent);
    changeStyle(tip, amount);
  });
});

// Validate input
function isValid(input) {
  return input !== "" && input !== null && input !== 0;
}

// Calculate tip
function calculateTip(bill, people, tipPercent) {
  if (isValid(bill) && isValid(people)) {
    // Clear warnings
    billWarning.style.display = "";
    billInput.style.border = "";
    peopleWarning.style.display = "";
    peopleInput.style.border = "";

    // Calculate tip amount
    const amount = (bill / people).toFixed(2) * tipPercent;
    return amount.toFixed(2);
  } else {
    // Show warnings and reset tip amount and total
    if (!isValid(bill)) {
      billWarning.style.display = "block";
      billInput.style.border = "1px solid red";
    }
    if (!isValid(people)) {
      peopleWarning.style.display = "block";
      peopleInput.style.border = "1px solid red";
    }
    tipAmount.textContent = "0.00";
    total.textContent = "0.00";
    return 0;
  }
}

// Update tip amount and total
function changeStyle(targetTip, amount) {
  // Reset styles for other tips
  tips.forEach((t) => {
    if (t !== targetTip) {
      t.style.backgroundColor = "";
      t.style.color = "";
    }
  });

  // Update tip amount and total
  tipAmount.textContent = `$${amount}`;
  const totalPerPerson = parseFloat(billInput.value) / parseFloat(peopleInput.value) + parseFloat(amount);
  total.textContent = `$${totalPerPerson.toFixed(2)}`;
}

function Reset() {
  billInput.value = "";
  peopleInput.value = "";
  tipAmount.textContent = "0.00";
  total.textContent = "0.00";
}