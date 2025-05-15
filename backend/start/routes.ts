/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import CandidatesController from '../app/controllers/Http/candidatesController.js'
import SkillsController from '#controllers/Http/skillsController'
import AuthController from '#controllers/Http/auth_controller'

router.post('/candidates/register', [CandidatesController, 'store'])
router.get('/skills', [SkillsController, 'get'])
router.get('/confirm/:token', [AuthController, 'update'])   
router.delete('/candidates/:email', [CandidatesController, 'remove'])