/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from '../app/controllers/Http/user_controller.js'
import SkillsController from '#controllers/Http/skills_controller'
import SessionController from '#controllers/Http/session_controller'
import RecruitersController from '#controllers/Http/recruiters_controller'
import { middleware } from './kernel.js'
import User from '#models/user'
// import IsAdmin from '#middleware/is_admin'

router.get('/skills', [SkillsController, 'get'])

router.delete('/user/:email', [UsersController, 'remove'])
router.post('/user/register', [UsersController, 'store'])

router.post('/user/login', [SessionController, 'store'])


router.group(()=> {
    router.get('/users/list', [RecruitersController, 'get'])
}).use([middleware.auth(), middleware.isAdmin()])

router.group(()=> {
    router.post('/user/detail', [UsersController, 'getData'])
    router.post('/user/logout', [SessionController, 'logout'])
}).use(middleware.auth())



