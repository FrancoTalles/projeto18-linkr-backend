import e from "cors";
import db from "../config/databaseConnection.js";

export async function followStatus(req, res) {
  const idUser = res.locals.userIdValue;
  const idUserViewed = res.locals.idUserViewed;

  try {
    const followSearch = await db.query(
      `
        SELECT * 
        FROM followers 
        WHERE "userId" = $1 
        AND "followedUser" = $2;`,
      [idUser, idUserViewed]
    );
    if (followSearch.rowCount === 0) {
      return res.status(200).send(false);
    }
    return res.status(200).send(true);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function toggleFollow(req, res) {
  const idUser = res.locals.userIdValue;
  const idUserViewed = res.locals.idUserViewed;
  const status = res.locals.statusFollow;

  try {
    if (status) {
      const followDelete = await db.query(
        `
              DELETE
              FROM followers
              WHERE "userId" = $1
              AND "followedUser" = $2;
          `,
        [idUser, idUserViewed]
      );
      return res.sendStatus(200);
    } else {
      const followCreate = await db.query(
        `
              INSERT
              INTO followers ("userId", "followedUser")
              VALUES ($1, $2);
          `,
        [idUser, idUserViewed]
      );
      return res.sendStatus(201);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getFollowers(req, res) {
  const { userIdValue } = res.locals;

  const { rows: followers } = await db.query(
    `
    SELECT * 
    FROM followers 
    WHERE "userId" = $1 
    `, [userIdValue]
  );

  res.send(followers);
}