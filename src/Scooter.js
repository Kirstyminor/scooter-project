class Scooter {
  // scooter code here
  static nextSerial = 1;
  constructor (station, user, serial, nextSerial, charge, isBroken){
    this.station = station;
    this.user = null; //Scooter is not checked out to any user initially
    this.serial = Scooter.nextSerial++; //increments the nextSerial static property of the Scooter class each time a new scooter is created.
    this.charge = 100; //Represents the battery charge level of the scooter, ranging from 0 (completely discharged) to 100 (fully charged). Initially, the scooter is fully charged.
    this.isBroken = false; // Represents whether the scooter is in a broken state (true) or not (false). Initially, the scooter is in a good state and not broken.
  }
  // This method is called when a user wants to rent the scooter.
  rent (user){
    if (this.charge > 20 && !this.isBroken){
      this.station.removeScooter(this);
      this.user = user; //assigns the scooter to the user 
      this.station = null; //sets the station of the scooter to null to indicate that the scooter has been checked out
    } 
    else {
      if (this.charge <= 20){
        throw new Error ("Scooter needs to charge or Scooter needs repair")
      }
    }
  }
  //this method is called when the user returns the scooter back to the station
dock (station){
  this.user = null; // resets user to null to indicate that the scooter is no longer checked out
  this.station = station //assigns scooter to the specific station
}
}

module.exports = Scooter
