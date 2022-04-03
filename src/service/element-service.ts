import { PrismaClient } from "@prisma/client"
import { LoginDTO } from "../model/DTO"

const prisma = new PrismaClient()

class ElementService {
  async login(id: string, password: string): Promise<LoginDTO | null> {
    const user = await prisma.user.findUnique({ where: { id } })
    if (user?.password === password) {
      const data: LoginDTO = {
        token: "example token",
        name: user.name,
      }
      return data
    } else {
      throw new Error("login fail")
    }
  }
}
export default ElementService
