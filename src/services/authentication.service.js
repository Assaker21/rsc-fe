import { get, post } from "./request";

function login(payload) {
  return post("authentication/login", null, payload);
}

function register(payload) {
  return post("authentication/register", null, payload);
}

function logout() {
  return get("authentication/logout");
}

function authenticate() {
  return get("authentication");
}

export default { login, register, authenticate, logout };
