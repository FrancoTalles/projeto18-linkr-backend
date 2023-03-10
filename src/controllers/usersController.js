import db from "../config/databaseConnection.js";

export async function getUsers(req, res) {

    const { name } = req.params;

    try {
        const { rows: users } = await db.query(
            `
            SELECT
                id,
                username,
                "pictureURL"
            FROM
                users
            WHERE 
                username ILIKE $1;
            `,
            [`${name}%`]
        );

        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}