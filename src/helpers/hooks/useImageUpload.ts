import { AxiosResponse } from 'axios';

import requester, { requester2 } from '@/apis/BaseInstance';
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

interface IImageDict {
  uri: string;
  mime: string;
}
// type TUseImageUpload = ;

const useImageUpload = (type: APItype, id?: number) => {
  const createPresignedPost = (id?: number): Promise<AxiosResponse> => {
    const ID = type === APItype.user ? '' : `${id}/`;
    return requester.put(`${type}/${ID}create_presigned_post/`);
  };

  const uploadSingleImage = async (image: TShortImage) => {
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
          return r.headers['map']['location'];
        });
      })
      .catch((err) => {
        console.log('IMAGE UPLOAD ERROR', err);
      });
  };

  const uploadMultipleImages = async (images: TShortImage[]) => {
    return await Promise.all(
      images.map((image) => {
        console.log('everything');
        return uploadSingleImage(image);
      })
    );
  };

  return { uploadSingleImage, uploadMultipleImages };
};

export default useImageUpload;
