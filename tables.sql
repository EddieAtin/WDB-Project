CREATE DATABASE IF NOT EXISTS playlist_network;
USE playlist_network;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE playlists (
    playlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_playlists_users
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE songs (
    song_id INT AUTO_INCREMENT PRIMARY KEY,
    playlist_id INT NOT NULL,
    song_title VARCHAR(100) NOT NULL,
    artist_name VARCHAR(100),
    platform VARCHAR(50),
    song_url VARCHAR(500) NOT NULL,

    CONSTRAINT fk_songs_playlists
        FOREIGN KEY (playlist_id)
        REFERENCES playlists(playlist_id)
        ON DELETE CASCADE
);

CREATE TABLE tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE playlist_tags (
    playlist_id INT NOT NULL,
    tag_id INT NOT NULL,

    PRIMARY KEY (playlist_id, tag_id),

    CONSTRAINT fk_playlist_tags_playlists
        FOREIGN KEY (playlist_id)
        REFERENCES playlists(playlist_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_playlist_tags_tags
        FOREIGN KEY (tag_id)
        REFERENCES tags(tag_id)
        ON DELETE CASCADE
);

CREATE TABLE playlist_likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    playlist_id INT NOT NULL,

    CONSTRAINT fk_likes_users
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_likes_playlists
        FOREIGN KEY (playlist_id)
        REFERENCES playlists(playlist_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_user_playlist_like
        UNIQUE (user_id, playlist_id)
);

CREATE TABLE saves (
    save_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    playlist_id INT NOT NULL,

    CONSTRAINT fk_saves_users
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_saves_playlists
        FOREIGN KEY (playlist_id)
        REFERENCES playlists(playlist_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_user_playlist_save
        UNIQUE (user_id, playlist_id)
);

CREATE TABLE reposts (
    repost_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    playlist_id INT NOT NULL,
    repost_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_reposts_users
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_reposts_playlists
        FOREIGN KEY (playlist_id)
        REFERENCES playlists(playlist_id)
        ON DELETE CASCADE
);