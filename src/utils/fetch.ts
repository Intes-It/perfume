import { instance } from "@utils/_axios";

export const GET = async (url: string) => {
  return await instance.get(url);
};
export const POST = async (url: string, data: any) => {
  return await instance.post(url, data);
};
export const PUT = async (url: string, data: Record<any, unknown>) => {
  return await instance.put(url, data);
};
export const DELETE = async (url: string) => {
  return await instance.delete(url);
};
export const PATCH = async (url: string, data: Record<any, unknown>) => {
  return await instance.patch(url, data);
};
