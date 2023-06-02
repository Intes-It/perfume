import { instance } from '@utils/_axios';

export const GET = async (url: string) => {
  return await instance.get(url);
};
export const POST = async (url: string, data: any) => {
  return await instance.post(url, data);
};
export const PUT = async (url: string, data: Record<any, unknown>) => {
  return await instance.put(url, data);
};
export const DELETE = async (url: string, data: any) => {
  return await instance.delete(url, {data});
};
export function getCookie(name:string) {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name + '='));

  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}