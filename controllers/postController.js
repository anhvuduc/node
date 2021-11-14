// const postModel = require('../models/post');

// class postController {
    
//     // add new post 

//     newPost = async (req, res) => {
//         const newPost = new postModel.create(req.body);

//         try {
//             const SavePost = await new newPost.save();
//             res.status(201).json(SavePost)
//         }
//         catch(err){
//             res.status(500).json(err)
//         }

//     }
// }