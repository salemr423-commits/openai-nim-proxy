import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';

// Setup the NVIDIA NIM provider
const nim = createOpenAICompatible({
  name: 'nvidia-nim',
  baseURL: 'https://integrate.api.nvidia.com/v1',
  headers: {
    Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
  },
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: nim.chatModel('meta/llama-3.1-8b-instruct'), // Or your preferred NIM model
    messages,
  });

  return result.toDataStreamResponse();
}
