document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("logoutButton")
    .addEventListener("click", function () {
      console.log("logout");

      var userActual = JSON.parse(localStorage.getItem("ActualUser"));

      var userList = JSON.parse(localStorage.getItem("UserList"));
      var user = userList.find(function (user) {
        return user.userName == userActual.userName;
      });
      var loginTime = new Date();
      var localTime = loginTime.toLocaleString();
      user.action.push("Log Out - " + localTime);
      localStorage.setItem("UserList", JSON.stringify(userList));
      localStorage.setItem("ActualUser", JSON.stringify({}));
    });
});
