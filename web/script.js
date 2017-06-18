$(document).ready(function() {
  var toggle = 0;
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDn62-NVZ4eWNAY1D-z0B6LaHey26N5xFM",
    authDomain: "ffasdf-b8ffc.firebaseapp.com",
    databaseURL: "https://ffasdf-b8ffc.firebaseio.com",
    projectId: "ffasdf-b8ffc",
    storageBucket: "ffasdf-b8ffc.appspot.com",
    messagingSenderId: "1079610735369"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithEmailAndPassword("probaku1234@naver.com", "qazwsxedC1").catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    alert("errorCode : " + errorCode + ", message : " + errorMessage);
  });


// when send button click, open default email client
  $(".sendMail").click(function() {
    console.log("fucl");
    var email = 'probaku1234@naver.com';
    var subject = 'Test';
    var emailBody = 'Hi Sample,';
    var attach = 'path';
    document.location = "mailto:" + email;
  });

  // when authenticate button click, check the key
  // if the key is right, show the input data page in admin section
  $("#authenBtn").click(function() {
    var input = prompt("Enter the key", "key");

    firebase.database().ref('/token').once('value', function(snapshot) {
      var token = snapshot.val();
      if (token == input)
      {
        alert("Authentication Success");
      }
      else
      {
        alert("Authentication Failed : " + input);
      }
    });
  });

  // when menu button click, toggle modal page
  $(".menuWrapper").click(function() {
    this.classList.toggle("change");
    if (toggle == 0)
    {
      $(".modal").fadeIn();
      toggle = 1;
    }
    else
    {
      $(".modal").fadeOut();
      toggle = 0;
    }
  });

  // when click proejct btn, go to project div
  $("#projectbtn").click(function() {

  });

  // when click contact btn, go to footer div
  $("#contactbtn").click(function() {

  });
});

// when input data in admin section, create div in test div and index button in proejctbtn div
function displayInfo() {

}
