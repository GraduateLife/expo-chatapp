import { useQuery } from '@tanstack/react-query';

const SendPrompt = async (prompt: string) => {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3.2',
      prompt: prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // First try to get the content type
  const contentType = response.headers.get('Content-Type');
  // If it's JSON, parse it as JSON, otherwise return text
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    return await response.text();
  }
};

export const useSendPrompt = (promptText: string) => {
  return useQuery({
    queryKey: ['send-prompt', promptText],
    queryFn: async () => await SendPrompt(promptText),
    // Optional configuration
    retry: 1,
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
    refetchOnWindowFocus: false,
  });
};
