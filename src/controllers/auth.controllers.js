import bcrypt from "bcrypt";
import db from "../config/database.connection.js";

export async function signup(req, res) {
    const { username, email, password, pictureURL } = res.locals.user;
    const hashPassword = bcrypt.hashSync(password, 10);
    try {
        await db.query(`INSERT INTO 
        users(email, password, username, "pictureURL") 
        VALUES ($1, $2, $3, $4)`,
            [email, hashPassword, username, pictureURL]);
        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    };
};