import express from 'express'
import { register, login, updateUser, getOneUser, logout, OauthLogin, updateUsername, deleteUser } from '../Controllers/user.js'
import { auth } from '../middlewares/auth.js';


const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.put('/', auth, updateUser)
router.get('/', auth, getOneUser)
router.get('/logout', auth, logout)
router.get('/oauth', OauthLogin)
router.post('/username', auth, updateUsername)
router.delete('/', auth, deleteUser)

export default router