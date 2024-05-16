

const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    firstName: { type: "string", min: 2 },
    lastName: { type: "string", min: 2 },
    userName: { type: "string", min: 2 },
    email: { type: "string", min: 2 },
    password: { type: "string", min: 5 },
    adminImage: { type: "string", optional: true},
    role: { type: "string", min:4},
};

 const check = v.compile(schema);
 export default check