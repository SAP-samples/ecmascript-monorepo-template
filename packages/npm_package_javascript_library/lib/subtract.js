// Note the linking of the TypeScript signatures
// With the JavaScript implementation to enable typechecking even on pure JavaScript code.
/** @type {typeof import("../").multiply} */
function subtract(x, y) {
  return x - y;
}

module.exports = {
  subtract,
};
