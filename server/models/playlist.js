const con = require("./db_connect");

async function createPlaylistTable() {
    let sql = `
        CREATE TABLE IF NOT EXISTS playlists (
            playlist_id INT AUTO_INCREMENT,
            user_id INT NOT NULL,
            title VARCHAR(100) NOT NULL,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT playlistsPK PRIMARY KEY(playlist_id),
            CONSTRAINT fk_playlists_users
                FOREIGN KEY(user_id)
                REFERENCES users(user_id)
                ON DELETE CASCADE
        );
    `;

    await con.query(sql);
}

createPlaylistTable();

/*
{
    user_id: 1,
    title: "Underground Finds",
    description: "A playlist of songs from different platforms."
}
*/
// CREATE playlist
async function createPlaylist(playlist) {
    let sql = `
        INSERT INTO playlists(user_id, title, description)
        VALUES (?, ?, ?);
    `;

    const result = await con.query(sql, [
        playlist.user_id,
        playlist.title,
        playlist.description
    ]);

    return result;
}

// READ all playlists
async function getAllPlaylists() {
    let sql = `
        SELECT * FROM playlists;
    `;

    return await con.query(sql);
}

// READ one playlist by ID
async function getPlaylistById(playlist_id) {
    let sql = `
        SELECT * FROM playlists
        WHERE playlist_id = ?;
    `;

    let playlist = await con.query(sql, [playlist_id]);
    return playlist[0];
}

/*
{
    title: "Updated Playlist Title",
    description: "Updated playlist description."
}
*/
// UPDATE playlist by ID
async function updatePlaylist(playlist_id, playlist) {
    let sql = `
        UPDATE playlists
        SET title = ?, description = ?
        WHERE playlist_id = ?;
    `;

    await con.query(sql, [
        playlist.title,
        playlist.description,
        playlist_id
    ]);

    return await getPlaylistById(playlist_id);
}

// DELETE playlist by ID
async function deletePlaylist(playlist_id) {
    let sql = `
        DELETE FROM playlists
        WHERE playlist_id = ?;
    `;

    return await con.query(sql, [playlist_id]);
}

module.exports = {
    createPlaylist,
    getAllPlaylists,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist
};