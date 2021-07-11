import { articleAPI } from '@/apis';

const fieldNames = [
  'key',
  'x-amz-algorithm',
  'x-amz-credential',
  'x`-amz-date',
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

const useImageUpload = (id: number) => {
  const uploadSingleImage = (image: IImageDict) =>
    new Promise<string>((resolve) => {
      articleAPI
        .putPresignedURL(id, `image_${Math.floor(Math.random() * 1000000)}`)
        .then(async (res) => {
          const filename = res.data.file_name;
          const url = res.data.response.url;
          const fields = res.data.response.fields;

          // set body fields (for s3 authentication)
          const body = new FormData();
          fieldNames.forEach((key) => {
            body.append(key, fields[key]);
          });

          // append image file
          const img = {
            uri: image.uri,
            type: image.mime,
            name: filename as string,
          };
          body.append('file', img);

          // send file to s3
          await fetch(url, {
            method: 'POST',
            body: body,
          })
            .then((r: any) => {
              resolve(r.headers['map']['location']);
            })
            .catch((e) => {
              console.log('ERROR: inner', e);
            });
        })
        .catch((err) => {
          console.log('ERROR: ext', err);
        });
    });

  const uploadMultipleImages = async (images: IImageDict[]) => {
    const promiseArray: Promise<string>[] = images.map((image) => {
      return uploadSingleImage(image);
    });

    // Promise.all(promiseArray).then((urls) => {
    //   resolve(urls);
    // });

    return Promise.all(promiseArray);
  };

  return { uploadSingleImage, uploadMultipleImages };
};

export default useImageUpload;

/**
 * const presignedUrl = await ArticleApi.getPresignedUrl();
 * const imgs = await Fetch(presignedUrl,{})
 * return imgs
 */
