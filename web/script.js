$(document).ready(function() {
  var toggle = 0;
  var prjNum;

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
  var storageRef = firebase.storage().ref();

  // Authenticate by email and password
  firebase.auth().signInWithEmailAndPassword("probaku1234@naver.com", "qazwsxedC1").catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // alert error message
    alert("errorCode : " + errorCode + ", message : " + errorMessage);
  });

  // Set the number of project
  firebase.database().ref('/projectNum').once('value', function(snapshot) {
    prjNum = snapshot.val();
    console.log("projectNum : " + prjNum);
  });

  for (var i = 0; i < prjNum; i++) {
    // TODO: Read proejct data and make project div
    /*
    downloadREADMEFile(storageRef, i);
    */
  }

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
      if (token == input) {
        alert("Authentication Success");
        $('.datainputDiv').css('display', 'block');
      } else {
        alert("Authentication Failed : " + input);
      }
    });
  });

  // when menu button click, toggle modal page
  $(".menuWrapper").click(function() {
    this.classList.toggle("change");
    if (toggle == 0) {
      $(".modal").fadeIn();
      $('.projectindexBtnWrapper').css('display', 'none');
      toggle = 1;
    } else {
      $(".modal").fadeOut();
      $('.projectindexBtnWrapper').css('display', 'table');
      toggle = 0;
    }
  });

  // when click proejct btn, go to project div
  $("#projectbtn").click(function() {
    $(".modal").fadeOut();
    toggle = 0;
    document.getElementsByClassName("menuWrapper")[0].classList.toggle("change");
    var x = document.getElementsByClassName("project");
    x[0].scrollIntoView(true);
  });

  // when click datainputBtn, upload README.md file
  $("#datainputBtn").click(function() {
    $('#start').append("<li><span>fuck</span></li>"); // Create Index button

    var fileObject = document.getElementById("fileinput");
    var projectUrl = document.getElementById("urlinput").value;

    // TODO: upload file to firebase
    if (fileObject.files.length != 0 && projectUrl != "") {
      // TODO: Save project url
      firebase.database().ref('/' + prjNum).set(projectUrl);


      var uploadTask = storageRef.child('md/' + prjNum + 'README.md').put(fileObject.files[0]);

      uploadTask.on('state_changed', function(snapshot) {
          console.log("pikapika");
          }, function(error) {
            console.log(error);
          }, function() {
            console.log("Successfully uploaded to firebase");
          }
      );

      // TODO: Read README.md file and display to proejct div
      downloadREADMEFile(storageRef, prjNum);

      prjNum++;
      // TODO: update prjNum
      var update = {};
      update['/projectNum'] = prjNum;
      firebase.database().ref().update(update);
    } else {
      alert("Please select the file and input the project url");
    }


  });

  // when click contact btn, go to footer div
  $("#contactbtn").click(function() {
    $(".modal").fadeOut();
    toggle = 0;
    document.getElementsByClassName("menuWrapper")[0].classList.toggle("change");
    var x = document.getElementsByClassName("footer");
    x[0].scrollIntoView(true);
  });
});

// when input data in admin section, create div in test div and index button in proejctbtn div
function displayInfo(url, index) {
  $.ajax({
    url: url,
    context: document.body,
    success: function(mdText) {
      //where text will be the text returned by the ajax call
      var converter = new showdown.Converter();
      var htmlText = converter.makeHtml(mdText);
      firebase.database().ref('/' + index).once('value', function(snapshot) {
        $(".project").append("<a name='" + index + "'></a><div class='outputDiv'>" + htmlText + "<a href='" + snapshot.val() + "'><p class='projectLink'>GO TO PROJECT</p></a></div>"); //append this to a div with class outputDiv
      });
    },
    error: function(request, status, error) {
      alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });
}

function downloadREADMEFile(storageRef, prjNum) {
  storageRef.child('md/' + prjNum + 'README.md').getDownloadURL().then(function(url) {
    displayInfo(url, prjNum);
  }).catch(function(error) {
    conlsole.log(error);
  });
}

function getProjectURL(index) {
  firebase.database().ref('/' + index).once('value', function(snapshot) {
    var projecturl = snapshot.val();
  });
}
