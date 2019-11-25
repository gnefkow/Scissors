// Add user to the Connection List:
    // var connectedRef = database.ref(".info/connected");
    // connectedRef.on("value", function(snap) {
    //   // If they are connected..
    //   if (snap.val()) {
    //     // Add user to the connections list.
    //     var con = connectionsRef.push(true);
    //     // Remove user from the connection list when they disconnect.
    //     con.onDisconnect().remove();
    //   }
    // });

  // Display the number of people on the Connections List:
    // connectionsRef.on("value", function(snapshot) {
    //   console.log(snapshot);
    // // The number of online users is the number of children in the connections list.
    // peopleInTheRoom = snapshot.numChildren();
    // peopleInRoomEL.textContent= peopleInTheRoom;
    // console.log(`Bouncer: "there are ${peopleInTheRoom} people in the room."`)

    // return peopleInTheRoom;
    // });



    // DOM ELEMENTS
    // Page Tab
    // Waiting Room
    // Game Play
  // PLAY ELEMENTS
    // Player-1;
      // Name
      // score
    // Player-2;
      // Name
      // Score
      // iAmPlayer (this is either Player-1 or Player-2)
      // define opponent (this is the other Player-1 or Player-2)


// BOUNCER:
    
    // is PLAYER-1 && PLAYER-2 defined?
      // if not both: waitingRoom();
      // if both: gamePlay();

    


// MECHANICAL FUNCTIONS 
  //in-game  
    // clear the PLAYER and OPPONENT "current selections"
    // update score
  // End-Game
    // clear the players scores
    // clear player names



// WAITING ROOM ---------------
  // function waitingRoom(){}
    // Presence - how many players (stop if it reaches 2)
    // function defineMe(){ var iAm = (if there is a player-1), player becomes player-2. Else, {becomes player-1}
      // database.ref("p-1").set(.....)
  // On click logs the player as 1 or 2



// PLAY SPACE ----------------
    // vars for elements
    // get values from firebase
      // display scores

    // PLAY
      // Listen for opponent's choice
      // Display options for the user (R, P, S buttons)
      // on click > log choice to firebase
      // if both PLAYER and OPPONENT have selections (true), then:
        // Display result
        // add to score
        // display "Replay" button
