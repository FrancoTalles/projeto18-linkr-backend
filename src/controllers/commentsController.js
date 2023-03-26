import {
  createComment,getPostComments
} from "../repositories/commentsRepository.js";

export async function insertComment(_, res) {
  const { userIdValue } = res.locals;
  const { postId, comment } = res.locals.value;

  try {
    await createComment(userIdValue, postId, comment);

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function getComments(req, res) {
  const { id } = req.params;

  try {
    const data = await getPostComments(id);

    res.status(200).send(data.rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}