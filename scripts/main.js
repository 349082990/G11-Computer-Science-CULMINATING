// Constants for pages
const LOGIN_PAGE = document.getElementById("login-form");
const MANAGER_PAGE = document.getElementById("password-manager");

// Global variables for tracking
let currentUser = null;

// Constants for login credentials. This is put into an object data type
const LOGINS = {
    guest: {    // Guest login credentials
        username: "guest", 
        password: "1234"
    },
    vincent: {  // my login credentials
        username: "vincent",
        password: "zheng"
    },
    jeremy: {   // your login credentials
        username: "jeremy",
        password: "hsiung"
    }
};

// Function to handle the login of the website
function login(){
    // Get the username and password in lowercase values from the textbox. Logins are not case sensitive
    const username = document.getElementById("username").value.toLowerCase();
    const password = document.getElementById("password").value.toLowerCase();

    // Check if the user and password match the correct values
    for (const user in LOGINS){
        if(LOGINS[user].username === username && LOGINS[user].password === password){
            currentUser = user;
            break;
        }
    }

    // If the login is valid, then remove the login screen and display 
    if (currentUser){
        LOGIN_PAGE.style.display = "none";
        MANAGER_PAGE.hidden = false;
        console.log(currentUser);
    }

    // Alert the user if their login is invalid
    else{
        alert("Invalid Login! Please try again!");
    }
}

// Function to display webpage according to the current user
function displayPage(){
    if (currentUser === "guest"){
        
    }
}