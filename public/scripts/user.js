// User object for registration
class User {
    constructor(firstName, lastName, username, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

// Login object
class Login {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

// Register function
async function register(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const newUser = new User(firstName, lastName, username, email, password);

    try {
        const response = await fetch("/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        console.log("Registered User:");
        console.log(data);

        localStorage.setItem("loggedInUser", JSON.stringify(data));

        alert("Registration successful!");
        window.location.href = "post.html";

    } catch (err) {
        console.error("Register error:", err);
        alert("Something went wrong while registering.");
    }
}

// Login function
async function login(event) {
    event.preventDefault();

    const email = document.getElementById("user").value;
    const password = document.getElementById("loginPassword").value;

    const loginUser = new Login(email, password);

    try {
        const response = await fetch("/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginUser)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        console.log("Logged In User:");
        console.log(data);

        localStorage.setItem("loggedInUser", JSON.stringify(data));

        alert("Login successful!");
        window.location.href = "post.html";

    } catch (err) {
        console.error("Login error:", err);
        alert("Something went wrong while logging in.");
    }
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