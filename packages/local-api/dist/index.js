"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const serve = (port, filename, dir) => {
    console.log('Serving traffic on port', port);
    console.log('Saving/fetching cells from', filename);
    console.log('File dir', dir);
};
exports.serve = serve;
