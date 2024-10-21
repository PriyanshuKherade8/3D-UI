import { useMutation, useQuery } from "@tanstack/react-query";
import {
  backendClient,
  httpClientForIframe,
  httpClientForIframeForShowcase,
} from "../../httpClient";

export const useGetExperienceDataById = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["experience", id],
    queryFn: () =>
      httpClientForIframeForShowcase.get(`/get_experience`, {
        params: { experience: id },
      }),
    refetchOnWindowFocus: false,
  });
  return { data, error, isLoading };
};
