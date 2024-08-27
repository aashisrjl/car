
const User = require("../model/userModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET,NODE_ENV} = process.env


//register
exports.userRegister = async (req, res) => {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
        return res.status(400).json({
            message: "Please fill all fields",
        });
    }

        const existingUserEmail = await User.findOne({ email });
        const existingUserPhone = await User.findOne({ phone });

        if (existingUserEmail || existingUserPhone) {
            return res.status(400).json({
                message: "User already exists with this email or phone number",
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const user = await User.create({
            fullName,
            email,
            phone,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone
            }
        });
};


//login
exports.userLogin = async (req, res) => {
    const { email, password, phone } = req.body;

    if (!email && !phone) {
        return res.status(400).json({
            message: "Please enter either phone or email"
        });
    }

    if (!password) {
        return res.status(400).json({
            message: "Please enter your password"
        });
    }

        let user;
        if (email) {
            user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    message: "No user found with this email"
                });
            }
        } else if (phone) {
            user = await User.findOne({ phone });
            if (!user) {
                return res.status(400).json({
                    message: "No user found with this phone number"
                });
            }
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "30d"
        });

        res.cookie("carToken", token, {
            httpOnly: true, 
            secure: NODE_ENV === 'production' 
        });

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone
            }
        });
  
};



//logout
exports.handleLogout = (req,res)=>{
    res.clearCookie("carToken");
    res.status(200).json({
        message: "Logout Successfully"
    })
}

//getAll users
exports.getAllUsers = async(req,res)=>{
    const users = await User.find();
    res.status(200).json({
        message: "user fetch successfully",
        users
    })
}

//deleteusers
exports.deleteUser = async(req,res)=>{
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({
        message: "user deleted successfully",
        user

    })
}

