import { ObjectSchema } from "joi"
import ServiceError from "./error"
import { Next, ParameterizedContext as Ctx } from "koa"

const validate = (schema: ObjectSchema, data: unknown) => {
  const { error } = schema.validate(data)
  return error
}

const validateMiddleware = (schema: ObjectSchema, pos: string) => {
  return async (ctx: Ctx, next: Next): Promise<void> => {
    let data, error
    if (pos == "body") {
      error = validate(schema, ctx.request.body)
    } else {
      error = validate(schema, ctx.params)
    }
    if (error != null) {
      const serviceError = new ServiceError()
      error.details.forEach(detail => {
        if (detail.context && detail.context.key && detail.context.label) {
          serviceError.addErrors([
            {
              resource: ctx.path,
              field: detail.context.label,
              code: detail.type,
            },
          ])
        }
      })
      serviceError.setMessage(error.message)
      console.log(error.details)
      throw serviceError
    }
    ctx.request.body = data
    await next()
  }
}

export { validate, validateMiddleware }
