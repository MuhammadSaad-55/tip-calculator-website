let tipPercentage = null;

const billInput = document.getElementById("bill-input");
const tipButtons = document.querySelectorAll(".tip-percent-btn");
const customTipInput = document.getElementById("custom-tip-input");
const peopleInput = document.getElementById("people-input");
const tipAmountDisplay = document.getElementById("tip-amount-display");
const totalAmountDisplay = document.getElementById("total-amount-display");
const resetBtn = document.getElementById("reset-button");

billInput.addEventListener("input", calculateTip);
peopleInput.addEventListener("input", calculateTip);

// Tip Button
tipButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const clickedButton = event.target;
    tipPercentage = clickedButton.dataset.tip;
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    clickedButton.classList.add("active");
    customTipInput.value = "";
    calculateTip();
  });
});

// Custom Tip Button
customTipInput.addEventListener("input", () => {
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  tipPercentage = null;
  calculateTip();
});

// Reset Button
resetBtn.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";
  tipPercentage = null;
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  tipAmountDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";
});

function calculateTip() {
  // Task no 1: Get raw string values from input elements
  const billValueStr = billInput.value;
  const peopleValueStr = peopleInput.value;
  const customTipValueStr = customTipInput.value;

  let selectedButtonTipStr = null;
  const activeButton = document.querySelector(".tip-percent-btn.active");
  if (activeButton) {
    selectedButtonTipStr = activeButton.dataset.tip;
  }

  // Task no 2: Convert string to numbers
  const billAmount = parseFloat(billValueStr);
  const numberOfPeople = parseFloat(peopleValueStr);
  const customTipPercent = parseFloat(customTipValueStr);
  const selectedButtonTipPercent = selectedButtonTipStr
    ? parseFloat(selectedButtonTipStr)
    : null;

  // Task no 3: Determine the actual tip percentage to use for calculation
  // Default value of 0
  let actualTipPercent = 0;

  // Check if the custom tip input has a valid, non-negative number
  // isNaN() checks if a value is (Not a Number)
  if (!isNaN(customTipPercent) && customTipPercent >= 0) {
    // Priority no 1: Use the valid custom tip percentage
    actualTipPercent = customTipPercent;
  }
  // Otherwise (if custom tip is invalid or empty), check the selected button
  else if (
    selectedButtonTipPercent !== null &&
    !isNaN(selectedButtonTipPercent) &&
    selectedButtonTipPercent >= 0
  ) {
    // Priority 2: Use the valid selected buttons tip percentage
    actualTipPercent = selectedButtonTipPercent;
  }

  // Validation
  const isbillValid = !isNaN(billAmount) && billAmount >= 0;
  let isTipValid = !isNaN(actualTipPercent) && actualTipPercent >= 0;
  let isPeopleValid =
    !isNaN(numberOfPeople) &&
    numberOfPeople > 0 &&
    Number.isInteger(numberOfPeople);

  // Task no 4: Calculate the total tip
  let totalTipAmount = 0;
  if (isbillValid && isTipValid) {
    // Only calculate if billAmount is a valid, non-negative number
    totalTipAmount = billAmount * (actualTipPercent / 100);
  }

  // Task no 5: Calculate the total bill amount (bill + tip)
  const totalBillAmount = billAmount + totalTipAmount;

  // Task no 6: Calculate the tip amount per person
  // start with a default value
  let tipAmountPerson = 0;
  let totalAmountPerPerson = 0;

  // 1. totalTipAmount is a valid number (!isNaN)
  // 2. numberOfPeople is a valid number (!isNaN)
  // 3. numberOfPeople is greater than 0 (positive)
  if (isbillValid && isTipValid && isPeopleValid) {
    // If inputs are valid, perform the division.
    tipAmountPerson = totalTipAmount / numberOfPeople;
    totalAmountPerPerson = totalBillAmount / numberOfPeople;
  } else {
    tipAmountPerson = 0;
    totalAmountPerPerson = 0;
  }

  // Task no 7. Format Results for Display
  tipAmountDisplay.textContent = `$${tipAmountPerson.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalAmountPerPerson.toFixed(2)}`;
}

// Initial calculation on page load
document.addEventListener("DOMContentLoaded", calculateTip);
