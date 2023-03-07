import { createNewPost, deleteUserPost, getAllPosts, updatePostDesc } from "../repositories/postsRepository.js";

export async function createPost(_, res) {
  const { userIdValue } = res.locals;
  const { link, description } = res.locals.value;

  const data = {
    userIdValue,
    link,
    description,
  };

  try {
    await createNewPost(data);

    res.SendStatus(201);
  } catch (error) {
    console.error(error);
    res.SendStatus(500);
  }
};

export async function getPosts(_, res) {
  const { userIdValue } = res.locals;

    try {
        const data = await getAllPosts(userIdValue);

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.SendStatus(500);
    }
};

export async function updatePost(_, res) {
  const { userIdValue } = res.locals;
  const { postId, description } = res.locals.value;

  const data = {
    userIdValue,
    postId,
    description
  };

  try {
    await updatePostDesc(data);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.SendStatus(500);
  }
};

export async function deletePost(_, res) {
  const { userIdValue } = res.locals;
  const { postId } = res.locals.value;

  const data = {
    userIdValue,
    postId
  };

  try {
    await deleteUserPost(data);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.SendStatus(500);
  }
};
