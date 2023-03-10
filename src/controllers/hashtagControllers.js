import db from "../config/databaseConnection.js";

export async function hashtagPosts(_, res) {
  const hashtag = res.locals.hashtag;
  const id = res.locals.userIdValue;
  console.log("entrou aqui");

  try {
    const posts_para_procurar = await db.query(
      `SELECT 
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
    WHERE 
      p."description" LIKE $2
    GROUP BY 
      p."id",
      u."username",
      u."pictureURL"
    ORDER BY 
      p."createdAt" DESC
    LIMIT 20;`,
      [id, `%#${hashtag}%`]
    );

    const posts = posts_para_procurar.rows;

    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
