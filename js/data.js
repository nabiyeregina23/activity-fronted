import { API_BASE_URL } from "./config.js";

async function request(path, method = "GET", body) {
  const options = { method };
  if (body !== undefined) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(API_BASE_URL + path, options);
  } catch (error) {
    throw new Error("Cannot reach the server. Check your internet and try again.");
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error("The server sent an unexpected response.");
  }

  if (!response.ok) {
    throw new Error(data.message || "The request failed.");
  }
  return data;
}

export const recordService = {
  async list() {
    return request("/api/records");
  },
  async get(id) {
    return request(`/api/records/${id}`);
  },
  async create(record) {
    return request("/api/records", "POST", record);
  },
  async update(id, record) {
    return request(`/api/records/${id}`, "PUT", record);
  },
  async remove(id) {
    return request(`/api/records/${id}`, "DELETE");
  }
};