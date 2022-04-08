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

export default class ServiceError extends Error {
  errorCode: number
  constructor(errorCode: number, message: string) {
    super(message)
    this.errorCode = errorCode
    this.name = "ServiceError"
  }
}
