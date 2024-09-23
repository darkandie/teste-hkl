import api from "@/api/axios";

export const useApi = () => ({
  getAllUser: async () => {
    const response = await api.get("/users");
    return response.data
  }
})