var markdown = false;
var note = document.getElementById("note");
var title = document.getElementById("title");
var mdmodeStatus = document.getElementById("mdmode-status");

function renderMarkdown() {
    var  note_md = localStorage.getItem('note_md');
    console.log(note_md)

    if (note_md) {
        markdown = true;
        var md = window.markdownit();
        note.innerHTML = md.render(note_md);
        note.contentEditable = false;
        mdmodeStatus.innerText = '📖 View Mode';
    } else {
        mdmodeStatus.innerText = '✍ Edit Mode';
    }
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
    var note_md = localStorage.getItem('note_md');
    var title_text = localStorage.getItem('note_title');

    if (title_text) {
        title.innerText = title_text;
        document.title = title_text;
    }

    if (note_md) {
        note.innerText = note_md;
        renderMarkdown();
    } else {
        note.innerText = 'Type here ...';
        mdmodeStatus.innerText = '✍ Edit Mode';
    }

});

document.getElementById("note").addEventListener("input", function() {
    localStorage.setItem('note_html', note.innerHTML);
    localStorage.setItem('note_md', note.innerText);
}, false);

document.getElementById("title").addEventListener("input", function() {
    if (title.innerText == "") {
        localStorage.removeItem('note_title');
    } else {
        localStorage.setItem('note_title', title.innerText);
    }
}, false);