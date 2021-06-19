export const isValidUsername = (id: string): boolean =>
  /^[a-z0-9]{5,20}$/.test(id);

export const isValidPassword = (pw: string): boolean =>
  /^(?=.*[0-9])(?=.*[a-z]+)(?=.*[A-Z]+).{8,16}$/.test(pw);

export const isValidPasswordConfirm = (pw: string, pc: string): boolean =>
  pw === pc && pw.length >= 1;

export const isValidNickname = (nn: string): boolean => nn.length >= 2;

export const isValidEmail = (em: string): boolean => em.length >= 1;

export const validateLink = (str: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return pattern.test(str);
};
