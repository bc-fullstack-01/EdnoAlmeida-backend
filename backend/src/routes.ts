import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()

routes.get('/user', UserController.index)
routes.get('/friends', UserController.friends)
routes.post('/users', UserController.create)

export default routes