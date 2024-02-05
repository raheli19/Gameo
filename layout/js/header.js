// Event listener for DOM content loaded
document.addEventListener("DOMContentLoaded", function () {

  // Logout button click event
  document.getElementById("logoutButton").addEventListener("click", function () {

    // Logging out and retrieving user info
    console.log("logout");
    var userActual = JSON.parse(localStorage.getItem("ActualUser"));

    // Retrieving user list from local storage
    var userList = JSON.parse(localStorage.getItem("UserList"));

    // Finding and updating user's logout action
    var user = userList.find(user => user.userName == userActual.userName);
    var loginTime = new Date();
    user.action.push("Log Out - " + loginTime.toLocaleString());

    // Updating user list and clearing current user in local storage
    localStorage.setItem("UserList", JSON.stringify(userList));
    localStorage.setItem("ActualUser", JSON.stringify({}));
  });
});
