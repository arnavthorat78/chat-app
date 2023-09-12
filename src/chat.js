/**
 * Make a new user in a chatroom.
 */
class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }

  /**
   * Add a chat to Firebase on the user's behalf.
   *
   * @param {string} message The message of the user.
   * @returns Response.
   */
  async addChat(message) {
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };

    // TODO remove response assignment and replace return with return this for method chaining
    const response = await this.chats.add(chat);
    return response;
  }

  /**
   * Get the chats from Firebase.
   *
   * @param {Function} callback Callback to call after an added change has been received. Passes a data argument.
   */
  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            callback(change.doc.data());
          }
        });
      });
  }

  /**
   * Updates the name of the user.
   *
   * @param {string} username The new username.
   */
  updateName(username) {
    this.username = username;

    localStorage.setItem("username", username);
  }

  /**
   * Updates the room.
   *
   * @param {string} room The new room.
   */
  updateRoom(room) {
    this.room = room;

    // TODO remove
    console.log("Room updated");

    if (this.unsub) this.unsub();
  }
}
