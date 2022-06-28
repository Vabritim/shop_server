import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECURE, {
        expiresIn: "30d",
    });   
};

export default generateToken;