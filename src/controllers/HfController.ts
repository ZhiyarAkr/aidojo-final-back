import { Request, Response } from "express";
import { Controller, Req, Res, Post } from "@decorators/express";
import MyHfInference from "../model/MyHfInference";

@Controller("/model")
export default class HfController {
  @Post("/ar")
  async getModelResponse(@Req() req: Request, @Res() res: Response) {
    let inputs: string = req.body.content;
    const hf = MyHfInference.getInstance();

    try {
      let result = await hf.request({
        model: "malmarjeh/t5-arabic-text-summarization",
        // @ts-ignore
        inputs,
        parameters: {
          min_length: 20,
          repetition_penalty: 5,
          truncation: "only_first",
        },
      });
      return res.json({
        result: result,
      });
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        message: "something went wrong",
      });
    }
  }

  @Post("/en")
  async getModelResponseBart(@Req() req: Request, @Res() res: Response) {
    let inputs: string = req.body.content;
    let isShort: boolean = req.body.isShort;
    let min_length = isShort ? 20 : 80;
    const hf = MyHfInference.getInstance();

    try {
      let result = await hf.summarization({
        model: "facebook/bart-large-cnn",
        // @ts-ignore
        inputs,
        parameters: {
          min_length,
          max_length: 100,
          // @ts-ignore
          truncation: "only_first",
        },
      });
      return res.json({
        result: result,
      });
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        message: "something went wrong",
      });
    }
  }

  @Post("/enar")
  async getModelResponseEnAr(@Req() req: Request, @Res() res: Response) {
    let inputs: string = req.body.content;
    const hf = MyHfInference.getInstance();

    try {
      let result = await hf.translation({
        model: "Helsinki-NLP/opus-mt-en-ar",
        // @ts-ignore
        inputs,
        // @ts-ignore
        parameters: {
          truncation: "only_first",
        },
      });
      //   let pipe = await TranslationPipeline.getInstance();
      //   let result = pipe(inputs);
      return res.json({
        result: result,
      });
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        message: "something went wrong",
      });
    }
  }

  @Post("/qa")
  async getModelResponseQa(@Req() req: Request, @Res() res: Response) {
    let question: string = req.body.question;
    let context: string = req.body.context;

    const hf = MyHfInference.getInstance();
    console.log(`${question}, ${context}`);

    try {
      let result = await hf.questionAnswering({
        model: "deepset/roberta-base-squad2",
        // @ts-ignore
        inputs: {
          question,
          context,
        },
      });
      console.log(result);
      return res.json({
        result: result,
      });
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        message: "something went wrong",
      });
    }
  }

  @Post("/ld")
  async getModelResponseLd(@Req() req: Request, @Res() res: Response) {
    let inputs: string = req.body.inputs;
    const hf = MyHfInference.getInstance();

    try {
      let result: Array<Array<LdResponse>> = await hf.request({
        model: "papluca/xlm-roberta-base-language-detection",
        // @ts-ignore
        inputs,
        parameters: {
          truncation: "only_first",
        },
      });
      result[0].sort((a, b) => {
        return b.score - a.score;
      });
      return res.json({
        result: result[0][0].label,
      });
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        message: "something went wrong",
      });
    }
  }

  @Post("/ke")
  async getModelResponseKe(@Req() req: Request, @Res() res: Response) {
    let inputs: string = req.body.inputs;
    const hf = MyHfInference.getInstance();

    try {
      let result: Array<KeResponse> = await hf.request({
        model: "yanekyuk/bert-uncased-keyword-extractor",
        // @ts-ignore
        inputs,
      });

      return res.json({
        result: result,
      });
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        message: "something went wrong",
      });
    }
  }

  @Post("/smae")
  async getModelResponseSmAE(@Req() req: Request, @Res() res: Response) {
    let inputs: string = req.body.inputs;
    const hf = MyHfInference.getInstance();

    try {
      let result = await hf.summarization({
        model: "marefa-nlp/summarization-arabic-english-news",
        // @ts-ignore
        inputs,
      });
      console.log(result);
      return res.json({
        result: result,
      });
    } catch (e) {
      console.log(e);
      return res.status(404).json({
        message: "something went wrong",
      });
    }
  }
}

interface LdResponse {
  label: string;
  score: number;
}

interface SmResponseAE {
  summary_text: string;
}

interface KeResponse {
  entitiy_group: string;
  score: number;
  word: string;
  start: number;
  end: number;
}
