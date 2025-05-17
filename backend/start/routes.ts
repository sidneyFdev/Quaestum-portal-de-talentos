/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import CandidatesController from '../app/controllers/Http/user_controller.js'
import SkillsController from '#controllers/Http/skills_controller'

router.get('/skills', [SkillsController, 'get'])

router.delete('/candidates/:email', [CandidatesController, 'remove'])
router.post('/candidate/register', [CandidatesController, 'store'])

