import axios from "axios";
axios.defaults.baseURL = "http://localhost:8081";

export default async function Login(user) {
  let url = "/login";
  try {
    const result = await axios.post(url, user);
    return result.data;
  } catch (error) {
    return null;
  }
}
