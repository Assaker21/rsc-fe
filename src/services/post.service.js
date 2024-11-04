import { uploadFile, post, get } from "./request";

async function uploadImage(image) {
  return uploadFile("post", "posts/image", null, image);
}

async function createPost(data, query) {
  return post("posts", query, data);
}

async function getPosts(query) {
  return get("posts", query);
}

async function getPost(postId) {
  return get(`posts/${postId}`);
}

async function addInteraction(postId, interaction, payload) {
  return post(`posts/${postId}/interactions/${interaction}`, null, payload);
}

export default { uploadImage, createPost, getPosts, getPost, addInteraction };
