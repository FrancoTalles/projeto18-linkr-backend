import db from "../config/databaseConnection.js";

export async function handleLikes(req, res) {
    const { postId, userId, liked } = req.body;

    try {
        const query = await db.query(
            `
            SELECT * FROM likes WHERE "postId"=$1 AND "userId"=$2;`,
            [postId,userId]
        )

        if (query.rowCount === 0){
            await db.query(
                `INSERT INTO likes(userId, PostId, liked) VALUES ($1,$2,$3);`,
                [postId,userId,liked]
            )
        } else {
            await db.query(
                `UPDATE likes SET liked = $1 WHERE "postId"=$2 AND "userId"=$3;`,
                [liked,postId,userId]
                )
        }

        return res.sendStatus(201);

    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function countLikes(req, res) {
    const { postId } = req.params;
    const userId = req.userId;

    try {
        const likesCounter = await db.query(
            `
            SELECT COUNT(*) 
            FROM likes 
            WHERE postid = $1 AND liked = true;`,
            [postId]
        )
            
        return res.status(200).send(likesCounter.rows[0])

    } catch (err) {
        return res.status(500).send(err.message)
    }
}