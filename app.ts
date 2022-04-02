import Koa from "koa"
import bodyParser from "koa-bodyparser"
import { PrismaClient } from "@prisma/client"
import Router from "koa-router"

const prisma = new PrismaClient()
const app = new Koa()
const router = new Router()

router.post("/login", async ctx => {
  const body = ctx.request.body
  const id = body.id
  const password = body.password
  const user = await prisma.user.findUnique({ where: { id } })
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

export { app, router }

app.listen(3001)
