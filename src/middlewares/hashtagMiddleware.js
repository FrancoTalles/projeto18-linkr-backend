import db from "../config/databaseConnection.js";

export async function checkHashtag(req, res, next) {
  const hashtag = req.params;

  try {
    const validate_hashtag = await db.query(
      `SELECT * FROM hashtag WHERE hashtag = $1;`,
      [hashtag]
    );

    if (validate_hashtag.rowCount === 0) {
      return res.status(404).send("Não existe essa hashtag");
    }

    res.locals.hashtag = hashtag;
  } catch (error) {
    return res.status(500).send(error.message);
  }
  next();
}
