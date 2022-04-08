import { PrismaClient } from "@prisma/client"
import { LoginDTO } from "../model/DTO"
import Element from "../model/element"
import ServiceError from "../util/error"

const prisma = new PrismaClient()

class ElementService {
  static async login(id: string, password: string): Promise<LoginDTO | null> {
    const element: Element | null = await prisma.element.findUnique({ where: { element_id: id } })
    if (element?.password === password) {
      const data: LoginDTO = {
        token: "example token",
        name: element.name,
      }
      return data
    } else {
      throw new ServiceError(1, "login fail")
    }
  }
}
export default ElementService
