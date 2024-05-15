

const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    fullName: { type: "string", min: 2 },
    email: { type: "string", min: 2 },
    password: { type: "string", min: 5 },
    adminImage: { type: "string", optional: true},
    status: { type: "string", min:4},
};

 const check = v.compile(schema);
 export default check