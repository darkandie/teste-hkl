export interface User {
  id?: number;
  name: string;
  cpf: string;
  email: string;
  telephone: string;
  address: {
    cep: string;
    street: string;
    city: string;
    number: string;
    state: string;
    neighborhood: string;
  }
}