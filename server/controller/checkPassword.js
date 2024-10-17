const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function  checkPassword(req, res){
    try {
        const { password, userId } = req.body;

        const user = await UserModel.findById(userId);
        
        const verifyPassword = await bcrypt.compare(password, user.password);
        
        if(!verifyPassword){
            return res.status(400).json({
                message: "Please check password",
                error: true
            })
        }

        const tokenData = {
            id: user.id,
            email: user.email
        }
        
        const token = await jwt.sign(tokenData, process.env.JWT_SECRETE_KEY, { expiresIn: '1d' })
        
        const cookieOption = {
            http: true,
            secure: true
        }

        return res.cookie('token',token,cookieOption).status(200).json({
            message: "Login Successfully!",
            token: token,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message | error,
            error: true
        })
    }
}


module.exports = checkPassword;