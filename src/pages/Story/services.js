import { useQuery } from "@tanstack/react-query";
import { httpClientForIframeForStory } from "../../httpClient";

export const useGetExperienceDataByIdForStory = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["experience_story", id],
    queryFn: () =>
      httpClientForIframeForStory.get(`/get_experience`, {
        params: { experience: id },
      }),
    refetchOnWindowFocus: false,
  });
  return { data, error, isLoading };
};
