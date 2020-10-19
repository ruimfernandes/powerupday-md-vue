import {
  get,
  head,
  values
} from 'lodash';
import normalize from 'json-api-normalizer';
import constants, {
  killSwitchStatus,
  killSwitchStatusText,
} from '../common/constants';

// const clearItem = (key) => localStorage.removeItem(key);
const getItem = (key) => localStorage.getItem(key);
const storeItem = (key, value) => localStorage.setItem(key, value);
const apiToken = () => getItem('signInToken') || getItem('identificationToken');

const apiRoot = 'http://merchants.utrust.lvh.me:4000/api';

const defaultFetchOptions = () => ({
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Authorization: `Bearer ${apiToken()}`,
  },
});

/**
 * Creates a hidden link and clicks it so we can use the browser
 * native behaviour to download the received file
 */
const triggerDownload = (blob, { fileName, type }) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileName}.${type}`);
  document.body.appendChild(link);

  link.click();
  link.remove();
};

const handleBlobContent = (response) =>
  response.blob().then((blob) => ({ blob, response, json: null }));

const handleJsonContent = (response) =>
  response.json().then((json) => ({ json, response, blob: null }));

const handleBlobResponse = (blob, response, blobOptions) => {
  const { ok, statusText, status } = response;
  if (!ok) {
    return { error: `${status} - ${statusText}` };
  }

  triggerDownload(blob, blobOptions);

  return { response: response.statusText };
};

const handleJsonResponse = (json, response, endpoint, camelizeKeys) => {
  const normalized = normalize(json, { endpoint, camelizeKeys });
  if (response.ok) return { response: normalized };

  const errorDetail = get(json, 'errors[0].detail');
  if (response.status === 401 && errorDetail === constants.invalid_token)
    return Promise.reject(errorDetail);
  if (response.status === 404) {
    return { error: constants.NOT_FOUND };
  }
  if (response.status === killSwitchStatus) {
    return { error: { message: killSwitchStatusText } };
  }

  return { error: errorDetail || 'Something bad happened' };
};

const callApi = (endpoint, fetchOptions, camelizeKeys = true, blobOptions) => {
  const fullUrl = `${apiRoot}/${endpoint}`;

  return fetch(fullUrl, { ...defaultFetchOptions(), ...fetchOptions })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (contentType === 'text/csv') {
        return handleBlobContent(response);
      }
      return handleJsonContent(response);
    })
    .then(({ json, response, blob }) => {
      if (blob) return handleBlobResponse(blob, response, blobOptions);

      return handleJsonResponse(json, response, endpoint, camelizeKeys);
    })
    .catch((error) => {
      return { error };
    });
};

const signIn = (email, password) => {
  return callApi('session', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        type: 'session',
        attributes: { email, password },
      },
    }),
  })
};

const authenticate = async (email, password) => {
  const { response, error } = await signIn(email, password);
  if (response) {
      const { token } = head(values(response.session)).attributes;
      storeItem('signInToken', token);

      return {success: token};
  }
  else {
    throw {error};
  }
}

export {
  apiToken,
  authenticate,
  signIn
};