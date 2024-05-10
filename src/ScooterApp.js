// require the User and Scooter classes - see where they can be used in ScooterApp.js

class ScooterApp  {
  // ScooterApp code here
  constructor () {
    this.stations = { //an object represented scooter stations, keys are station names and values are arrays of scooters.
      "Station 1": [],
      "Station 2": [],
      "Station 3": []
    };
    this.registeredUsers = {}; //an object representing registered users, where the keys are the usernames the values are 'user' instances
  }
  registerUser (username, password, age){
    if (this.registeredUsers[username]){ // to check if a user with a given username exists in the registered user object, we use this syntax to check if there is a property in the registered users object with the key equal to the value of the username variable. 
      throw new Error ("User already registered")
    }
    if (age < 18){
      throw new Error ("User too young to register")
    }
    const newUser = new User(username, password, age);
    this.registeredUsers[username] = newUser;
    console.log(`${username} has been registered.`);
    return newUser; // if criteria has been met then a new user will be created
  }
  loginUser (username, password){
    const user = this.registeredUsers[username];
    if(!user || user.password !== password){
      throw new Error ("Username or password is incorrect"); // firstly finds the user from registered users, when no user or incorrect password error to be thrown
    }
    user.login(password);
    console.log (`${username} has been logged in.`); // when user is found and password correct it calls login method and console.logs a message to confirm
  }
logoutUser(username) {
  const user = this.registeredUsers[username];
  if (!user){
    throw new Error ("No such user is logged in"); //firstly retrieves the user from the registeredusers object - if no user found it will throw error
  }
  user.logout();
  console.log(`${username} is logged out`) // if user is found logout function is called and message output
}
createScooter(station){ //method creating a new scooter and adding it at a specific station
  if (!this.stations[station]){ //begins by checking if the station exisits within the stations object within the scooter app
    throw new Error("No such station");
  }
  const newScooter = new Scooter(station); //if the station exists then a new scooter will be created 
  this.stations[station].push(newScooter); // the new scooter will then be added to the array of scooters within the station
  console.log("Created new scooter");
  return newScooter;
}
dockScooter (scooter, station){ // This method socks a scooter at the specified station
  const station = this.stations[station];
  if (!station){  // it checks if provided station exists
    throw new Error ("No such station");
  }
  if (station.includes(scooter)){ // checks if scooter already at station
    throw new Error ("Scooter already at station")
  }
  scooter.dock(station); // if both condictions met it will call the dock method to dock the scooter at the station
  console.log("Scooter is docked");
}
rentScooter(scooter, user){
  if (scooter.user){
    throw new Error ("Scooter already rented"); //it checks if the scooter is available for rent if not already rented 
  }
  scooter.rent(user); //if the scooter is available it calls the rent method of the scooter
  console.log("Scooter is rented.")
}
print() { //logs the list of registered users and stations with the number of scooters at each 
  console.log("Registered Users:");
  console.log(this.registeredUsers);

  console.log("\nStations and Scooters"); //the '/n' within the string is an escape sequence. it signifies the start of a new line in the output. It is used to insert a line break between the lift of registered users and the information on stations/scooters
  for (const station in this.stations){
    console.log(`${station}: ${this.stations[station].length} scooters`) //this goes over each station in the 'stations' object and logs the station name along with the number of scooters in the station.
  }
}
}

module.exports = ScooterApp
