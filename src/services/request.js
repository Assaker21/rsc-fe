import axios from "axios";

async function request(method, endpoint, query, payload) {
  let url = process.env.REACT_APP_API_BASE_URL;
  try {
    const res = await axios({
      method,
      url: `${url}/${endpoint}${generateQuery(query)}`,
      data: payload,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(
      "endpoint",
      endpoint,
      "\nquery",
      query,
      "\npayload",
      payload,
      `\nresponse: status: ${res.status}`,
      res.data
    );

    return [res.status === 200, res.data];
  } catch (err) {
    console.log(
      "endpoint",
      endpoint,
      "\nquery",
      query,
      "\npayload",
      payload,
      `\nresponse: status: ${err.response.status}`,
      err.response.data
    );
    if (err.response.status == 401) {
      const event = new Event("not-authenticated");
      document.dispatchEvent(event);
    }
    return [false, err.response.data];
  }
}

function generateQuery(query) {
  return query
    ? Object.keys(query).reduce((acc, key) => {
        return (acc += `${acc ? "&" : "?"}${key}=${query[key]}`);
      }, "")
    : "";
}

export async function uploadFile(method, endpoint, query, file) {
  console.log("endpoint", endpoint, "\nquery", query, "\file", file);

  let url = process.env.REACT_APP_API_BASE_URL;
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios({
      method,
      url: `${url}/${endpoint}${generateQuery(query)}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return [res.status === 200, res.data];
  } catch (err) {
    if (err.response.status == 401) {
      const event = new Event("not-authenticated");
      document.dispatchEvent(event);
    }
    return [false, err.response.data];
  }
}

export function get(endpoint, query, payload) {
  return request("get", endpoint, query, payload);
}

export function post(endpoint, query, payload) {
  return request("post", endpoint, query, payload);
}

export function put(endpoint, query, payload) {
  return request("put", endpoint, query, payload);
}

export function remove(endpoint, query, payload) {
  return request("delete", endpoint, query, payload);
}
