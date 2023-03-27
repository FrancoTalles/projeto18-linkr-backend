import db from "../config/databaseConnection.js";

export async function statusValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const { idUserViewed } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await db.query(`SELECT * FROM session WHERE token = $1`, [
      token,
    ]);

    if (session.rowCount === 0) {
      return res.status(404).send("O usuario não está logado");
    }

    res.locals.userIdValue = session.rows[0].userId;
    res.locals.idUserViewed = idUserViewed;
    next();
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export async function toggleValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const { idUserViewed, follow } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await db.query(`SELECT * FROM session WHERE token = $1`, [
      token,
    ]);

    if (session.rowCount === 0) {
      return res.status(404).send("O usuario não está logado");
    }

    res.locals.userIdValue = session.rows[0].userId;
    res.locals.idUserViewed = idUserViewed;
    res.locals.statusFollow = follow;
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
