import urlMetadata from "url-metadata";
import db from "../config/databaseConnection.js";
import { createRePostsData } from "./rePostRepository.js";

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
        p."userId" AS userId,
        u."username" AS postAuthor,
        u."pictureURL" AS authorPhoto,
        p."description" AS postDescription,
        p."link" AS postLink,
        p."createdAt" AS createdAt,
        COUNT(l."id") AS likesCount,
        COUNT(r."id") AS resharesCount,
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
      INNER JOIN "followers" f ON f."followedUser" = p."userId" AND f."userId" = $1
      LEFT JOIN "likes" l ON p."id" = l."postId" AND l."liked" = true
      LEFT JOIN "reshare" r ON p."id" = r."postId"
    GROUP BY 
      p."id",
      u."username",
      u."pictureURL"
    ORDER BY 
      p."createdAt" DESC
    LIMIT 20
  `,
    [id]
  );

  const resharedData = await createRePostsData(id);

  let mixedData = [];

  if (resharedData.rows !== undefined) {
    mixedData = [...result.rows, ...resharedData.rows];
  } else {
    mixedData = [...result.rows];
  }

  const orderedData = sortByCreatedAt(mixedData);

  const finalData = createDataWithMetadata(orderedData);

  return finalData;
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

export async function getPostsByUser(userIdValue, id) {
  const { rows: user } = await db.query(`
    SELECT 
      u."username", 
      u."pictureURL" 
    FROM users u 
    WHERE u."id" = $1;
  `,
    [id]
  );

  const [userResult] = user;


  const result = await db.query(
    `
    SELECT 
    p."id" AS postId,
    p."userId" AS userId,
    u."username" AS postAuthor,
    u."pictureURL" AS authorPhoto,
    p."description" AS postDescription,
    p."link" AS postLink,
    (SELECT COUNT(*) FROM "likes" WHERE "postId" = p."id" AND "liked" = true) AS likesCount,
    COUNT(r."id") AS resharesCount,
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
      LEFT JOIN "reshare" r ON p."id" = r."postId"
    WHERE 
      p."userId" = $2
    GROUP BY 
      p."id",
      u."username",
      u."pictureURL"
    ORDER BY 
      p."createdAt" DESC
    LIMIT 20

  `,
    [userIdValue, id]
  );

  const data = await createDataWithMetadata(result.rows);

  return { userResult, posts: data };
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

function sortByCreatedAt(posts) {
  posts.sort((a, b) => {
    if (a.createdat < b.createdat) {
      return 1;
    } else if (a.createdat > b.createdat) {
      return -1;
    } else {
      return 0;
    }
  });
  return posts;
}

