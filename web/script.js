$(document).ready(function() {
  $(".sendMail").click(function() {
    console.log("fucl");
    var email = 'probaku1234@naver.com';
    var subject = 'Test';
    var emailBody = 'Hi Sample,';
    var attach = 'path';

    document.location = "mailto:" + email;
  });
});
