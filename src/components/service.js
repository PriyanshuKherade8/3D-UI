import { useQuery } from "@tanstack/react-query";
import httpClient from "../httpClient";

export const useGetProductListData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"], // Change the query key to 'todos'
    queryFn: () => httpClient.get("/todos"), // Update endpoint
  });

  return { data, error, isLoading };
};
