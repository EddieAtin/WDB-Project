const con = require("./db_connect");
const bcrypt = require("bcrypt");

async function createUserTable() {
    let sql = `
        CREATE TABLE IF NOT EXISTS users (
            user_id INT AUTO_INCREMENT,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            CONSTRAINT usersPK PRIMARY KEY(user_id)
        );
    `;

    await con.query(sql);
}

createUserTable();

/*
{
    email: "test@example.com",
    password: "password123"
}
*/
async function login(user) {
    let cUser = await getUserByEmail(user.email);

    if (!cUser) {
        throw Error("Email not found!");
    }

    let match = await bcrypt.compare(user.password, cUser.password);

    if (!match) {
        throw Error("Password incorrect!");
    }

    return cUser;
}

async function getUserByEmail(email) {
    let sql = `
        SELECT * FROM users
        WHERE email = ?;
    `;

    let cUser = await con.query(sql, [email]);
    return cUser[0];
}

// READ all users
async function getAllUsers() {
    let sql = `
        SELECT * FROM users;
    `;

    return await con.query(sql);
}

// READ one user by ID
async function getUserById(user_id) {
    let sql = `
        SELECT * FROM users
        WHERE user_id = ?;
    `;

    let user = await con.query(sql, [user_id]);
    return user[0];
}


// CREATE user / register
async function register(user) {
    let cUser = await getUserByEmail(user.email);

    if (cUser) {
        throw Error("Email already in use!");
    }

    let hashedPassword = await bcrypt.hash(user.password, 10);

    let sql = `
        INSERT INTO users(first_name, last_name, username, email, password)
        VALUES (?, ?, ?, ?, ?);
    `;

    await con.query(sql, [
        user.firstName,
        user.lastName,
        user.username,
        user.email,
        hashedPassword
    ]);

    return await login(user);
}


// UPDATE user
async function updateUser(user_id, user) {
    let sql = `
        UPDATE users
        SET first_name = ?, last_name = ?, username = ?, email = ?
        WHERE user_id = ?;
    `;

    await con.query(sql, [
        user.firstName,
        user.lastName,
        user.username,
        user.email,
        user_id
    ]);

    return await getUserById(user_id);
}

// DELETE user
async function deleteUser(user_id) {
    let sql = `
        DELETE FROM users
        WHERE user_id = ?;
    `;

    return await con.query(sql, [user_id]);
}

module.exports = {
    getAllUsers,
    getUserById,
    login,
    register,
    updateUser,
    deleteUser
};