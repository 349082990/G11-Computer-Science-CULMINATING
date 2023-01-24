// Constants for pages
const LOGIN_PAGE = document.getElementById("login-form");
const MANAGER_PAGE = document.getElementById("password-manager");

// Constant for password chart div
PASSWORD_CHART = document.getElementById("password-table");

// Global variables for tracking
let currentUser = null;
let currentArray = null;

// Create an array to store the data for credentials. Starts off with 5 credentials
let credentials = [
    {site: "Google", username: "349082990@gapps.yrdsb.ca", password: 123456},
    {site: "Microsoft", username: "mrhsiung@gmail.com", password: "computerscience"},
    {site: "Vincent's Password Manager", username: "Vincent", password: "Vincent"},
    {site: "Mehmet.com", username: "Mehmet", password: "tottenhamspurs"},
    {site: "roblox.com", username: "OG_eren", password: "robloxgrandmaster"}
];

// Create an array to store the data for credentials under guest username
let guestCredentials = credentials;

// Create an array to store the data for credentials under the vincent username
let vincentCredentials = credentials;

// Create an array to store the data for credentials under the jeremy username
let hsiungCredentials = credentials;

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
    // Update the current array depending on who the current user is
    if (currentUser){
        if(currentUser === "guest"){
            currentArray = guestCredentials;
        }
        else if (currentUser === "vincent"){
            currentArray = vincentCredentials;
        }
        else if (currentUser === "jeremy"){
            currentArray = hsiungCredentials;
        }
        // Display the page
        displayPage();
    }

    // Alert the user if their login is invalid
    else{
        alert("Invalid Login! Please try again!");
    }
}

// Function to display webpage according to the current user
function displayPage(){
    LOGIN_PAGE.style.display = "none";
    MANAGER_PAGE.hidden = false;
    displaySites(currentArray);
}

// This function will display the pre-inputted passwords
function displaySites(array){
    // update currentArray to store the current array being viewed
    array = currentArray;
    // Set credentialsChart as an empty variable
    let credentialsChart = "";

    // Display all the credentials in the array
    for (const credentials of array){
        credentialsChart += `<tr><td>${credentials.site}<br>${credentials.username}</td>`;
    }

    // Update the HTML of the monster list 
    PASSWORD_CHART.innerHTML = credentialsChart;
}


// Function that is basically the same as the built-in "push" function, since we cannot use built-in functions. It pushes an element to the end of an array
function push(array, element){
    // The first parameter 'array' is the array to which the element will be added
    // The second parameter 'element' is the element to be added to the array
    // Assign the element to the next index position of the array, which is the current length of the array
    array[array.length] = element;
}