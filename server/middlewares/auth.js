
import jwt from 'jsonwebtoken';

const SECRET_KEY = '1234567!'

const auth = {
    decode: (req, res, next) => {
        if(!req.headers['authorization']) {
            return res.status(401).json({
                success: false,
                message: 'No Token Provided'
            });
        }
        
        try{
            const token = req.headers.authorization.split(' '); // Bearer <auth-token>
            const decoded = jwt.verify(token[1], SECRET_KEY);
            // if(!decoded){
            //     throw new Error('bad token')
            // }
            req.information = decoded
            console.log(req.information)
            return next()
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'invalid auth token'
            })
        }
    },
    encode: (req, res, next) => {
        const payload = {
            username: req.body.username,
            password: req.body.password,
        }

        // perform some db operations to check if the user information is correct or not

        const authToken = jwt.sign(payload, SECRET_KEY)
        
        req.authToken = authToken
        next()
    }
}

export default auth