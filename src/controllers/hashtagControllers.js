import db from "../config/databaseConnection.js";
import urlMetadata from "url-metadata";

export async function hashtagPosts(_, res) {
  const hashtag = res.locals.hashtag;
  const id = res.locals.userIdValue;

  try {
    const posts_para_procurar = await db.query(
      `SELECT 
      p."id" AS postId,
      p."userId" AS userId,
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

    const posts = await createDataWithMetadata(posts_para_procurar.rows);
    console.log(posts) 

    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getHashtags(_, res) {
  try {
    const hashtags_pegas = await db.query(`
    SELECT palavra, COUNT(*) AS numero_ocorrencias
    FROM (
    SELECT regexp_split_to_table(description, E'\\\\s+') AS palavra
    FROM posts
    ) palavras
    WHERE palavra LIKE '#%'
    GROUP BY palavra
    ORDER BY numero_ocorrencias DESC;`);

    res.status(200).send(hashtags_pegas.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function createDataWithMetadata(data) {
  try {
    const result = await Promise.all(
      data.map(async (user) => {
        const metadata = await urlMetadata(user.postlink);
        return {
          ...user,
          linkimage: metadata.image,
          linktitle: metadata.title,
          linkdescription: metadata.description,
        };
      })
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
