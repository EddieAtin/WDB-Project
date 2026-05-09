// Playlist object for posted playlists
class Playlist {
    constructor(title, description, tags, songs) {
        this.title = title;
        this.description = description;
        this.tags = tags;
        this.songs = songs;
    }
}

// Post playlist function
function postPlaylist(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const tags = document.getElementById("tags").value;
    const songs = document.getElementById("songs").value;

    const newPlaylist = new Playlist(title, description, tags, songs);

    console.log("Playlist Object:");
    console.log(newPlaylist);
}

// Add event listener for playlist form
const playlistForm = document.getElementById("playlistForm");

if (playlistForm) {
    playlistForm.addEventListener("submit", postPlaylist);
}