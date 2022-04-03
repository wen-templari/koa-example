class ReturnObject {
  code!: number
  data: unknown
  message!: string

  success(data?: unknown): ReturnObject {
    this.code = 0
    this.message = "success"
    if (data != null) {
      this.data = data
    }
    return this
  }
  fail(code: number, message: string): ReturnObject {
    this.code = code
    this.message = message
    return this
  }
}
export default ReturnObject