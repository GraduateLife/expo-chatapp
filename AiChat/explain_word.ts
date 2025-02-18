import { PromptTemplate } from '@langchain/core/prompts';
import { Ollama } from '@langchain/ollama';

const prompt = PromptTemplate.fromTemplate(
  `explain the following {input_language} word: {input},
  first explain the word, then tell me how to break it down into syllables,
  last give at least {example_count} example of how to use it\n`
);

const llm = new Ollama({
  model: 'mistral',
  baseUrl: 'http://localhost:11434',
  temperature: 0,
  maxRetries: 2,
  // other params...
});

const chain = prompt.pipe(llm);
const x = async () => {
  const result = await chain.invoke({
    input_language: 'european portuguese',
    input: 'bacalhau',
    example_count: 2,
  });
  console.log(result);
};
if (require.main === module) {
  x();
}
