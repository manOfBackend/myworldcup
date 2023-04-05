import { OpenAIApi } from "openai";
import { Configuration } from "openai";

const config = new Configuration({
  organization: process.env.OPEN_AI_ORGANIZATION_ID,
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(config);

export default openai;