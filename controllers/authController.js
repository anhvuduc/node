const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var token = undefined;
//
class AuthController{

    // sign up
    signup = async (req, res) => {
        const {phone, password} = req.body;
    
        
        //
        try {
        
        // check phone number
        if (!phone || phone.length != 10 || phone[0] != 0) {
            return res
                .status(401)
                .json({
                    code: 1004,
                    message: 'Phone number is invalid'
                })
        };

        //check password
        if (!password || password.length < 6 || password.length > 10) {
            return res
                .status(401)
                .json({
                    code: 1004,
                    message: 'Password is invalid'
                })
        };

            // check user existed
            const user = await userModel.findOne({phone});
            if (user) {
                return res
                    .status(401)
                    .json({
                        code: 9996,
                        message: 'User is existed'
                    });
            };

            // hash password with bcrypt

            // check user existed

            //hash password
            const hashPassword = await bcrypt.hash(password, 10);
            
            // create jwt 
            // có cần thêm 1 trường token vào db để báo đã đăng nhập?
            // để key ở đây kiểu gì cũng mất nick
            
            // create new user
            const newUser = await userModel.create({phone, hashPassword});

            // token = jwt.sign(newUser._id, 'secret signature');

            
            res
                .status(201)
                .json({
                    code: 1000,
                    message: 'OK',
                    user: { id: newUser._id, phone, password: hashPassword, token: token }
                })
        }
        catch (err) {
            console.log(err);
            res
                .status(400)
                .json({
                    code:1005,
                    message: 'Server Error'
                })
        }       
    };

    // log in
    login = async(req, res) => {
        const {phone, password} = req.body;

        try {
        // find user    
        const user = await userModel.findOne({phone});
        console.log(user)
        
        if (!user) {
            return res
                .status(401)
                .json({
                    code: 9995,
                    message: 'User is not existed'
            });
        }
        // check phone number
        if (!phone || phone.length != 10 || phone[0] != 0) {
            return res
                .status(401)
                .json({
                    code: 1004,
                    message: 'Phone number is invalid'
                })
        };

        //check password
        if (!password || password.length < 6 || password.length > 10) {
            return res
                .status(401)
                .json({
                    code: 1004,
                    message: 'Password is invalid'
                })
        };

        const match = await bcrypt.compare(password, user.hashPassword);
        
        if(!match) {
            return res
                .status(401)
                .json({
                    code: 1004,
                    message: 'Password is incorrect'
            }); 
        }

        // check internet connection?
        //...

        if(token !== undefined) {
            console.log(user.token)
            return res
                .status(401)
                .json({
                    code: 1010,
                    message: 'User is already logged in'
        });             
        }
        else {
            // gener
            token = jwt.sign(phone, 'secret signature');
            // const userUpdate = await userModel.findOneAndUpdate(phone, {token: '1'});         
            return res
                .status(200)
                .json({
                    code: 1000,
                    message: 'Logged in successfully'
            });
            }
        } 
        catch (err) {
            console.log(err);
            res
                .status(400)
                .json({
                    code:1005,
                    message: 'Server Error'
            })
        } 
    };

    // log out
    logout = async (req, res) => {
        token = undefined;         
        res.status(200).json({
            code: 1000,
            message: 'OK'
        })

        // res.redirect('/login');
    }
}

const authController = new AuthController();

module.exports = authController;