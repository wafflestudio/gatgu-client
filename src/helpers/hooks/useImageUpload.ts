import { AxiosResponse } from 'axios';

import apiClient from '@/apis/apiClient';
import { emptyURL } from '@/constants/image';
import { APItype } from '@/enums/image';
import { TShortImage } from '@/types/shared';

const fieldNames = [
  'key',
  'x-amz-algorithm',
  'x-amz-credential',

  'x-amz-date',
  'x-amz-security-token',
  'policy',
  'x-amz-signature',
];

/* TODO:
        remove random key generator when api will change
*/

const useImageUpload = (type: APItype, id?: number) => {
  const createPresignedPost = (id?: number): Promise<AxiosResponse> => {
    const ID = type === APItype.user ? '' : `${id}/`;
    return apiClient.put(`${type}/${ID}create_presigned_post/`);
  };

  const uploadSingleImage = async (image: TShortImage) => {
    console.log('UPLOAD');
    return await createPresignedPost(id)
      .then(async (res) => {
        const filename = res.data.response.fields.key;
        const fields = res.data.response.fields;
        const url = res.data.response.url;

        // set body fields (for s3 authentication)
        const body = new FormData();
        fieldNames.forEach((key) => {
          body.append(key, fields[key]);
        });

        // append image file
        const img = {
          uri: image.path,
          type: image.mime,
          name: filename as string,
        };
        body.append('file', img);

        // send file to s3
        return await fetch(url, {
          method: 'POST',
          body: body,
        }).then((r: any) => {
          if (r['ok']) return r.headers['map']['location'];
          else {
            return emptyURL;
          }
        });
      })
      .catch((err) => {
        console.error('IMAGE UPLOAD ERROR', err.message);
      });
  };

  const uploadMultipleImages = async (images: TShortImage[]) => {
    return await Promise.all(
      images.map((image) => {
        if (image.mime === 'uploaded') {
          return new Promise<string>((resolve) => resolve(image.path));
        } else return uploadSingleImage(image);
      })
    );
  };

  return { uploadSingleImage, uploadMultipleImages };
};

export default useImageUpload;
