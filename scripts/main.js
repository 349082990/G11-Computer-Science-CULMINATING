// Constants for pages
const LOGIN_PAGE = document.getElementById("login-form");
const MANAGER_PAGE = document.getElementById("password-manager");
const ADD_PAGE = document.getElementById("add-credentials");

// Constant for password chart div
PASSWORD_CHART = document.getElementById("password-table");

// Constants for buttons
LOGIN_BUTTON = document.getElementById("login-button");
FAVOURITES = document.getElementById("favourite-items");


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

// Create an array to store checked data
let checkedCredentials = [];    

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
        credentialsChart += `<tr><td><input type='checkbox' id="checkbox${i}"></td><td id="link${i}">${array[i].site}<br>${array[i].username}</td>`;
    }

    // Update the HTML of the monster list 
    PASSWORD_CHART.innerHTML = credentialsChart;

    // Add an event listener to each row of the table that listens for any click events
    for (let i = 0; i < array.length; i++){
        let link = document.getElementById(`link${i}`);
        let checkbox = document.getElementById(`checkbox${i}`);

        link.addEventListener("click", () => {
            // Create a pop up that will display when the user clicks on the row
            alert ("Username: " + array[i].username + "\nPassword: " + array[i].password);    
        });

        checkbox.addEventListener("change", () => {
            if (checkbox.checked){

                // Check if the element already exists in the array
                let index = checkedCredentials.indexOf(array[i]);

                // If the element does not exist in the array, add it
                if (index === -1) {
                    push(checkedCredentials, array[i]); 
                }
            }
            else{
                let index = checkedCredentials.indexOf(i);
                    if(index > -1){
                        checkedCredentials.splice(index, 1);
                    }
            }
        });////
    }
}

function displayCredentials(){
    ADD_PAGE.hidden = false;
}
// Function for adding credentials to the password manager
function addCredentials(){
    // Get the values for the new credentials from inputs
    const site = String(document.getElementById("site").value);
    const username = String(document.getElementById("username").value);
    const password = String(document.getElementById("password").value);

    // Intialize an empty variable for the new object
    const newCredential = {site, username, password};

    // Initialize an empty variable for isAdded
    let isAdded;

    // Iterate through the array
    for (let i = 0; i < credentials.length; i++){
        // Check if the element already exists int he array
        if (credentials[i].site.toLowerCase() === newCredential.site.toLocaleLowerCase() && credentials[i].username.toLocaleLowerCase() === newCredential.username.toLocaleLowerCase() && credentials[i].password.toLowerCase() === newCredential.password.toLocaleLowerCase()){
            isAdded = credentials[i];
            break;
        }
        if (isAdded || username.length === 0 || site.length ===  0 || password.length === 0){
            alert("Invalid");
        }
        else{
            push(credentials, newCredential);
            currentArray = credentials;
            displaySites(currentArray);
        }
        
    }
}

// Function for showing the full array
function showAll(){
    currentArray = credentials;
    displaySites(currentArray);
    FAVOURITES.disabled = false;
}

// Function for adding checkkedCredentials to favourites array
function addFavourites(){
    currentArray = checkedCredentials;
    displaySites(currentArray);
    FAVOURITES.disabled = true;
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

// // Function to create eventlistener when enter key is pressed (weird name, but it means that it can enter something by pressing enter. I couldn't think of a better name)
// function enterByEnter(){
//     // Initialize an element variable and set it to get the element of whatever id is in the parameter
//     let element = document.getElementById("login-button");
//     // Run if it fits under a condition
//     if (LOGIN_PAGE.style.display !== "none"){
//         // Add event listener under conditons
//         element.addEventListener("keydown", (event) => {
//             // Checks to see if the enter key is pressed (keydown). If it is, then a a button with an id is clicked
//             if (event.code === "Enter"){
//                 element.click();
//             }
//         });
//     }
// }

// setInterval(enterByEnter(), 100);