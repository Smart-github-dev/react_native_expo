import axios from "axios";
export const SERVER_BASE_URL = "http://192.168.133.136:2002";
export const API_SERVER_URL = SERVER_BASE_URL + "/api";
export const navigationKeys = {
  SPLASH: "Splash",
  HOME: "Home",
  LOGIN: "Login",
  VERIFICATION: "Verification",
  USERNAME: "UserName",
  PASSWORD: "Password",
  EMAIL: "Email",
  NOTIFICATION: "Notification",
  RESETPASSWORD: "ResetPassword",
  SIGNUP: "SignUpScreen",
  DISPLAYNAME: "DisplayName",
  PROFILE: "Profile",
  SEARCH: "Search",
  SEARCHFRIEND: "searchFriend",
  ADDFRIEND: "AddFriend",
  CHATBOT: "CHATBOT",
  CHATBOTAI: "chatbotAI",
  CHATBOTROOM: "chatbotAI2",
  CHATBOTHISTORY: "CHATBOTHISTORY",
  USERINFO: "userInfo",
  MEMBERSHIP: "membership",
  MAINPAGE: "MainPage",
  TIMING: "Events",
  FRIEND: "Friend",
};

export const sendOtp = (phoneNumber) => {
  return new Promise((resolve) => {
    resolve({
      data: {
        success: true,
        message: `OTP sent successfully`,
        payload: "result",
      },
    });
  });

  return axios.post(`${API_SERVER_URL}/otp/send-otp`, {
    phoneNumber,
  });
};

export const sendEamilOtp = async (email) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        success: true,
        message: `OTP sent successfully`,
        payload: "result",
      },
    });
  });
  return await axios.post(`${API_SERVER_URL}/otp/send-email-otp`, {
    email,
  });
};

export const verifyOtp = async (id, code) => {
  // return new Promise((resolve, reject) => {
  //   resolve({
  //     data: {
  //       success: true,
  //       message: `OTP sent successfully`,
  //       payload: "result",
  //     },
  //   });
  // });
  return await axios.post(`${API_SERVER_URL}/otp/verify-otp`, { id, code });
};

export const choose_password = async (password) => {
  // return new Promise((resolve) => {
  //   resolve({ data: { success: true } });
  // });
  return await axios.post(`${API_SERVER_URL}/auth/choose-password`, {
    password,
  });
};

export const verifyExistsUser = async (data) => {
  return await axios.post(`${API_SERVER_URL}/auth/verify-exists`, data);
};

export const signUp = async (data) => {
  // return new Promise((resolve) => {
  //   resolve({
  //     data: {
  //       success: true,
  //       message: "User was registered successfully!",
  //     },
  //   });
  // });
  return await axios.post(`${API_SERVER_URL}/auth/sign-up`, data);
};

export const profile_update = async (data) => {
  return new Promise((resolve) => {
    resolve({ data: { message: "successfully", success: true } });
  });
  return await axios.post(`${API_SERVER_URL}/user/profile-update`, data);
};

export const getNotifications = async (userId) => {
  // return new Promise((resolve) => {
  //   resolve({ data: { success: true, data: Notifications } });
  // });
  return await axios.post(`${API_SERVER_URL}/notify/get`, { userId });
};

export const upload_avatar = async (uri, userid) => {
  // return new Promise((resolve) => {
  //   resolve({ data: { success: true, avatar: userid } });
  // });
  const formData = new FormData();
  formData.append("image", {
    uri: uri,
    type: "image/jpeg",
    name: `${userid}`,
  });
  formData.append("userid", userid);
  return await axios.post(`${SERVER_BASE_URL}/upload-url`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Set the content type header for the request
    },
  });
};
