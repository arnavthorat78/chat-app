// DOM queries
const chatList = document.querySelector(".chat-list");

// Class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", "Arnav");

// Get changes + render
chatroom.getChats((data) => chatUI.render(data));
