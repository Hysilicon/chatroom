const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

const socket = io();

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
  newDiv.classList.add("message");
  newDiv.innerHTML = `<p class="meta">Brad <span>9:12 pm</span></p>
    <p class="text">
      ${message}
    </p>`;

  document.querySelector(".chat-messages").appendChild(newDiv);
};
