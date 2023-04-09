/* eslint-disable turbo/no-undeclared-env-vars */
import { OpenAIApi } from "openai";
import { Configuration } from "openai";

const config = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(config);

export default openai;
