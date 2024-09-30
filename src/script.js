// DOM Elements for Inputs
const ageForm = document.getElementById("ageForm");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

// DOM Elements for Error Display
const dayError = document.getElementById("dayError");
const monthError = document.getElementById("monthError");
const yearError = document.getElementById("yearError");

// DOM Elements for Result Display
const resultContainer = document.getElementById("result");
const resultYears = document.getElementById("years");
const resultMonths = document.getElementById("months");
const resultDays = document.getElementById("days");

// Event Listener for Form Submission
ageForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload on form submit
    
    // Step 1: Reset any previous error messages
    resetErrors();

    // Step 2: Parse and get the values from the form inputs
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    // Step 3: Validate the input values
    if (!validateInputs(day, month, year)) return; // If validation fails, stop further execution

    // Step 4: Create Date objects for the birth date and current date
    const birthDate = new Date(year, month - 1, day); // month - 1 because months in JS start from 0
    const today = new Date();

    // Step 5: Ensure that the birth date is in the past
    if (birthDate > today) {
        yearError.textContent = "Date must be in the past";
        return;
    }

    // Step 6: Calculate the age based on the birth date and current date
    const { years, months, days } = calculateAge(birthDate, today);

    // Step 7: Display the calculated result
    displayResult(years, months, days);
});

/**
 * Resets any previous error messages.
 */
const resetErrors = () => {
    dayError.textContent = "";
    monthError.textContent = "";
    yearError.textContent = "";
};

/**
 * Validates the day, month, and year input values.
 * 
 * @param {number} day - The day of birth
 * @param {number} month - The month of birth
 * @param {number} year - The year of birth
 * @returns {boolean} - True if all inputs are valid, false otherwise
 */
const validateInputs = (day, month, year) => {
    let isValid = true; // Flag to track validation status

    // Validate day input (1-31)
    if (isNaN(day) || day < 1 || day > 31) {
        dayError.textContent = "Please enter a valid day between 1 and 31.";
        isValid = false;
    }

    // Validate month input (1-12)
    if (isNaN(month) || month < 1 || month > 12) {
        monthError.textContent = "Please enter a valid month between 1 and 12.";
        isValid = false;
    }

    // Validate year input (should be less than or equal to current year)
    if (isNaN(year) || year > new Date().getFullYear() || year < 1000) {
        yearError.textContent = "Please enter a valid year.";
        isValid = false;
    }

    // Additional validation for date accuracy (e.g., 31st April should be invalid)
    if (isValid && !isValidDate(day, month, year)) {
        dayError.textContent = "The date entered is not valid.";
        isValid = false;
    }

    return isValid;
};

/**
 * Checks if the entered date is a valid date.
 * 
 * @param {number} day - The day of birth
 * @param {number} month - The month of birth
 * @param {number} year - The year of birth
 * @returns {boolean} - True if the date is valid, false otherwise
 */
const isValidDate = (day, month, year) => {
    const testDate = new Date(year, month - 1, day);
    return testDate.getFullYear() === year && testDate.getMonth() === month - 1 && testDate.getDate() === day;
};

/**
 * Calculates the age based on the birth date and today's date.
 * 
 * @param {Date} birthDate - The date of birth
 * @param {Date} today - The current date
 * @returns {Object} - Object containing the years, months, and days of age
 */
const calculateAge = (birthDate, today) => {
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // Adjust if the day of the current month is less than the birth day
    if (ageDays < 0) {
        ageMonths--;
        ageDays += daysInMonth(today.getMonth() - 1, today.getFullYear());
    }

    // Adjust if the current month is earlier than the birth month
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    return { years: ageYears, months: ageMonths, days: ageDays };
};

/**
 * Returns the number of days in a given month.
 * 
 * @param {number} month - The month number (0-11)
 * @param {number} year - The year to consider (for leap year calculation)
 * @returns {number} - Number of days in the month
 */
const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate(); // Gets the last date of the month
};

/**
 * Displays the calculated age in years, months, and days.
 * 
 * @param {number} years - The calculated years of age
 * @param {number} months - The calculated months of age
 * @param {number} days - The calculated days of age
 */
const displayResult = (years, months, days) => {
    resultYears.textContent = `${years} years`;
    resultMonths.textContent = `${months} months`;
    resultDays.textContent = `${days} days`;

    resultContainer.classList.remove("hidden"); // Show the result container
};
