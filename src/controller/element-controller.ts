import Router from "koa-router"
import ReturnObject from "../util/return-object"
import ElementService from "../service/element-service"

const elementRouter = new Router()

elementRouter.post("/login", async ctx => {
  const body = ctx.request.body
  const id: string = body.id
  const password: string = body.password
  const data = await ElementService.login(id, password)
  ctx.body = ReturnObject.success(data)
})

export { elementRouter }
