const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  for (let i=0; i<strNums.length; i++){
    strNums[i] = (+strNums[i]);
    if ( isNaN(strNums[i])){
      return new BadRequestError ("must be numbers only")
    }
  }
  return strNums
}


module.exports = { convertStrNums };