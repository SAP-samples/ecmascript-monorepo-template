// Note the linking of the TypeScript signatures
// With the JavaScript implementation to enable typechecking even on pure JavaScript code.
/** @type {typeof import("../").multiply} */
function multiply(x, y) {
  return x * y;
}

var x = 5;

module.exports = {
  multiply,
};
