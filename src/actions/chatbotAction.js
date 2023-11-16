import axios from "axios";

import { SERVER_BASE_URL } from "./index";
const API_SERVER_URL = SERVER_BASE_URL + "/api";

export const getQuestionList = async (userid) => {
  return await axios.get(`${API_SERVER_URL}/chatbot/top-questions`, { userid });
};

export const getChatHistory = async (userid, historyId) => {
  return await axios.get(`${API_SERVER_URL}/chatbot/historie`, {
    params: { userid, historyId },
  });
};

export const getChatHistorys = async (userid) => {
  return await axios.get(`${API_SERVER_URL}/chatbot/histories`, {
    params: { userid },
  });
};

export const aiAnswer = async (userid, historyId, question) => {
  return await axios.post(`${API_SERVER_URL}/chatbot/ai-answer`, {
    userid,
    historyId,
    question,
  });
};

// export const receivermsg = async (content) => {
//   return await axios.get(`${API_SERVER_URL}/chatbot/sendmsg`, {
//     content,
//   });
// };
