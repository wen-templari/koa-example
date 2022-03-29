import Koa from "koa"
import bodyParser from "koa-bodyparser"
import { PrismaClient } from "@prisma/client"
import Router from "koa-router"

const prisma = new PrismaClient()
const app = new Koa()
const router = new Router()

router.post("/login", async ctx => {
  let body = ctx.request.body
  let id = body.id
  let password = body.password
  const user = await prisma.user.findUnique({ where: { id: id } })
  if (user?.password === password) {
    ctx.body = {
      status: "success",
      message: "login success",
      data: user,
    }
  } else {
    ctx.body = {
      status: "fail",
      message: "login fail",
    }
  }
})

app.use(bodyParser())

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get("X-Response-Time")
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set("X-Response-Time", `${ms}ms`)
})

// response
app.use(router.routes())

export { app }

app.listen(3001)
