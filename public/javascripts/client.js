const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

//Get username and room
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit("joinroom", { username, room });

socket.on("roomUsers", ({ room, users }) => {
  outputRoomNameToDOM(room);
  outputUsersToDOM(users);
});

socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});


chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  // Emit message to the server
  socket.emit("chatMsg", msg);

  //clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

const outputMessage = (message) => {
  // Create a new div and append it to the html
  const newDiv = document.createElement("div");
  if (message.username == "Rick Ashley") {
    newDiv.classList.add("botMessage");
  } else {
    newDiv.classList.add("message");
  }

  newDiv.innerHTML = `<p class="meta">${message.username} <span> ${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`;

  document.querySelector(".chat-messages").appendChild(newDiv);
};

const outputRoomNameToDOM = (room) => {
  roomName.innerText = room;
};

const outputUsersToDOM = (users) => {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
};

//Prompt the user before leave chat room
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
  if (leaveRoom) {
    window.location = "../index.html";
  } else {
  }
});
