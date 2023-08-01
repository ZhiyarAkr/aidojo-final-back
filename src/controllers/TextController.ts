import { Request, Response } from "express";
import { Controller, Req, Res, Post, Get, Delete } from "@decorators/express";
import AuthMiddleware, { RequestWithUser } from "../middleware/AuthMiddleware";
import User from "../entity/User";
import Text from "../entity/Text";
import { Equal } from "typeorm";
import { verifyText } from "../util/verifyText";

// @ts-ignore
@Controller("/text")
export default class TextController {
  //@ts-ignore
  @Get("/", [AuthMiddleware])
  async getAllTexts(@Req() req: RequestWithUser, @Res() res: Response) {
    let user = req.user;
    try {
      let u = await User.findOneBy({
        id: Equal(user.id),
      });
      if (u === null) {
        return res.status(404).json({
          message: "user not found",
        });
      }
      let texts = u.texts;
      return res.json({
        texts,
      });
    } catch (e) {
      return res.status(422).json({
        message: "something went wrong",
      });
    }
  }

  //@ts-ignore
  @Post("/", [AuthMiddleware])
  async saveText(@Req() req: RequestWithUser, @Res() res: Response) {
    let user = req.user;
    let text: string = req.body.text;
    try {
      let u = await User.findOneBy({
        id: Equal(user.id),
      });
      if (u === null) {
        return res.status(404).json({
          message: "user not found",
        });
      }
      if (verifyText(text)) {
        let t = new Text();
        t.text = text;
        t.user = u;
        await Text.save(t);
        u.texts.push(t);
        await User.save(u);
        return res.json({
          success: true,
        });
      } else {
        return res.status(422).json({
          message: "invalid text",
        });
      }
    } catch (e) {
      return res.status(404).json({
        message: "user not found",
      });
    }
  }

  //@ts-ignore
  @Delete("/:id", [AuthMiddleware])
  async deleteText(@Req() req: RequestWithUser, @Res() res: Response) {
    let user = req.user;
    let id = Number(req.params.id);
    try {
      /// here this is failing
      let u = await User.findOneBy({
        id: Equal(user.id),
      });
      let t = await Text.findOneBy({
        id: Equal(id),
      });
      if (u === null || t === null) {
        return res.status(402).json({
          message: "user or text not found",
        });
      }

      await t.remove();
      return res.json({
        success: true,
      });
    } catch (e) {
      console.log(e);
      return res.status(404).json({
        message: "user not found",
      });
    }
  }
}
