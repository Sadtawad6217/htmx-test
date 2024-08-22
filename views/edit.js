const createEditFormTemplate = (post) => /*html*/ `
  <form hx-put="/edit-post/${post.id}" hx-target="#post-${post.id}" hx-swap="outerHTML" onsubmit="closePopup()">
    <label for="postTitle">Title</label>
    <input id="postTitle" name="title" placeholder="Title" type="text" value="${post.title}" required />

    <label for="postContent">
      Content 
    </label>
    <textarea id="postContent" name="content" placeholder="Content" required >${post.content}</textarea>
    <button type="submit"> 
      Save 
    </button>
    <button type="button"  hx-delete="/delete-post"  hx-vals='{"id": "${post.id}"}' hx-target="#post-${post.id}"  hx-swap="outerHTML" onclick="closePopup()"> 
      Delete
    </button>

    <button type="button" onclick="closePopup()">
      Cancel
    </button>
  </form>
`;

export default createEditFormTemplate;
