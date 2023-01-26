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
    {site: "roblox.com", username: "OG_eren (Mehmet's username)", password: "robloxgrandmaster"}
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
        username: "", 
        password: ""
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
    for (let i = 0; i < array.length; i++){
        credentialsChart += `<tr id="row-${i}"><td>${array[i].site}<br>${array[i].username}</td>`;
    }

    // Update the HTML of the monster list 
    PASSWORD_CHART.innerHTML = credentialsChart;

    // Add an event listener to each row of the table that listens for any click events
    for (let i = 0; i < array.length; i++){
        let row = document.getElementById(`row-${i}`);
        row.addEventListener("click", () => {
            // Create a pop up that will display when the user clicks on the row
            alert ("Username: " + array[i].username + "\nPassword: " + array[i].password);    
        });
    }
}

// Function for sorting arrays in alphabetical order
function sort(array, order){
    // Use nested for loops to implement the sorting algorithm
    for (let i = 0; i < array.length; i++){
        // Start at the next element
        for (let j = 1 + i; j < array.length; j++){
            // Store the index as the current site name in the iteration
            let currentIndexArray = array[i].site.toLowerCase();
            let nextIndexArray = array[j].site.toLowerCase();
            
            // If the is increasing, then use currentIndexArray > nextIndexArray
            // Otherwise ("decreasing in this case"), use currentIndexArray < nextIndexArray
            // Although it's not necessry, I used a chaining operator instead of if/else statements to shorten my code (this is something I recently learned).
            if (order === "increasing" ? currentIndexArray > nextIndexArray : currentIndexArray < nextIndexArray){

                // Compare the current index in the array to the next one
                // If the current array index  letter is after the next one in the alphabet, then swap the places
                let temporary = array[i];
                array[i] = array[j];
                array[j] = temporary;
            }
        }
    }

    // Call the function display all the login credentials (acts as a refresh)
    displaySites(array);
}

// Function that is basically the same as the built-in "push" function, since we cannot use built-in functions. It pushes an element to the end of an array
function push(array, element){
    // The first parameter 'array' is the array to which the element will be added
    // The second parameter 'element' is the element to be added to the array
    // Assign the element to the next index position of the array, which is the current length of the array
    array[array.length] = element;
}