const request = require("supertest");
const app = require("../app");

describe("POST /users/signup", () => {
    test("It responds with the newly created user", async () => {
      const newStudent = await request(app)
        .post("/users/signup")
        .send({
          username: "sachith@gmail.com",
          password: "123"
        });
  
      // make sure we add it correctly
      
      expect(newStudent.body).toHaveProperty("id");
      expect(newStudent.body.username).toBe("sachith@gmail.com");
      expect(newStudent.statusCode).toBe(201);
      
     });
    
  });
  describe("POST /users/signin",() => {
    test("It responds with status 200",async() => {
        const existingUser = await request(app)
        .post("/users/signin")
        .send({
          username: "sachith@gmail.com",
          password: "123"
        });
        expect(existingUser.statusCode).toBe(200);
       
    });
    
  });