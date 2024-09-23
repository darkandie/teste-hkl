"use client";

import { useQuery } from "react-query";
import { useApi } from "@/hooks/useApi";

export default function Home() {
  const api = useApi();
  
  const {data, isLoading} = useQuery({
    queryKey: ["users"],
    queryFn: api.getAllUser
  })

  console.log(data, 'dados dos usuários');

  return (
    <h1>data.</h1>
  );
}
