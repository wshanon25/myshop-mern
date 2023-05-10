import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWZhYWZkNDNkODM3ZmZiMDdlZTllYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NjQ1ODcxMCwiZXhwIjoxNjQ2NzE3OTEwfQ.EiS__NPS_7y6US99rzFTP_uSRzQ1RueBdKImvBpPDzs";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
