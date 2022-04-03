import Koa from "koa"
import bodyParser from "koa-bodyparser"
import { PrismaClient } from "@prisma/client"
import { elementRouter } from "./src/controller/element-controller"

const prisma = new PrismaClient()
const app = new Koa()

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
app.use(elementRouter.routes())

export { app,  prisma }

app.listen(3001)
