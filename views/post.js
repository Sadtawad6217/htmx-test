const createTemplate = (post) => /*html*/ `
  <div class="post" id="post-${post.id}">
    <div class="details">
      <h2 class="title">${post.title}</h2>
      <p class="content">${post.content}</p>
    </div>
    <div class="meta">
      <span class="date">${new Date(post.created_at).toLocaleString()}</span>
      <div class="buttons">
        <button hx-get="/edit-post/${post.id}" hx-target="#editPostPopup .popup-content" hx-swap="innerHTML"onclick="openPopup()">
          Edit
        </button>
        
        ${!post.published ? `
          <button hx-put="/edit-post/${post.id}" hx-target="closest .post" hx-swap="outerHTML"hx-vals='{"published": true}'>
            Publish
          </button>
          <button hx-delete="/delete-post"  hx-vals='{"id": "${post.id}"}' hx-target="closest .post" hx-swap="outerHTML">
            Delete
          </button>
        ` : ''}
      </div>
    </div>
  </div>
`;

export default createTemplate;
