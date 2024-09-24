import api from "@/api/axios";
import { User } from "@/types/user";

export const useApi = () => ({
  getAllUser: async () => {
    const response = await api.get("/users");
    return response.data
  },
  createNewUser: async (data: User) => {
    await api.post('/users', {
      name: data.name,
      cpf: data.cpf,
      telephone: data.telephone,
      email: data.email,
      address: {
        street: data.address.street,
        number: data.address.number,
        cep: data.address.cep,
        city: data.address.city,
        neighborhood: data.address.neighborhood,
        state: data.address.state
      }
    })
  },
  updateUser: async (data: User) => {
    await api.put(`/users/${data.id}`, {
      name: data.name,
      cpf: data.cpf,
      telephone: data.telephone,
      email: data.email,
      address: {
        street: data.address.street,
        number: data.address.number,
        cep: data.address.cep,
        city: data.address.city,
        neighborhood: data.address.neighborhood,
        state: data.address.state
      }
    })
  },
  deleteUser: async (id: string) => {
    await api.delete(`/users/${id}`);
  }
})