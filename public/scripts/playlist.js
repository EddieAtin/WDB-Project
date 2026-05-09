// Playlist object for posted playlists
class Playlist {
    constructor(user_id, title, description) {
        this.user_id = user_id;
        this.title = title;
        this.description = description;
    }
}

// Post playlist function
async function postPlaylist(event) {
    event.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        alert("You must be logged in to create a playlist.");
        window.location.href = "login.html";
        return;
    }

    const user_id = loggedInUser.user_id;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    const newPlaylist = new Playlist(user_id, title, description);

    try {
        const response = await fetch("/playlist/createPlaylist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPlaylist)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        console.log("Created Playlist:");
        console.log(data);

        alert("Playlist created successfully!");
        document.getElementById("playlistForm").reset();

    } catch (err) {
        console.error("Create playlist error:", err);
        alert("Something went wrong while creating the playlist.");
    }
}

// Add event listener for playlist form
const playlistForm = document.getElementById("playlistForm");

if (playlistForm) {
    playlistForm.addEventListener("submit", postPlaylist);
}