import Joi from "joi"
import Router from "koa-router"
import memberController from "../controller/member-controller"
import { validateMiddleware } from "../util/validate"

const memberRouter = new Router()

memberRouter.get(
  "/:member_id",
  validateMiddleware(
    Joi.object({
      member_id: Joi.string().length(10).required(),
    }),
    "params"
  ),
  memberController.get
)
export default memberRouter
