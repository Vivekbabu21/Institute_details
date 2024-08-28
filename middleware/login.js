const jwt = require('jsonwebtoken');


async function login(req,res,next){
    const token = req.header('x-token');
    if(!token) return res.status(401).send('Access deied.No token provided.');

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(ex){
        console.error('failed:',ex.message);
        res.status(400).send('Invalid token');
    }
    
    
}

async function adminLogin(req, res, next) {
    login(req, res, async () => {
        if (req.user.role !== 'admin' && req.user.role !== 'head') {
            return res.status(403).send('Access denied. Admins and Heads only.');
        }
        next();
    });
}

module.exports = {login,adminLogin};