import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from '../Models/UserModel.js'

const protect = AsyncHandler(
    async (req,res,next) => {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                token = req.headers.authorization.split(" ")[1];

                const decoded = jwt.verify(token, process.env.JWT_SECURE);

                req.user = await User.findById(decoded.id).select("-password");
                //console.log(req.user);
                next();

            } catch (error) {
                console.error(error);
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
        } if (!token) {
            res.status(401);
            throw new Error("Not authorized, no token");
    }
});

export default protect;