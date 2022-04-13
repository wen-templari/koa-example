/*
  resource+type+serial
  1(element)01(inconsistent)00(serial)

  type
    missing argument // 缺少参数
    invalid argument // 不合法参数
    wrong argument // 参数错误
    resource not fount // 找不到资源
    resource already exists // 资源已存在
*/
enum HttpStatusCode {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  Unprocessable_Entity = 422,
  Conflict = 409,
  InternalServerError = 500,
}

interface ServiceErrorDetail {
  resource: string
  field: string
  code: string
}

export default class ServiceError extends Error {
  httpStatusCode: HttpStatusCode = 500
  errors: ServiceErrorDetail[] = []

  setMessage(message: string) {
    this.message = message
    return this
  }
  setHttpStatusCode(httpStatusCode: HttpStatusCode) {
    this.httpStatusCode = httpStatusCode
    return this
  }
  addErrors(error: ServiceErrorDetail[]) {
    this.errors = this.errors.concat(error)
  }

  getErrorResponse() {
    const res = {
      message: this.message,
    }
    if (this.errors.length > 0) {
      Object.assign(res, {
        errors: this.errors,
      })
    }
    return res
  }
}

// const err = new ServiceError().Element().MissingArg().
