export const baseUrl: string = "http://localhost:3000";
export const checkResponse = (res: { ok: unknown; json: () => unknown; status: unknown; }) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export function request(url: string, options?: object) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse);
}