import { member as memberType } from "@prisma/client"
import Joi from "joi"

export class ElementSchema {
  static member_id = Joi.string().length(10).required()
  static alias = Joi.string().max(10)
  static password = Joi.string().max(30)
  // static name = Joi.string().max(10)
  static section = Joi.string().max(10)
  static profile = Joi.string().max(1000)
  static phone = Joi.string().max(20)
  static qq = Joi.string().max(13)
  static avatar = Joi.string().max(30)
  static role = Joi.number().integer().min(0).max(2)
  static status = Joi.number().integer().min(0).max(1)
  static created_by = ElementSchema.member_id
  static gmt_create = Joi.date().required()
  static gmt_modified = Joi.date().required()
  static gmt_expire = Joi.date()
}

export class Member implements memberType {
  member_id!: string
  alias!: string | null
  password!: string | null
  name!: string | null
  section!: string | null
  profile!: string | null
  phone!: string | null
  qq!: string | null
  avatar!: string | null
  role!: number
  status!: number
  created_by!: string | null
  gmt_create!: Date
  gmt_modified!: Date
  gmt_expire!: Date | null
}
