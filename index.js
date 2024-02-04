document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded! 🚀");
  // Check if item exists in local storage : UserList and ActualUser and LoggedIn
  if (localStorage.getItem("UserList") === null) {
    localStorage.setItem("UserList", JSON.stringify([]));
  }
  if (localStorage.getItem("ActualUser") === null) {
    localStorage.setItem("ActualUser", JSON.stringify({}));
  }

  if (localStorage.getItem("AttemptLogin") === null) {
    localStorage.setItem(
      "AttemptLogin",
      JSON.stringify({
        loginTime: "",
        attempt: 0,
      })
    );
  }

  // Check if user is logged in if yes get modal and hide it
  var ActualUser = JSON.parse(localStorage.getItem("ActualUser"));
  if (ActualUser.userName === undefined) {
    document.getElementById("loginModal").style.display = "block";
  }
  else {
loadData();
  }
  // Until undefined add listener of local storage
  window.addEventListener("storage", function (e) {
    console.log("storage event", e);
    if (e.key == "ActualUser") {
      var ActualUser = JSON.parse(localStorage.getItem("ActualUser"));
      if (ActualUser.userName !== undefined) {
        document.getElementById("loginModal").style.display = "none";
        loadData();
      }
      else{
        this.window.location.reload();
      }
    }
  });
  // Write and fetch from local storage
  var username = localStorage.getItem("username");
  var password = localStorage.getItem("password");
  var remember = localStorage.getItem("remember");
  if (remember == "true") {
    document.getElementById("username").value = username;
    document.getElementById("password").value = password;
  }

  
});


function loadData() {
   // Récupérer les éléments du DOM
        const playerNameElement = document.getElementById("player-name");
        const playerLevelElement = document.getElementById("player-level");
        const lastLog = document.getElementById("lastlog");

        // Charger les données du localStorage
        const playerData = JSON.parse(localStorage.getItem("ActualUser"));
        const allUser = JSON.parse(localStorage.getItem("UserList"));

        // Mettre à jour les éléments du DOM avec les données du joueur
        playerNameElement.textContent = playerData.userName;
        playerLevelElement.textContent += playerData.point;

        // Ajouter d'autres joueurs à la liste
        playerData.action.forEach(function (player, index) {
          const listItem = document.createElement("li");
          listItem.textContent = playerData.action[index];
          lastLog.appendChild(listItem);
        });

        var table = document.querySelector("tbody");

        // Pour chaque utilisateur, créez une nouvelle ligne et ajoutez-la au tableau
        allUser
          .sort((a, b) => b.point - a.point)
          .forEach(function (user, index) {
            var row = document.createElement("tr");

            var rankCell = document.createElement("td");
            rankCell.textContent = "#" + (index + 1);
            row.appendChild(rankCell);

            var nameCell = document.createElement("td");
            nameCell.textContent = user.userName;
            row.appendChild(nameCell);

            var actionCell = document.createElement("td");
            actionCell.textContent = user.action[user.action.length - 1];
            row.appendChild(actionCell);
            table.appendChild(row);
          });

        document
          .getElementById("showListButton")
          .addEventListener("click", function () {
            var list = document.getElementById("lastlog");
            var button = document.getElementById("showListButton");
            if (list.style.display === "" || list.style.display === "none") {
              button.textContent = "Hide Actions";
              list.style.display = "block";
            } else {
              button.textContent = "Show Actions";
              list.style.display = "none";
            }
          });
}