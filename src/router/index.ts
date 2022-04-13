import elementRouter from "./member-router"
import Router from "koa-router"

const router = new Router()

router.use("/members", elementRouter.routes())

export default router
