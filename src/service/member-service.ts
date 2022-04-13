import { PrismaClient } from "@prisma/client"
import { LoginDTO } from "../model/DTO"
import { exclude } from "../util/dbUtils"
import { ServiceError } from "../util/error"
import createToken from "../util/token"

class MemberService {
  private readonly prisma = new PrismaClient()
  private readonly MemberRepo = this.prisma["member"]

  // async login(id: string, password: string): Promise<LoginDTO> {
  //   const findById = {
  //     member_id: id,
  //   }
  //   const member = await this.MemberRepo.findUnique({ where: { member_id: id } })
  //   if (member == null) {
  //     // throw new ServiceError(1, "id not found")
  //   }
  //   if (member.password !== password) {
  //     throw new ServiceError(1, "wrong password")
  //   }
  //   const LoginDTO = {
  //     token: createToken(14, {
  //       id: id,
  //       role: this.RoleMap[member.role],
  //     }),
  //     alias: member.alias,
  //     avatar: member.avatar,
  //   }
  //   // update last login date
  //   await this.MemberRepo.update({
  //     where: findById,
  //     data: {
  //       gmt_modified: new Date(),
  //     },
  //   })
  //   return LoginDTO
  // }

  // async get(id: string) {
  //   const member = await this.MemberRepo.findUnique({ where: { member_id: id } })
  //   if (member == null) {
  //     throw new ServiceError(1, "id not found")
  //   }
  //   // TODO whether to map role?
  //   return exclude(member, "password")
  // }

  // async getAll() {
  //   const members = await this.MemberRepo.findMany()
  //   members.forEach(e => exclude(e, "password"))
  //   return members
  // }
}
export default new MemberService()
