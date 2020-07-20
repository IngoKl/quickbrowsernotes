var markdown = false;
var note = document.getElementById("note");
var mdmodeStatus = document.getElementById("mdmode-status");

function renderMarkdown() {
    markdown = true;
    var md = window.markdownit();
    note.innerHTML = md.render(localStorage.getItem('note_md'));
    note.contentEditable = false;
    mdmodeStatus.innerText = '📖 View Mode';
    
}

function switchMarkdown() {
    if (markdown == false) {
        renderMarkdown();
        markdown = true;
    } else {
        note.innerText = localStorage.getItem('note_md')
        markdown = false;
        note.contentEditable = true;
        mdmodeStatus.innerText = '✍ Edit Mode';
    }
}

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'm') {
      switchMarkdown();
    }
});

mdmodeStatus.onclick = function(){
    switchMarkdown();
};

document.addEventListener("DOMContentLoaded", function() {
    note.innerText = localStorage.getItem('note_md');
    renderMarkdown();
});

document.getElementById("note").addEventListener("input", function() {
    localStorage.setItem('note_html', note.innerHTML);
    localStorage.setItem('note_md', note.innerText);
}, false);