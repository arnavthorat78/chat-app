// DOM queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");

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

// Class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", "Arnav");

// Get changes + render
chatroom.getChats((data) => chatUI.render(data));
