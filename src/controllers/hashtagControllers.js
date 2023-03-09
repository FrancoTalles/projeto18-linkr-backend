import db from "../config/databaseConnection.js";

export async function hashtagPosts(req, res) {
  const hashtag = res.locals.hashtag;

  try {
    const posts_para_procurar = await db.query(
      `
        SELECT * FROM hashtag 
        JOIN posts 
        ON hashtag."postId" = posts.id 
        WHERE hashtag.hashtag = $1;`,
      [hashtag]
    );

    const posts = posts_para_procurar.rows;

    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
