// Constants for pages
const LOGIN_PAGE = document.getElementById("login-form");
const MANAGER_PAGE = document.getElementById("password-manager");
const ADD_PAGE = document.getElementById("add-credentials");

// Constant for divs
const PASSWORD_CHART = document.getElementById("password-table");
const PASSWORD_GENERATOR = document.getElementById("random-password");

// Constants for buttons
const LOGIN_BUTTON = document.getElementById("login-button");
const FAVOURITES = document.getElementById("favourite-items");

// Constant for search input
const INPUT = document.getElementById("filter-input");

// Global variables for tracking
let currentUser = null;
let currentArray = null;
let currentFullArray = null;

// Create an array to store the data for credentials. Starts off with 5 credentials
let credentials = [
    {site: "Google", username: "349082990@gapps.yrdsb.ca", password: 123456},
    {site: "Microsoft", username: "mrhsiung@gmail.com", password: "computerscience"},
    {site: "Vincent's Password Manager", username: "Vincent", password: "Vincent"},
    {site: "Mehmet.com", username: "Mehmet", password: "tottenhamspurs"},
    {site: "roblox.com", username: "OG_eren (Mehmet's username)", password: "robloxgrandmaster"},
    {site: "yahoo.com", username: "yahoo", password: "com"},
    {site: "website.com", username: "username", password: "password"}
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
    const USERNAME = document.getElementById("username").value.toLowerCase();
    const PASSWORD = document.getElementById("password").value.toLowerCase();

    // Check if the user and password match the correct values
    for (const user in LOGINS){
        if(LOGINS[user].username === USERNAME && LOGINS[user].password === PASSWORD){
            currentUser = user;
            break;
        }
    }

    // If the login is valid, then remove the login screen and display 
    // Update the current array depending on who the current user is
    if (currentUser){
        if(currentUser === "guest"){
            currentArray = guestCredentials;
            currentFullArray = guestCredentials;
        }
        else if (currentUser === "vincent"){
            currentArray = vincentCredentials;
            currentFullArray = vincentCredentials;
        }
        else if (currentUser === "jeremy"){
            currentArray = hsiungCredentials;
            currentFullArray = hsiungCredentials;
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

        // Add event listener to trakc changes in checkbox
        checkbox.addEventListener("change", () => {
            //  Checks if checkbox is checked
            if (checkbox.checked){

                // Check if the element already exists in the array
                let index = checkedCredentials.indexOf(array[i]);

                // If the element does not exist in the array, add it
                if (index === -1) {
                    push(checkedCredentials, array[i]); 
                }
            }
            // Otheriwse, remove the index from the array
            else{
                let index = checkedCredentials.indexOf(array[i]);
                    if(index > -1){
                        checkedCredentials.splice(index, 1);
                    }
            }
        });
    }
}

// Function for displaying the add page
function displayCredentials(){
    ADD_PAGE.hidden = false;
}
// Function for adding credentials to the password manager
function addCredentials(){
    // Get the values for the new credentials from inputs
    // Constants lower case here, otherwise it wouldn't work (for my syntax)
    const site = document.getElementById("site").value;
    const username = document.getElementById("name").value;
    const password = document.getElementById("pass").value;

    // Intialize an empty variable for the new object
    const newCredential = {site, username, password};

    // Initialize an empty variable for isAdded
    let isAdded;

    // Iterate through the array
    for (let i = 0; i < credentials.length; i++){
        // Check if the element already exists int he array
        if (credentials[i].site.toLowerCase() === newCredential.site.toLowerCase() && credentials[i].username.toLowerCase() === newCredential.username.toLowerCase() && credentials[i].password.toLowerCase() === newCredential.password.toLowerCase()){
            // If it does exist, set the variable of isAdded to the current index and end the loop
            isAdded = credentials[i];
            break;
        }
    }
    // If isAdded is true or any of the values are 0, then alert Invalid and hide the page
    if (isAdded || site.length === 0 || username.length ===  0 || password  .length === 0){
        alert("Invalid");
        ADD_PAGE.hidden = true;
    }   
    // Otherwise, add the newcredential to the end of the credentials array and hide the page.
    else{
        push(credentials, newCredential);
        ADD_PAGE.hidden = true;
        // If the current array is equal to the credentials array, then display the current array
        if (currentArray == credentials){
            displaySites(currentArray);
        }
    }
}
// Function for partial search
function search(){
    // Get input value
    let searchInput = INPUT.value;
    // Initialize an empty array so the search results can be stored
    let matchArray = [];
    // Iterate through the current array
    for (let i = 0; i < currentArray.length; i++){
        // Check if the input value is a substrnig of any of the usernames, sites, or passwords
        if (currentArray[i].site.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1){
            // If yes, then push to the matchingarray array
            push(matchArray, currentArray[i]);
        }
    }
    // Display the current array
    displaySites(matchArray);
}

// Event listener to call search function
INPUT.addEventListener("input", () => {
    search();
});

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

// Function for sorting arrays in alphabetical order (technically 2 algorithms here)
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

// Function to display password generator
function displayPasswordGenerator(){
    PASSWORD_GENERATOR.hidden = false;
    // Disable the button
    document.getElementById("generator-button").disabled = true;
}

// Function to generate random password
function generatePassword() {
    // Get the minimum and maximum length from the input
    const MINIMUM = Number(document.getElementById("min-length").value);
    const MAXIMUM = Number(document.getElementById("max-length").value);

    // Check to see if the minimum length is equal to the maximum length
    if (MINIMUM > MAXIMUM || isNaN(MINIMUM) || isNaN(MAXIMUM) || MINIMUM <= 0 || MAXIMUM <= 0){
        alert("Invalid!");
        return;
    }

    // Create a string for all possible characters that can be used for the password
    let characters = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()-_=+`~[];:/?.>,<|";

    // Create an empty string that stores the password
    let randomPassword = "";

    // Get the random length for the password, which would be between the min and max
    let randomLength = Math.floor(Math.random() * (MAXIMUM - MINIMUM + 1)) + MINIMUM;

    // Use a while loop to add the randomc haracters to the password until it reaches the randomLength
    while (randomPassword.length < randomLength){
        // Get a random index from the characters string
        let randomIndex = Math.floor(Math.random() * characters.length);
        // Add the character to the password
        randomPassword += characters[randomIndex];
    }
    // Display password
    document.getElementById("password-random").innerText = randomPassword;
}

// Function that is basically the same as the built-in "push" function, since we cannot use built-in functions. It pushes an element to the end of an array
function push(array, element){
    // The first parameter 'array' is the array to which the element will be added
    // The second parameter 'element' is the element to be added to the array
    // Assign the element to the next index position of the array, which is the current length of the array
    array[array.length] = element;
}