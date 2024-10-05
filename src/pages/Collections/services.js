import { useMutation, useQuery } from "@tanstack/react-query";
import { backendClient, httpClientForIframe } from "../../httpClient";

export const useGetExperienceDataById = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["experience", id],
    queryFn: () =>
      httpClientForIframe.get(`/get_experience`, {
        params: { experience: id ? id : "EXP1000000038" },
      }),
  });
  return { data, error, isLoading };
};

export const useSetActionCall = () => {
  const { mutate, isLoading, data, error } = useMutation({
    mutationFn: async (payload) => {
      const response = await backendClient.post(
        "/player/send_socket_message",
        payload
      );
      return response.data;
    },
  });

  return { mutate, isLoading, data, error };
};

export const useSetProductChangeCall = () => {
  const { mutate, isLoading, data, error } = useMutation({
    mutationFn: async (payload) => {
      const response = await backendClient.post(
        "/player/send_socket_message",
        payload
      );
      return response.data;
    },
  });

  return { mutate, isLoading, data, error };
};
