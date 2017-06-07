$(document).ready(function() {
  var toggle = 0;

  $(".sendMail").click(function() {
    console.log("fucl");
    var email = 'probaku1234@naver.com';
    var subject = 'Test';
    var emailBody = 'Hi Sample,';
    var attach = 'path';
    document.location = "mailto:" + email;
  });

  $("#authenBtn").click(function() {
    var key = prompt("Please enter the key", "key");
  });

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
});
