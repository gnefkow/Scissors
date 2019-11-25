// THIS IS "Q"
// Link 314


// FIREBASE ----------  ----------  ----------  ----------  ----------  ----------  ----------  
     // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA25iaFhC-32dlRDVp3cNU385T2Mf2kUYA",
    authDomain: "rps-2-e7251.firebaseapp.com",
    databaseURL: "https://rps-2-e7251.firebaseio.com",
    projectId: "rps-2-e7251",
    storageBucket: "rps-2-e7251.appspot.com",
    messagingSenderId: "360439818809",
    appId: "1:360439818809:web:9c70575e7fb1bfab1ffbe8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    

    

    // Create a variable to reference the database
    var database = firebase.database();
    
//FIREBASE. ----------  ----------  ----------  ----------  ----------  ----------  ---------- //  


// CONNECTIONS ----------  ----------  ----------  ----------  ----------  ----------  ---------- //  
  var connectedRef = database.ref(".info/connected");
  var playerTable = database.ref("/players");
// CONNECTIONS ----------  ----------  ----------  ----------  ----------  ----------  ---------- //  







// A SHITLOAD OF DOM VARS ========== ========== ========== ========== ========== ========== ========== ========== //

// General HTML
  var bodyEl = document.getElementById("body");
    
// Rooms
  var waitingRoomEl = document.getElementById("waitingRoomContainer");
  var playSpaceEl = document.getElementById("playSpace");
      playSpaceEl.style.display = "none";
  var lockoutRoom = document.getElementById("lockoutRoom");
      lockoutRoom.style.display = "none";
    
// GLOBAL DOM ELEMENTS
  var startButton = document.getElementById("startButton");
      startButton.style.display = "none";
  var peopleInRoomEL = document.getElementById("peopleInRoom");
  var pageTabEl = document.getElementById("tabTitle");

// Waiting Room DOM
  var waitingRoomTitleText = document.getElementById("waitingRoom-titleText");
  var waitingRoomSubText = document.getElementById("waitingRoom-subText");

// LockoutRoom DOM
  var forceResetButton = document.getElementById("forceResetButton");

// Playspace DOM
  var playerNameEL;
    playerNameEl = document.getElementById("playerName");
      playerNameEl.style.display = "none";
  var opponentNameEl = document.getElementById("opponentName"); 
      opponentNameEl.style.display = "none";   
  var exitButton = document.getElementById("exitButton");
  var opponentDisplayChoiceEl = document.getElementById("opponent-displayChoice");
  var playerDisplayChoiceEl;
      playerDisplayChoiceEl = document.getElementById("player-displayChoice");
  var choiceButtonContainerEl = document.getElementById("choiceButtonContainer");
  var rButtonEl = document.getElementById("choiceButton-R");
  var pButtonEl = document.getElementById("choiceButton-P");
  var sButtonEl = document.getElementById("choiceButton-S");



// A GAMEPLAY VARS ========== ========== ========== ========== ========== ========== ========== ========== //


  var dbP1;
  var dbP2;
  var dbGameOn;

  var player = false;
  var opponent = false;
  var inGame = false;



// ---------- GAME STATUS ON LOAD / UPDATE ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- 


// GAME STATUS FROM FIREBASE
database.ref("/players").on("value", function(snapshot) {
  // Set this window to Firebase Values:
    dbP1 = snapshot.val().p1.inPlay;
    dbP2 = snapshot.val().p2.inPlay;
    p1 = snapshot.val().p1;
    p2 = snapshot.val().p2;
    dbGameOn = snapshot.val().dbGameOn;
    goToRoom();
    if (inGame == true) {
      updateOpponentChoiceDisplay()
    }
});

function goToRoom(){
  // Determines which room to load based on game state:
  if ( dbGameOn == true && inGame == true ){
    playGame();
  } else if ( dbGameOn == true && inGame == false ){
    lockedOut();
  } else {
    waitingRoom();
  }
}


// ---------- WAITING ROOM ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- 
  


// In the WAITING ROOM  
  function waitingRoom() {
    if (dbGameOn == false) {
      //Display Room:
        startButton.style.display = "block";
        waitingRoomEl.style.display = "block";
        playSpaceEl.style.display = "none";
        lockoutRoom.style.display = "none";
        bodyEl.style.backgroundColor = "#66D7C4";
        waitingRoomTitleText.textContent = "Scissors?";
        waitingRoomSubText.textContent = "Grab a friend, its time for some rock-paper-scissors!";
    } else {
      waitingRoomEl.style.display = "none";
    };
  };


