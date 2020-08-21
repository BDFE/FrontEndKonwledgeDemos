"use strict";

var _export = require("./export.js");

var m = _interopRequireWildcard(_export);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log(m.hi());
console.log(_export.name);
(0, _export.hi)();
(0, _export.hello)();