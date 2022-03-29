import should from "should"
import request from "supertest"
import { app } from "../app"
describe("接口测试", () => {
  let server: any
  before(() => {
    server = app.listen(3001)
  })
  after(() => {
    if (server) {
      server.close()
    }
  })
  it("登入成功测试", async () => {
    await request(server)
      .get("/")
      .expect(200)
      .expect(res => {
        should(res.body).have.property("name").which.is.equal("tom")
        should(res.body).have.property("age").which.is.equal(18)
      })
  })
})
