const fs = require('fs')
let filePath = 'C:/Users/User/Desktop/hsipl_account_system'


const delFile = (path) => fs.unlink(filePath + path, function(err) {
    if (err) {
      return err
    };
    console.log('Local file was deleted.')
  });


module.exports = delFile