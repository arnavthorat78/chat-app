// DOM queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-msg");

// Add new chat
newChatForm.addEventListener("submit", (e) => {
  // Prevent page from refreshing
  e.preventDefault();

  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => {
      newChatForm.reset();
    })
    .catch(console.log);
});

// Update username
newNameForm.addEventListener("submit", (e) => {
  // Prevent page from reloading
  e.preventDefault();

  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);

  newNameForm.reset();

  updateMsg.innerText = `Your name was updated to ${newName}!`;

  setTimeout(() => (updateMsg.innerText = ""), 5000);
});

// Check local storage for a name
const username = localStorage.username ? localStorage.username : "Anonymous";

// Class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);

// Get changes + render
chatroom.getChats((data) => chatUI.render(data));
