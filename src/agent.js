import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "http://localhost:8080";

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set("authorization", `Bearer ${token}`);
  }
};

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody)
};

const Notes = {
  all: () => requests.get("/notes"),
  one: id => requests.get(`/note/${id}`),
  update: (id, note) => requests.put(`/note/${id}`, note),
  remove: id => requests.del(`/note/${id}`),
  create: note => requests.post("/note", note)
};

const Auth = {
  current: () => requests.get("/users/"),
  login: (email, password) =>
    requests.post("/users/signin", { user: { email, password } }),
  register: (username, email, password) =>
    requests.post("/users/signup", { user: { username, email, password } }),
  save: user => requests.put("/user", { user })
};

export default {
  Auth,
  Notes,
  setToken: _token => {
    token = _token;
  }
};
