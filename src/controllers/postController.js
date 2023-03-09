import {
  createNewPost,
  deleteUserPost,
  getAllPosts,
  getPostsByUser,
  updatePostDesc,
} from "../repositories/postsRepository.js";

export async function createPost(_, res) {
  const { userIdValue } = res.locals;
  const { link, description } = res.locals.value;

  try {
    await createNewPost(userIdValue, link, description);

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function getPosts(_, res) {
  const { userIdValue } = res.locals;

  try {
    const data = await getAllPosts(userIdValue);

    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function updatePost(_, res) {
  const { userIdValue } = res.locals;
  const { postId, description } = res.locals.value;

  try {
    await updatePostDesc(userIdValue, postId, description);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {
  const { userIdValue } = res.locals;
  const { postId } = req.body;

  try {
    await deleteUserPost(userIdValue, postId);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function getUserPosts(req, res) {
  const { userIdValue } = res.locals;
  const { id } = req.params;

  try {

    const data = await getPostsByUser(userIdValue, id);

    res.status(200).send(data.rows);

  } catch (error) {

    res.status(500).send(error.message);

  }
}
