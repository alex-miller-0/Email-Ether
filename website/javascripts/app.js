function register() {
  const email = document.getElementById("email").value;
  const url = "http://emailether.info:2777/send_email";

  // http request
  var r = new XMLHttpRequest();
  r.open('POST', url, true);
  r.setRequestHeader("Content-type", "application/json");
  r.onreadystatechange = function(){
    if (r.status == 200){
      console.log("success!");
    } else {
      console.log("failed");
    }
  }

  r.send({email: email});
};
