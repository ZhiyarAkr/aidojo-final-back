import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();
const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

class MyHfInference {
  static instance: HfInference | null = null;

  static getInstance() {
    if (this.instance === null) {
      // env.cacheDir = './.chache';
      this.instance = new HfInference(HF_ACCESS_TOKEN);
    }
    return this.instance;
  }
}

export default MyHfInference;
