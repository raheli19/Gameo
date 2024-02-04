function isValidEmail(email) {
  var regex = /^[^\s@]+@[^\s@]/;
  return regex.test(email);
}

document.addEventListener("DOMContentLoaded", function () {
  function setProperties(properties) {
    document.getElementById("titleForm").innerText = properties.titleForm;
    document.getElementById("username").placeholder = properties.username;
    document.getElementById("password").placeholder = properties.password;
    document.getElementById("login").innerText = properties.login;
    document.getElementById("mailArea").style.display = properties.mailArea;
    document.getElementById("signUp").style.display = properties.signUp;
    document.getElementById("signIn").style.display = properties.signIn;
    document.getElementById("login").style.display = properties.signUp;
    document.getElementById("signUpButton").style.display = properties.signIn;
  }

  document.getElementById("signUpLink").addEventListener("click", function () {
    setProperties({
      titleForm: "Gameo Sign Up",
      username: "Choose Username",
      password: "Choose Password",
      login: "Sign Up",
      mailArea: "block",
      signUp: "none",
      signIn: "block",
    });
    document.getElementById("error").innerText = "";
  });

  document.getElementById("signInLink").addEventListener("click", function () {
    setProperties({
      titleForm: "Gameo Log In",
      username: "Enter Username",
      password: "Enter Password",
      login: "Log In",
      mailArea: "none",
      signUp: "block",
      signIn: "none",
    });
    document.getElementById("error").innerText = "";
  });

  document
    .getElementById("signUpButton")
    .addEventListener("click", function () {
      var userName = document.getElementById("username").value;
      var userPassword = document.getElementById("password").value;
      var userEmail = document.getElementById("mail").value;
      // add data to local storage UserList
      var userList = JSON.parse(localStorage.getItem("UserList"));
      //check if one of the fields is empty and check if mail is a real mail
      var signTime = new Date();
      var localTime = signTime.toLocaleString();
      var signTime = signTime.getTime();
      var signTime = signTime.toString();

      var user = userList.find(function (user) {
        return user.userName == userName;
      });

      if (user !== undefined) {
        document.getElementById("username").value = "";
        document.getElementById("error").innerText =
          "Username already exists! Please choose another one.";
      } else if (
        userName != "" &&
        userPassword != "" &&
        userEmail != "" &&
        isValidEmail(userEmail)
      ) {
        userList.push({
          userName: userName,
          userPassword: userPassword,
          userEmail: userEmail,
          entryNumber: 0,
          point: 10,
          lastLogin: localTime,
          action: ["Sign In - " + localTime],
          record: [],
        });
        localStorage.setItem("UserList", JSON.stringify(userList));
      }
    });

  document.getElementById("login").addEventListener("click", function () {
    // check if user exists in local storage UserList
    var userList = JSON.parse(localStorage.getItem("UserList"));
    var userName = document.getElementById("username").value;
    var userPassword = document.getElementById("password").value;
    var AttemptLogin = JSON.parse(localStorage.getItem("AttemptLogin"));
    var loginTime = new Date();
    var localTime = loginTime.toLocaleString();
    var loginTime = loginTime.getTime();
    var loginTime = loginTime.toString();

    var user = userList.find(function (user) {
      return user.userName == userName; //&& user.userPassword == userPassword;
    });

    if (
      user !== undefined &&
      user.userPassword == userPassword &&
      AttemptLogin.attempt < 3
    ) {
      //if user exists and password is correct
      user.entryNumber = user.entryNumber + 1;
      user.lastLogin = localTime;
      user.action.push("Log In - " + localTime);
      localStorage.setItem("UserList", JSON.stringify(userList));

      // add data to local storage ActualUser
      localStorage.setItem("ActualUser", JSON.stringify(user));
      localStorage.setItem(
        "AttemptLogin",
        JSON.stringify({ loginTime: "", attempt: 0 })
      );
    } else if (user !== undefined && user.userPassword !== userPassword) {
      //if user exists but password is incorrect
      document.getElementById("error").innerText = "Wrong password.";

      // Check if multiple login with cookies block login for 10 minutes

      if (AttemptLogin.attempt == 2) {
        var AttemptLogin = JSON.parse(localStorage.getItem("AttemptLogin"));
        var loginTime = loginTime - AttemptLogin.loginTime;
            document.getElementById("login").disabled = true;

        // do a timer timeout to give the user a chance to log in again
          setTimeout(function () {
            document.getElementById("error").innerText = "";
            localStorage.setItem(
              "AttemptLogin",
              JSON.stringify({ loginTime: "", attempt: 0 })
            );
            // disable button
            document.getElementById("login").disabled = false;
          }, 10000);

        if (loginTime < 10000) {
          document.getElementById("error").innerText =
            "You have to wait 10 seconde to log in again.";
        } else {
          document.getElementById("error").innerText = "Wrong password.";
          localStorage.setItem(
            "AttemptLogin",
            JSON.stringify({ loginTime: loginTime, attempt: 1 })
          );
        }
      }
      if (AttemptLogin.attempt < 2) {
        let attempt = AttemptLogin.attempt + 1;
        localStorage.setItem(
          "AttemptLogin",
          JSON.stringify({ loginTime: loginTime, attempt: attempt })
        );
      }
    } else {
      //if user doesn't exist
      document.getElementById("error").innerText =
        "User doesn't exist! Please sign up.";
    }
  });
});
