export const validateCEP = (cep: string) => {
  const cepRegex = /^\d{5}-\d{3}$|^\d{8}$/;
  return cepRegex.test(cep);
};