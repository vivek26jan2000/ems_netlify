//External Lib Import
const jwt = require("jsonwebtoken");

const CreateToken = async (payLoad) => {
  return await jwt.sign(payLoad, "ASDLFKSA12414SAKLFJ", {
    expiresIn: "7 days",
  });
};

module.exports = CreateToken;
