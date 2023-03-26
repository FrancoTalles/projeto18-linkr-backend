import db from "../config/databaseConnection.js";

export async function createComment(userId, postId, comment) {
  const result = await db.query(
    `INSERT INTO comments ("userId", "postId", "comment") VALUES ($1, $2, $3)`,
    [userId, postId, comment]
  );

  return result;
}

export async function getPostComments(id) {
  const result = await db.query(
    `
    SELECT comment,users.username,users."pictureURL"
    FROM comments
    LEFT JOIN users
    ON comments."userId" = users.id
    WHERE "postId" = $1
  `,
    [id]
  );

  return result
}