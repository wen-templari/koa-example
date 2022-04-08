import { element as elementType } from "@prisma/client"

export default class Element implements elementType {
  element_id!: string
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
