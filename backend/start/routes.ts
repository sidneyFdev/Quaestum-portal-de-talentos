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

router.delete('/user/:email', [UsersController, 'remove'])
router.post('/user/register', [UsersController, 'store'])
router.post('/user/login', [SessionController, 'login'])
router.post('/confirm/:token', [SessionController, 'confirm'])
router.post('/reset/:token', [SessionController, 'reset'])
router.post('/reset', [SessionController, 'createReset'])
router.get('/skills/list', [SkillsController, 'get'])

router
  .group(() => {
    router.get('/candidates/list', [RecruitersController, 'get'])
    router.post('/candidates/single', [RecruitersController, 'select'])
    router.post('/candidates/invite', [RecruitersController, 'invite'])
  })
  .use([middleware.auth(), middleware.isAdmin()])

router
  .group(() => {
    router.get('/user/detail', [UsersController, 'get'])
    router.post('/user/logout', [SessionController, 'logout'])
  })
  .use(middleware.auth())
