// form_validation.js

// DOM elements
let cachedElements = {};

function cacheDOMElements(formSelector){
    const { form, inputs } = getFormElements(formSelector);
    cachedElements = { form, inputs };
}

function getFormElements(formSelector){
    const form = document.querySelector(formSelector);
    const inputs = form.querySelectorAll('input, textarea, select');
    return { form, inputs };
}

function getErrorElement(input) {
    return input.nextElementSibling;
}

// initialize validation
export function initializeFormValidation(formSelector) {
    cacheDOMElements(formSelector);
    const { inputs } = cachedElements;

    // Bind event listeners to each input element
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
            if (input.id === 'password' || input.id === 're_password') {
                validateConfirmPassword();
            }
        });
    });

    // Handle form submission
    handleFormSubmission();
}

// Handle form submission
function handleFormSubmission(){
    const { form } = cachedElements;

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form from submitting if validation fails
    
        let valid = true;
    
        const { inputs } = cachedElements;
        // Validate each input
        inputs.forEach(input => {
            if (!validateInput(input)) valid = false;
        });
    
        // Also validate confirm password
        if (!validateConfirmPassword()) valid = false;

        // If valid, call a function to handle form submission
        if (valid) {
            // Handle form submission here
        }
    });
}

// check validity of input
function validateInput(input) {
    const error = getErrorElement(input);
    if (input.validity.valid) {
        error.textContent = '';
        error.className = 'error';
        return true;
    } else {
        showError(input);
        return false;
    }
}

// check password and reconfirmed password
function validateConfirmPassword() {
    const { form } = cachedElements;
    const password = form.querySelector('#password');
    const confirmPassword = form.querySelector('#re_password');
    const error = form.querySelector('#re_password + .error');
    console.log(error);

    if (password && confirmPassword && password.value !== confirmPassword.value) {
        error.textContent = 'Passwords do not match.';
        error.className = 'error active';
        return false;
    } else {
        error.textContent = '';
        error.className = 'error';
        return true;
    }
}

// display error message
function showError(input) {
    const error = input.nextElementSibling;
    if (input.validity.valueMissing) {
        error.textContent = `${input.dataset.label || input.previousElementSibling.textContent} is required.`;
    } else if (input.validity.tooShort) {
        error.textContent = `Minimum of ${input.minLength} characters.`;
    } else if (input.validity.rangeUnderflow) {
        error.textContent = `Minimum value is ${input.min}.`;
    } else if (input.validity.patternMismatch) {
        if (input.type === 'password') {
            error.textContent ='Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long.';
        } else if(input.type === 'tel') {
            error.textContent = `Must be a number and at least 10 digits long.`;
        } else {
            error.textContent = 'Invalid format.'
        }
    } else if (input.validity.typeMismatch) {
        error.textContent = 'Invalid email address';
    }
    error.className = 'error active';
}


// html component example

/** 
<form method="post" id="create-account" novalidate>
<fieldset class="signup-form">
    <legend>Let's get you started!</legend>
    <label for="first_name">FIRST NAME <br>
        <input type="text" id="first_name" placeholder="eg. John" name="first_name" data-label="First name"  minlength="2" required>
        <span class="error" aria-live="polite"></span>
    </label>    
    <label for="last_name">LAST NAME<br>
        <input type="text" id="last_name" placeholder="eg. Smith" name="last_name" data-label="Last name" minlength="2" required>
        <span class="error" aria-live="polite"></span>
    </label>
    <label for="email_address">EMAIL<br>
        <input type="email" id="email_address" placeholder="eg. john.smith@gmail.com" name="email_address" data-label="Email address"  required>
        <span class="error" aria-live="polite"></span>
    </label>
    <label for="phone_number">PHONE NUMBER<br>
        <input type="tel" id="phone_number" placeholder="eg. 0423234252" name="phone_number" pattern="[0-9]{10,}" data-label="Phone number" required>
        <span class="error" aria-live="polite"></span>
    </label>
    <label for="password">PASSWORD<br>
        <input type="password" id="password" placeholder="***********" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" data-label="Password" required >
        <span class="error" aria-live="polite"></span>
    </label>
    <label for="re_password">CONFIRM PASSWORD<br>
        <input type="password" id="re_password" placeholder="***********" name="re_password" data-label="Password confirmation" required>
        <span class="error1" aria-live="polite"></span>
    </label>
</fieldset>
<div class="signup-footer">
    <button type="submit" form="create-account" class="btn btn--primary">Create account</button>
    <p>Already have an account? <a href="#">log in</a></p>
</div>
</form>
*/