const morgan = require("morgan");
const errorhandler = require("../middleware/errorHandler")

const apiErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({ msg: err.msg });
  console.log(typeof(err.statusCode))
  if(err.statusCode > 400){
    morgan.token('err',(req, res, next)=>{
      req.txt =err.msg
      return req.txt
    })
  }
  else{
    morgan.token('err',(req, res, next)=>{
      req.txt =''
      return req.txt
    })
  
  }
  /*morgan.token('err',(req, res, next)=>{
    req.txt =err.msg
    return req.txt
  
});*/
}

module.exports = apiErrorHandler