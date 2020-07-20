var markdown = false;
var note = document.getElementById("note");
var mdmode = document.getElementById("mdmode");

function renderMarkdown() {
    markdown = true;
    var md = window.markdownit();
    note.innerHTML = md.render(localStorage.getItem('note_md'));
    note.contentEditable = false;
    mdmode.innerText = 'View Mode';
}

function switchMarkdown() {
    if (markdown == false) {
        renderMarkdown();
        markdown = true;
    } else {
        note.innerText = localStorage.getItem('note_md')
        markdown = false;
        note.contentEditable = true;
        mdmode.innerText = 'Edit Mode';
    }
}

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'm') {
      switchMarkdown();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    note.innerText = localStorage.getItem('note_md');
    renderMarkdown();
});

document.getElementById("note").addEventListener("input", function() {
    localStorage.setItem('note_html', note.innerHTML);
    localStorage.setItem('note_md', note.innerText);
}, false);