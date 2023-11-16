import axios from "axios";

import { SERVER_BASE_URL } from "./index";
const API_SERVER_URL = SERVER_BASE_URL + "/api";

export const getQuickUserList = async (userid) => {
  return await axios.get(`${API_SERVER_URL}/friend/quicklist`, { userid });
};

export const getAllContactList = async (userid) => {
  return await axios.get(`${API_SERVER_URL}/friend/allContacts`, {
    params: { userid },
  });
};

export const getFriends = async (userid) => {
  return await axios.get(`${API_SERVER_URL}/friend/getFriends`, {
    params: { userid },
  });
};

export const addRequest = async (userid, otherid) => {
  return await axios.post(`${API_SERVER_URL}/friend/addRequest`, {
    userid,
    otherid,
  });
};

export const acceptResponse = async (userid, otherid, notifyId) => {
  return await axios.post(`${API_SERVER_URL}/friend/acceptResponse`, {
    userid,
    otherid,
    notifyId,
  });
};
export const rejectResponse = async (userid, otherid, notifyId) => {
  return await axios.post(`${API_SERVER_URL}/friend/rejectResponse`, {
    userid,
    otherid,
    notifyId,
  });
};

export const deleteFriend = async (userid, otherid) => {
  return await axios.post(`${API_SERVER_URL}/friend/removeFriend`, {
    userid,
    otherid,
  });
};
