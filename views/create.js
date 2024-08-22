const createPostFormTemplate = (post = {}) => /*html*/ `
    <form id="post-form" hx-post="/post" hx-target="this">
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" value="${post.title || ''}" required>

    <label for="content">Content:</label>
    <textarea id="content" name="content" required>${post.content || ''}</textarea>

    <div class="button-group">
        <button type="submit" name="published" value="true">Publish Now</button>
        <button type="submit" name="published" value="false">Save</button>
        <button type="button" onclick="clearForm()">Cancel</button>
    </div>
    </form>
`;

export default createPostFormTemplate;
