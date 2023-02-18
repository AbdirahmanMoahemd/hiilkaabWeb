import bctypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User2',
        email: 'admin5@example.com',
        password: bctypt.hashSync('123456',10),
        isAdmin: true,
        phone: '1213124',
        address: 'address',
        city: 'city',
        country:'country',
    },
   

]

export default users