import db from "../config/database.connection.js";

export async function checkHashtag(req, res, next) {
  const hashtag = req.params;

  try {
    const all_hashtags = await db.query(
      `SELECT * FROM hashtag WHERE hashtag = $1;`,
      [hashtag]
    );

    if (all_hashtags.rowCount === 0) {
      return res.status(404).send("Não existe essa hashtag");
    }

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
    return res.status(500).send(error.message);
  }
}
