import { member, member_role, member_status, PrismaClient } from "@prisma/client"
import { exclude } from "../util/dbUtils"

export default function Members(prisma: PrismaClient["member"]) {
  const setRoleAndStatus = (
    member: member & {
      member_role: member_role
      member_status: member_status
    }
  ) => {
    Object.assign(member, {
      role: member.member_role.role,
      status: member.member_status.role,
    })
    exclude(member, "member_role", "member_status")
    return member
  }

  const setPrivate = (member: member) => {
    exclude(member, "password")
    return member
  }

  const getMemberById = async (member_id: string) => {
    const member = await prisma.findUnique({
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
    setRoleAndStatus(member)
    return member
  }

  const getPublicMemberById = async (member_id: string) => {
    const member = await getMemberById(member_id)
    return member ? setPrivate(member) : member
  }

  const getPublicMembers = async (offset: number, limit: number) => {
    const members = await prisma.findMany({
      include: {
        member_role: true,
        member_status: true,
      },
      skip: offset,
      take: limit,
    })
    members.forEach(member => {
      setRoleAndStatus(member)
      setPrivate(member)
    })
    return members
  }

  return Object.assign(prisma, {
    getMemberById,
    getPublicMemberById,
    getPublicMembers,
  })
}