// User clicks the start button
  startButton.onclick = definePlayer;

  var connectionP1 = database.ref("/players/p1/playerWindow");
  var con;

  // Defines Player 1 and 2
  function definePlayer() {
    if (p1.inPlay == false) {
      // Set the Player
        player = p1;
        opponent = p2;
        inGame = true;
        console.log(`You're ${player.name}`);
      // Update the Database:  
        database.ref("/players").update({
          dbP1 : true
        });
        database.ref(`/players/p1/inPlay`).set(true);
      // Change the Waiting Room:
        // waitingRoom();
        hideStartButton();
  } else if (p2.inPlay == false) {
      // Set the Player:
        player = p2;
        opponent = p1;
        inGame = true;
        console.log(`You're ${player.name}`);
      // Update the Database:
        database.ref("/players").update({
          dbP2 : true
        });
        database.ref(`/players/p2/inPlay`).set(true);
      // Time to start the game:
      goToRoom();
      gameSwitch();
  };
};

  function hideStartButton() {
    if (inGame == true) {
      startButton.style.display = "none";
      waitingRoomTitleText.textContent = "Hang on...";
      waitingRoomSubText.textContent = "Waiting for someone else to join.";
    }
  };

  function gameSwitch() {
    if (p1.inPlay == true && p2.inPlay == true) {
      database.ref("/players").update({
        dbGameOn : true
      });
    } else {
      database.ref("/players").update({
        dbGameOn : false
      });
    };
  };





// ---------- LOCKOUT ROOM ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- 


function lockedOut() {
    lockoutRoom.style.display = "block";
    playSpaceEl.style.display = "none";
    waitingRoomEl.style.display = "none";
    bodyEl.style.backgroundColor = "#333";
    forceResetButton.onclick = resetAll;
  };




// ---------- START GAME ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- 

// Updates the browser tab:
function changePageTab(){
  pageTabEl.textContent = `Beat ${opponent.name}!`;
}


// ---------- PLAY GAME ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- 

var playerChoice

function playGame() {
  // Change rooms:
    waitingRoomEl.style.display = "none";
    playSpaceEl.style.display = "block";
    bodyEl.style.backgroundColor = "#5DC2F2";
    displayPlayerName();  
    changePageTab();
    displayChoiceButtons();
    
  // Player makes her choice:
    rButtonEl.onclick = playerChoose;
    pButtonEl.onclick = playerChoose;
    sButtonEl.onclick = playerChoose;


  // Quit the game
  exitButton.onclick = endGame;
};

function displayPlayerName(){
    playerNameEl.style.display = "block";
    playerNameEl.textContent = `${player.name}.${player.score}`;
    opponentNameEl.style.display = "block";   
    opponentNameEl.textContent = `${opponent.name}.${opponent.score}`;
  // Display Player and Opponent Choices:  
    
    
}

function displayChoiceButtons(){ // THIS DOESN"T WORK
  database.ref(`/players/${player.identifier}/`).on("value", function(snapshot) {
    var pChoice = snapshot.val().choice;

    if (pChoice == "...") {
      console.log(`pChoice is ${pChoice}`);
      playerDisplayChoiceEl.style.display = "none";
      choiceButtonContainerEl.style.display = "block";
    } else {
      playerDisplayChoiceEl.textContent = pChoice;
      playerDisplayChoiceEl.style.display = "block";
      choiceButtonContainerEl.style.display = "none";
    }
  });
};

function updateOpponentChoiceDisplay() {
  database.ref(`/players/${opponent.identifier}/`).on("value", function(snapshot) {
    var oChoice = snapshot.val().choice;
    opponentDisplayChoiceEl.textContent = oChoice;
  })
};

function playerChoose(){
  database.ref(`/players/${player.identifier}/choice`).set("S");
  displayChoiceButtons();
}



// ---------- END GAME ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- 


function endGame() {
  console.log(`endGame ran`);
  database.ref("/players").update({
    dbGameOn : "gameOver"
  });
  resetAll();
}

function resetAll(){
  // Show results screen?
  player = false;
  opponent = false;
  inGame = false,
  playerTable.set({
    // dbP1 : false,
    // dbP2 : false,
    
    dbGameOn : false,
    p1 : {
      inPlay: false,
      identifier : "p1",
      name : "Ash",
      score : 0,
      choice : "...",
      playerWindow: false
    },
    p2 : {
      inPlay: false,
      identifier : "p2",
      name : "Gary",
      score : 0,
      choice : "...",
      playerWindow: false
    } 
  });
  goToRoom();
};















