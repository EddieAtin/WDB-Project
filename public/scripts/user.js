// User object for registration
class User {
    constructor(firstname, lastname, email, username, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}

// Login object
class Login {
    constructor(user, password) {
        this.user = user;
        this.password = password;
    }
}

// Register function
function register(event) {
    event.preventDefault();

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const newUser = new User(firstname, lastname, email, username, password);

    console.log("Registered User Object:");
    console.log(newUser);
}

// Login function
function login(event) {
    event.preventDefault();

    const user = document.getElementById("user").value;
    const password = document.getElementById("loginPassword").value;

    const loginUser = new Login(user, password);

    console.log("Login Object:");
    console.log(loginUser);
}

// Add event listener for register form if it exists on the page
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", register);
}

// Add event listener for login form if it exists on the page
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", login);
}