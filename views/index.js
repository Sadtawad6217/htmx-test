const createHomepageTemplate = () => /*html*/ `
<!DOCTYPE html>
<html>
<head>
  <title>My List</title>
  <script src="https://unpkg.com/htmx.org@1.9.12"></script>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <main>
    <div class="container">
      <div class="tabs">
        <button id="post-tab" class="active" hx-get="/posts" hx-target="#content">
          Post
        </button>
        <button id="draft-tab" hx-get="/posts?published=false" hx-target="#content">
          Draft
        </button>
        <button id="create-draft-tab" hx-get="/create-draft" hx-target="#create-draft-form">
          Create Draft
        </button>
      </div>
      <div id="content"></div>
      <div id="create-draft-form" class="list"></div>
    </div>
    <div id="editPostPopup" class="popup">
      <div class="popup-content">
      </div>
    </div>
  </main>

  <script>
    function loadInitialContent() {
      document.getElementById('post-tab').click();
    }

    function clearForm() {
      document.getElementById('post-form').reset();
    }

    function closePopup() {
      document.getElementById("editPostPopup").style.display = "none";
    }

    function openPopup() {
      document.getElementById("editPostPopup").style.display = "block";
    }

    function closeDraftForm() {
      document.getElementById("create-draft-form").style.display = "none";
    }

    function openDraftForm() {
      document.getElementById("create-draft-form").style.display = "block";
    }

    function closeCreateDraftForm() {
      document.getElementById("create-draft-form").innerHTML = '';
    }

    function showCreateDraftForm() {
      document.getElementById("content").innerHTML = '';
      document.getElementById("create-draft-form").innerHTML = '<form id="post-form"> ... </form>';
      document.querySelectorAll('.tabs button').forEach(button => button.classList.remove('active'));
      document.getElementById('create-draft-tab').classList.add('active');
    }

    document.querySelectorAll('.tabs button').forEach(button => {
      button.addEventListener('click', () => {
        if (button.id === 'create-draft-tab') {
          showCreateDraftForm();
        } else {
          document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          closeCreateDraftForm();
        }
      });
    });

    document.addEventListener('DOMContentLoaded', loadInitialContent);
  </script>
</body>
</html>
`;

export default createHomepageTemplate;
