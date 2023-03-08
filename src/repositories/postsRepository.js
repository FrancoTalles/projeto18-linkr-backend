import db from "../config/database.connection.js";

export async function createNewPost(userId, link, description) {

  const result = await db.query(
    `INSERT INTO posts ("userId", "link", "description") VALUES ($1, $2, $3)`,
    [userId, link, description]
  );

  return result;
}

export async function getAllPosts(id) {

  const result = await db.query(
    `
      SELECT 
        p."id" AS postId,
        u."username" AS postAuthor,
        u."pictureURL" AS authorPhoto,
        p."description" AS postDescription,
        p."link" AS postLink,
        COUNT(l."id") AS likesCount,
        (
          SELECT 
            json_agg(
              json_build_object(
                'name', u2."username"
              )
            )
          FROM 
            "likes" l2
            INNER JOIN "users" u2 ON l2."userId" = u2."id"
          WHERE 
            l2."postId" = p."id" AND l2."liked" = true
        ) AS whoLiked,
        EXISTS(
          SELECT 
            1 
          FROM 
            "likes" l3
          WHERE 
            l3."userId" = $1 AND l3."postId" = p."id" AND l3."liked" = true
        ) AS liked
    FROM 
      "posts" p
      INNER JOIN "users" u ON p."userId" = u."id"
      LEFT JOIN "likes" l ON p."id" = l."postId" AND l."liked" = true
    GROUP BY 
      p."id",
      u."username",
      u."pictureURL"
    ORDER BY 
      p."id" DESC
    LIMIT 20
  `,
    [id]
  );

  return result; 
}

export async function updatePostDesc(userIdValue, postId, description) {

  const result = await db.query(
    `
    UPDATE posts
    SET description = $1
    WHERE ID = $2 AND "userId" = $3
  `,
    [description, postId, userIdValue]
  );

  return result;
}

export async function deleteUserPost(userIdValue, postId) {

  const result = await db.query(
    `
    DELETE FROM posts 
    WHERE id = $1 AND "userId" = $2
  `,
    [postId, userIdValue]
  );

  return result;
}
