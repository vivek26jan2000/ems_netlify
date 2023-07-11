//External Lib Import
const jwt = require("jsonwebtoken");

const DecodedToken = async (Token) => {
  return await jwt.verify(Token, "ASDLFKSA12414SAKLFJ");
};

module.exports = DecodedToken;
