import db from "../config/databaseConnection.js";

export async function handleLikes(req, res) {
    const { postId, liked } = req.body;
    const { userIdValue } = res.locals;

    try {
        const query = await db.query(
            `
            SELECT * FROM likes WHERE "postId"=$1 AND "userId"=$2;`,
            [postId, userIdValue]
        )

        if (query.rowCount === 0){
            await db.query(
                `INSERT INTO likes("postId", "userId", liked) VALUES ($1,$2,$3);`,
                [postId,userIdValue,liked]
            )
        } else {
            await db.query(
                `UPDATE likes SET liked = $1 WHERE "postId"=$2 AND "userId"=$3;`,
                [liked,postId,userIdValue]
                )
        }

        return res.sendStatus(201);

    } catch (err) {
        return res.status(500).send(err.message)
    }
}
