import { member, member_role, member_status, PrismaClient } from "@prisma/client"
import { exclude } from "../util/dbUtils"
import { HttpStatusCode, ServiceError } from "../util/error"

class MemberService {
  private readonly prisma = new PrismaClient()
  private readonly MemberRepo = this.prisma["member"]

  setRoleAndStatus(
    member: member & {
      member_role: member_role
      member_status: member_status
    }
  ) {
    Object.assign(member, {
      role: member.member_role.role,
      status: member.member_status.role,
    })
    exclude(member, "member_role", "member_status")
    return member
  }

  setPrivate(member: member) {
    exclude(member, "password")
    return member
  }

  async getMember(member_id: string) {
    const member = await this.MemberRepo.findUnique({
      where: { member_id },
      include: {
        member_role: true,
        member_status: true,
      },
    })
    // member not found
    if (!member) {
      return member
    }
    this.setRoleAndStatus(member)
    return member
  }

  async getPublicMember(member_id: string) {
    const member = await this.getMember(member_id)
    return member ? this.setPrivate(member) : member
  }

  async getPublicMembers(offset: number, limit: number) {
    const members = await this.MemberRepo.findMany({
      include: {
        member_role: true,
        member_status: true,
      },
      skip: offset,
      take: limit,
    })
    members.forEach(member => {
      this.setRoleAndStatus(member)
      this.setPrivate(member)
    })
    return members
  }

  async createMember(member: member) {
    const oldMember = await this.getMember(member.member_id)
    if (oldMember) throw new ServiceError("Member already exists").setHttpStatusCode(HttpStatusCode.Conflict)
    const newMember = await this.MemberRepo.create({ data: member })
    return newMember
  }
}
export default new MemberService()
