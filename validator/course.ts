

const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    courseName: { type: "string", min: 2 },
    coursePrice: { type: "number",positive: true, min: 100000 },
    courseImage: { type: "string", optional: true},
    teacherId: { type:"string"},
};

 const check = v.compile(schema);
 export default check