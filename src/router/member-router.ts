import Joi from "joi"
import Router from "koa-router"
import memberController from "../controller/member-controller"
import { Location, validateMiddleware } from "../util/validate"

const memberRouter = new Router()

memberRouter.get(
  "/:member_id",
  validateMiddleware(
    Joi.object({
      member_id: Joi.string().length(10).required(),
    }),
    Location.Params()
  ),
  memberController.get
)

memberRouter.post(
  "/member/token",
  validateMiddleware(
    Joi.object({
      member_id: Joi.string().length(10).required(),
      password: Joi.string(),
    }),
    Location.Body()
  ),
  memberController.getToken
)
export default memberRouter
