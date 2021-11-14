// const path  = require('path')
// const multer = require('multer')


// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null,'uploads');
//     },
//     filename: function(req,file,cb){
//         cb(null, new Date().toISOString().replace(/[\/\\:]/g, "_") +'-'+ file.originalname);
//     }
// });

// const upload = multer({
//     storage:storage, 
//       fileFilter : function(req,file,calback) {
//           if(
//               file.mimetype == "video/gif" ||  file.mimetype == "video/mp4" || file.mimetype == "video/ogg"
//           ) {
  
//               calback(null, true)
//           }else {
//               console.log('only jpg & png file supported ! ')
//               calback(null,false)
//           }
//       },
//       limite: {
//           fileSize: 1024 * 1024 *2 
//       }
//   })


// module.exports = uploadVideo