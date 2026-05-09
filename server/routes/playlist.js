const express = require("express");
const router = express.Router();
const Playlist = require("../models/playlist");

router
.get("/getAllPlaylists", async (req, res) => {
    try {
        const playlists = await Playlist.getAllPlaylists();
        res.send(playlists);
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
})

.get("/getPlaylistById/:playlist_id", async (req, res) => {
    try {
        const playlist = await Playlist.getPlaylistById(req.params.playlist_id);
        res.send(playlist);
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
})

.post("/createPlaylist", async (req, res) => {
    try {
        const playlist = await Playlist.createPlaylist(req.body);
        res.send(playlist);
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
});

module.exports = router;