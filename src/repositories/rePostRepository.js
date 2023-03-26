import db from "../config/databaseConnection.js";

export async function createNewRePost(userId, postId) {

  const result = await db.query(
    `INSERT INTO reshare ("userId", "postId") VALUES ($1, $2)`,
    [userId, postId]
  );

  return result;
}

export async function createRePostsData(userId) {
  try {
    const result = await db.query(
      `
      SELECT
        r."id" AS reshareId,
        r."userId" AS reshareuserId,
        u."username" AS reshareAuthor,
        p."id" AS postId,
        p."userId" AS userId,
        u2."username" AS postAuthor,
        u2."pictureURL" AS authorPhoto,
        p."description" AS postDescription,
        p."link" AS postLink,
        r."createdAt" AS createdAt,
        COUNT(l."id") AS likesCount,
        COUNT(r."id") AS resharesCount,
        (
            SELECT
                json_agg(
                    json_build_object(
                        'name', u3."username"
                    )
                )
            FROM
                "likes" l2
                INNER JOIN "users" u3 ON l2."userId" = u3."id"
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
        "reshare" r
        INNER JOIN "users" u ON r."userId" = u."id"
        INNER JOIN "posts" p ON r."postId" = p."id"
        INNER JOIN "users" u2 ON p."userId" = u2."id"
        LEFT JOIN "likes" l ON p."id" = l."postId" AND l."liked" = true
        
      GROUP BY
        r."id",
        u."username",
        u."pictureURL",
        p."id",
        u2."username",
        u2."pictureURL"
      ORDER BY
        r."createdAt" DESC
      LIMIT 20;
      `,
      [userId]
    );

    return result; 
  } catch (error) {
    console.log(error);
  }
};