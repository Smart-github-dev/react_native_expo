import axios from "axios";
import { SERVER_BASE_URL } from "./index";
const API_SERVER_URL = SERVER_BASE_URL + "/api";

ZODIAC_SIGNS = {
  aries: 1,
  taurus: 2,
  gemini: 3,
  cancer: 4,
  leo: 5,
  virgo: 6,
  libra: 7,
  scorpio: 8,
  sagittarius: 9,
  capricorn: 10,
  aquarius: 11,
  pisces: 12,
};
export const getHoroscopeToday = async (sign) => {
  const { data } = await axios.get(
    `${API_SERVER_URL}/horoscope/today/${ZODIAC_SIGNS[sign.toLowerCase()]}`
  );

  return data.data;
};

export const getTodayHints = async (sign) => {
  const { data } = await axios.get(
    `${API_SERVER_URL}/horoscope/hints/${sign.toLowerCase()}`
  );

  return data.data;
};

export const getPlanetsReport = async (data) => {
  return await axios.post(`${API_SERVER_URL}/horoscope/planets/report`, data);
};

export const getPlanets = async (data) => {
  return await axios.post(`${API_SERVER_URL}/horoscope/planets`, data);
};

export const getPrediction = async (zodiacName, timeZone, type) => {
  return await axios.get(
    `${API_SERVER_URL}/horoscope/sun_sign_prediction/${type}/${zodiacName}`,
    { params: { timeZone } }
  );
};
