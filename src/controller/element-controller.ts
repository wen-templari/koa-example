import Router from "koa-router"
import ReturnObject from "../util/return-object"
import ElementService from "../service/element-service"

const elementRouter = new Router()

elementRouter.post("/login", async ctx => {
  const body = ctx.request.body
  const id: string = body.id
  const password: string = body.password
  try {
    const data = await new ElementService().login(id, password)
    ctx.body = new ReturnObject().success(data)
  } catch (error) {
    ctx.body = new ReturnObject().fail(1, "login fail")
  }
})

export { elementRouter }
