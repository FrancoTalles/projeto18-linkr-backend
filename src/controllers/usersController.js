import db from "../config/databaseConnection.js";

export async function getUsers(req, res) {

    const id = res.locals.userIdValue;

    const { name } = req.params;

    try {
        const { rows: users } = await db.query(
            `
            SELECT 
                users.id, 
                users.username,
                "pictureURL",
                CASE WHEN followers."userId"=$1 THEN true ELSE false END AS isFollowed
            FROM 
                users 
                LEFT JOIN followers ON users.id = followers."followedUser" AND followers."userId" = 1
            WHERE 
                users.username ILIKE $2
            ORDER BY 
                CASE WHEN followers."followedUser" IS NULL THEN 1 ELSE 0 END, 
                followers."followedUser" DESC NULLS LAST, 
                users.username ASC`,
            [id, `${name}%`]
        );

        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}