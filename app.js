document.getElementById("loan-form").addEventListener("submit", function(e) {
  e.preventDefault();
  // Hide Resuts
  document.getElementById("results").style.display = "none";
  // Show Loader
  document.getElementById("loading").style.display = "block";
  setTimeout(calculateResults, 1000);
});

function calculateResults() {
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");
  // Calculations
  const principal = parseFloat(amount.value); // User input text converted to a float
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;
  // Compute Monthly Payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = `£${monthly.toFixed(2)}`; // 2 decimal places
    totalPayment.value = `£${(monthly * calculatedPayments).toFixed(2)}`;
    totalInterest.value = `£${(
      monthly * calculatedPayments -
      principal
    ).toFixed(2)}`;
    // Show Results
    document.getElementById("results").style.display = "block";
    // Hide Loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your figures");
  }
}

// Show Error
function showError(error) {
  // Show Results
  document.getElementById("results").style.display = "none";
  // Hide Loader
  document.getElementById("loading").style.display = "none";

  // Create <div>
  const errorDiv = document.createElement("div");
  // Get the relevant elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  // Create class for <div>
  errorDiv.className = "alert alert-danger";
  // Create text node and append to <div>
  errorDiv.appendChild(document.createTextNode(error));
  // Insert error above the heading
  card.insertBefore(errorDiv, heading);
  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
  document.querySelector(".alert").remove();
}
