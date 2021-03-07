export const validateID = (id: string): boolean => /^[a-z0-9]{5,20}$/.test(id);

export const validatePW = (pw: string): boolean =>
  /^(?=.*[0-9])(?=.*[a-z]+)(?=.*[A-Z]+).{8,16}$/.test(pw);

export const validatePC = (pw: string, pc: string): boolean =>
  pw.localeCompare(pc) === 0 && pw.length >= 1;

export const validateNN = (nn: string): boolean => nn.length >= 2;

export const validateEM = (em: string): boolean => em.length >= 1;

export const validateCD = (CD: string, orgCD: string): boolean =>
  CD.localeCompare(orgCD) === 0;
