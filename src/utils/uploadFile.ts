// import env from '@beam-australia/react-env';

const baseMediaUrl = process.env.BASE_MEDIA_URL;
const baseApiUrl = process.env.BASE_API;

export interface UploadedFile {
  id: string;
  blurHash?: string;
}

export const uploadFile = async (
  file: File,
  options: { type?: 'image' | 'audio' | 'avatar'; transparent?: boolean } = {},
): Promise<UploadedFile> => {
  const { type = 'image', transparent = false } = options;

  const formData = new FormData();
  formData.append('file', file);

  const result = await fetch(`${baseApiUrl}/${type}${transparent ? `?transparent=true` : ''}`, {
    method: 'POST',
    body: formData,
  });
  const { data } = await result.json();
  return data;
};

export const getMediaUrl = (id: string, isAudio = false): string => {
  return `${baseMediaUrl}/${isAudio ? 'audio' : 'image'}/${id}`;
};
