import Koa from "koa"
import bodyParser from "koa-bodyparser"
import { PrismaClient } from "@prisma/client"
import router from "./src/controller"
import ServiceError from "./src/util/error"
import ReturnObject from "./src/util/return-object"
import logger from "./src/util/logger"

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

app.use(async (ctx, next) => {
  // service error 处理
  try {
    await next()
  } catch (error) {
    if (error instanceof ServiceError) {
      ctx.body = ReturnObject.fail(error.errorCode, error.message)
    } else {
      logger.error(error)
    }
  }
})

// response
app.use(router.routes())

export { app, prisma }

app.listen(3001)
