// Event listener for DOM content loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded! 🚀");
  // Check if item exists in local storage, if not initialize them
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

  // Check if user is logged in if yes get hide login modal
  var ActualUser = JSON.parse(localStorage.getItem("ActualUser"));
  if (ActualUser.userName === undefined) {
    document.getElementById("loginModal").style.display = "block";
  } else {
    loadData();
  }

  // Until undefined add listener of local storage to see if someone log in
  window.addEventListener("storage", function (e) {
    if (e.key == "ActualUser") {
      var ActualUser = JSON.parse(localStorage.getItem("ActualUser"));
      if (ActualUser.userName !== undefined) {
        document.getElementById("loginModal").style.display = "none";
        loadData();
      } else {
        this.window.location.reload();
      }
    }
  });

    const memoryContainer = document.getElementById("containerImgVideoBlock");
    memoryContainer.addEventListener("click", function () {
      // add data to local storage UserList
      var userList = JSON.parse(localStorage.getItem("UserList"));
      var actualUser = JSON.parse(localStorage.getItem("ActualUser"));
      var userName = actualUser.userName;

      const index = userList.findIndex(function (user) {
        return user.userName === userName;
      });
      const updatedUser = {
        ...userList[index],
        action: [...userList[index].action, "Game Visited - Memory Game"],
      };
      userList[index] = updatedUser;

      localStorage.setItem("ActualUser", JSON.stringify(updatedUser));
      localStorage.setItem("UserList", JSON.stringify(userList));
    });

     const snakeContainer = document.getElementById("containerImgVideoConnect");
     snakeContainer.addEventListener("click", function () {
       // add data to local storage UserList
       var userList = JSON.parse(localStorage.getItem("UserList"));
       var actualUser = JSON.parse(localStorage.getItem("ActualUser"));
       var userName = actualUser.userName;

       const index = userList.findIndex(function (user) {
         return user.userName === userName;
       });
       const updatedUser = {
         ...userList[index],
         action: [...userList[index].action, "Game Visited - Snake Game"],
       };
       userList[index] = updatedUser;

       localStorage.setItem("ActualUser", JSON.stringify(updatedUser));
       localStorage.setItem("UserList", JSON.stringify(userList));
     });

});

// Function to load and display player data
function loadData() {
  // Get object from DOM
  const playerNameElement = document.getElementById("player-name");
  const playerLevelElement = document.getElementById("player-level");
  const lastLog = document.getElementById("lastlog");

  // Get data from localstorage
  const playerData = JSON.parse(localStorage.getItem("ActualUser"));
  const allUser = JSON.parse(localStorage.getItem("UserList"));

  // Update player data
  playerNameElement.textContent = playerData.userName;
  playerLevelElement.textContent += playerData.point;

  // Add data player
  playerData.action.forEach(function (action) {
    const listItem = document.createElement("li");
    listItem.textContent = action;
    lastLog.appendChild(listItem);
  });

  var table = document.querySelector("tbody");

  // For each user create a row and show rank by his point
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

  // Show or hide log list
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

// Get the necessary elements
const elements = [
  ["containerImgVideoBlock", "imgBlockChamp", "videoBlockChamp"],
  ["containerImgVideoMine", "imgMinecraft", "videoMinecraft"],
  ["containerImgVideoConnect", "imgConnect4", "videoConnect4"],
  ["containerImgVideoClash", "imgClash", "videoClash"],
  ["containerImgVideoSoccer", "imgSoccer", "videoSoccer"],
  ["containerImgVideoBillard", "imgBilliard", "videoBilliard"],
];

elements.forEach(([containerId, imgId, videoId]) => {
  addHoverEvent(containerId, imgId, videoId);
});
}

// Add hover event listener to all games
function addHoverEvent(containerId, imgId, videoId) {
  const divContainer = document.getElementById(containerId);
  const img = document.getElementById(imgId);
  const video = document.getElementById(videoId);

  divContainer.addEventListener("mouseover", function () {
    img.style.display = "none";
    video.style.display = "block";
  });

  divContainer.addEventListener("mouseleave", function () {
    video.style.display = "none";
    img.style.display = "block";
  });
}
