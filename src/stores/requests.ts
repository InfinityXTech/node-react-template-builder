import fetch from 'isomorphic-fetch';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  OPTIONS: '',
};

export function post(url: any, data: any) {
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  }).then((response: any) => response);
}

export function get(url: any) {
  return fetch(url, {
    method: 'GET',
    headers,
  }).then((response: any) => response.json());
}
