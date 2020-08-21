"use strict";
import { name, hi, hello } from "./export.js";
import * as m from './export.js'
console.log(m.hi());
console.log(name);
hi();
hello();