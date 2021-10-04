import { TIME_OUT } from './config';
export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIME_OUT)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second(s)`));
    }, s * 1000);
  });
};
