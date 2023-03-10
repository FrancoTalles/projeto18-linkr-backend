import db from "../config/databaseConnection.js";

export async function checkHashtag(req, res, next) {
  const userId = res.locals.userIdValue;
  const { hashtag } = req.params;
  console.log(hashtag);

  try {
    const validate_hashtag = await db.query(
      `
      SELECT * FROM posts
      WHERE description
      LIKE $1;`,
      [`%#${hashtag}%`]
    );

    console.log(validate_hashtag.rows);

    if (validate_hashtag.rowCount === 0) {
      return res.status(404).send("Não existe essa hashtag");
    }

    res.locals.hashtag = hashtag;
    res.locals.userIdValue = userId;
  } catch (error) {
    return res.status(500).send(error.message);
  }
  next();
}
