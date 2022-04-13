import ReturnObject from "../util/return-object"
import MemberService from "../service/member-service"
import { ParameterizedContext as Ctx } from "koa"
import { PrismaClient } from "@prisma/client"

class MemberController {
  // async login(ctx: Ctx) {
  //   const body = ctx.request.body
  //   ctx.body = await MemberService.login(body.id, body.password)
  // }

  async getToken(ctx: Ctx) {
    ctx.body = "TOKEN"
  }

  async get(ctx: Ctx) {
    const prisma = new PrismaClient()
    const member = await prisma.member.findUnique({
      where: {
        member_id: ctx.params.member_id,
      },
      include: {
        member_role: {
          select: {
            role: true,
          },
        },
        member_status: true,
      },
    })
    ctx.body = member
  }
}

export default new MemberController()
