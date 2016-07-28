function register() {
  const email = document.getElementById("email").value;
  const url = "http://emailether.info:2777/send_email";
  var regLabel = document.getElementById("registerResponse");
  // http request
  var r = new XMLHttpRequest();
  r.open('POST', url, true);
  r.setRequestHeader("Content-type", "application/json");
  r.onreadystatechange = function(){
    if (r.status == 200){
      regLabel.color = "green";
      regLabel.value = "Success! Please check your email."
    } else {
      console.log("failed?")
      regLabel.color = "red";
      regLabel.innerHTML = "Registration failed."
    }
  }

  r.send({email: email});
};
