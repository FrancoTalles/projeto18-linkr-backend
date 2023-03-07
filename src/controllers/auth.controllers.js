import bcrypt from "bcrypt";
import db from "../config/database.connection.js";
import { v4 as v4uuid } from "uuid";

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

export async function signin(req, res) {
    const { id } = res.locals.user;
    const token = v4uuid();
    try {
        await db.query(`INSERT INTO 
        session("userId", token) 
        VALUES ($1, $2)`,
            [id, token]);
        return res.status(200).send(token);
    } catch (err) {
        return res.status(500).send(err.message);
    };
};