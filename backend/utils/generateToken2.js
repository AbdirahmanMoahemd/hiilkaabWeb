import jwt from 'jsonwebtoken'
const JWT_SECRET= '1235'
const generateToken2 = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        
    })
}

export default generateToken2 