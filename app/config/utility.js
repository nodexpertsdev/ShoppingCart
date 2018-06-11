import { AsyncStorage } from 'react-native';

const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneformat = /^\d{10}$/;
const nameformat = /^[a-zA-Z ]{2,30}$/;
const monthName = ['Jan', 'Feb', 'Mar',
  'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec'];


export const parseDate = date => `${parseInt(date.getMonth() + 1, 10)}/${date.getDate()}/${date.getFullYear()}`;

export const parseDateInStdFrmt = date => `${date.getFullYear()}/${parseInt(date.getMonth() + 1, 10)}/${date.getDate()}`;

export const pad0inOneDigitNumber = data => (`0${data}`).slice(-2);

export const parseDateInMMMFrmt = (date) => {
  if (!date) return null;
  const tempDate = new Date(date);
  return (`${pad0inOneDigitNumber(parseInt(tempDate.getMonth() + 1, 10))}/${pad0inOneDigitNumber(parseInt(tempDate.getDate(), 10))}/${tempDate.getFullYear()}  `);
};

export const isDateGreater = (data1, date2) => (data1) > date2;

export const isValidMail = email => email.match(mailformat);

export const isValidPhone = phone => phone.match(phoneformat);

export const isValidName = name => name.match(nameformat);

/**
 * @description get the value of the key from localStorage
 * @param {*} key key whose value to be fetched
 * @param {*} callback function execute after the item is fetched successfully
 */
export const getItem = (key, callback) => {
  try {
    AsyncStorage.getItem(`${key}`, (err, result) => {
      callback(err, result);
    });
  } catch (error) {
    // Countly.log('Error while getting', key);
    return null;
  }
  return null;
};

/**
 * @description store the value with key in local Storage
 * @param {*} key key for the data to be store
 * @param {*} value value of the data
 * @param {*} callback function execute after the object is successfully saved
 */
export const setItem = (key, value, callback) => {
  try {
    AsyncStorage.setItem(`${key}`, value, (result) => {
      if (callback) {
        callback(result);
      }
    });
  } catch (error) {
    // Countly.log('Error while storing', key, value);
  }
};

/**
 * @description request to server
 * @param {*} query query string
 */
export const request = (query, variables, token = null) => {
  const url = 'http://writso.com:4000/graphql';
  console.log(query, '   ', variables);
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', authentication: token },
    body: JSON.stringify({ query, variables }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.errors) {
        return response.errors;
      }
      return response.data;
    });
};

export const getUnusedColorData = (MainData, removeData) => {
  if (!removeData.length) return MainData;
  return (MainData.filter((data, index) => (removeData.indexOf(index) < 0)));
};
