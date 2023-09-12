/**
 * Create a new ChatUI
 */
class ChatUI {
  constructor(list) {
    this.list = list;
  }

  /**
   * Create HTML for rendering to the DOM.
   *
   * @param {{ username: string, message: string, created_at: Date }} data Data for outputting to the DOM.
   */
  render(data) {
    const html = `
      <li class="list-group-item">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time">${data.created_at.toDate()}</div>
      </li>
    `;

    this.list.innerHTML += html;
  }
}
