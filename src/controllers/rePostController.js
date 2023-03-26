import { createNewRePost } from "../repositories/rePostRepository.js";

export async function createRePost(_, res) {
    const { userIdValue } = res.locals;
    const { postId } = res.locals.value;
  
    try {
      await createNewRePost(userIdValue, postId);
  
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }