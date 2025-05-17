import Skill from "#models/skill"
import { HttpContext } from "@adonisjs/core/http"


export default class SkillsController {
    async get({ response }: HttpContext) {
        const skills = await Skill.all()
        return response.ok(skills)
    }
}