import { DuckDuckGoSearch } from '@langchain/community/tools/duckduckgo_search';
import { HumanMessage } from '@langchain/core/messages';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableLambda } from '@langchain/core/runnables';
import { ChatOllama } from '@langchain/ollama';

const tool = new DuckDuckGoSearch({ maxResults: 1 });

const llm = new ChatOllama({
  model: 'mistral',
  baseUrl: 'http://localhost:11434',
  temperature: 0,
  maxRetries: 2,
  // other params...
});

const prompt = ChatPromptTemplate.fromMessages([
  ['system', 'You are a helpful assistant.'],
  ['placeholder', '{messages}'],
]);

const llmWithTools = llm.bindTools([tool]);

const chain = prompt.pipe(llmWithTools);

const toolChain = RunnableLambda.from(async (userInput: string, config) => {
  const humanMessage = new HumanMessage(userInput);
  const aiMsg = await chain.invoke(
    {
      messages: [new HumanMessage(userInput)],
    },
    config
  );
  const toolMsgs = await tool.batch(aiMsg.tool_calls!, config);
  return chain.invoke(
    {
      messages: [humanMessage, aiMsg, ...toolMsgs],
    },
    config
  );
});
const x = async () => {
  const toolChainResult = await toolChain.invoke(
    'list at least 3 important events that happened in portugal history on 13th February'
  );
  console.log(toolChainResult.content);
};
if (require.main === module) {
  x();
}
