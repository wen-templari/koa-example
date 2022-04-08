class ReturnObject {
  code: number
  data: unknown
  message: string

  constructor(code = 0, data: unknown = null, message = "success") {
    this.code = code
    this.data = data
    this.message = message
  }

  static success(data?: unknown): ReturnObject {
    return new ReturnObject(0, data)
    // this.code = 0
    // this.message = "success"
    // if (data != null) {
    //   this.data = data
    // }
    // return this
  }
  static fail(code: number, message: string): ReturnObject {
    return new ReturnObject(code, null, message)
    // this.code = code
    // this.message = message
    // return this
  }
}
export default ReturnObject
