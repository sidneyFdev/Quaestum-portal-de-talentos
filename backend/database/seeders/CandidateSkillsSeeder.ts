import Skill from "#models/skill"
import { BaseSeeder } from "@adonisjs/lucid/seeders"

export default class SkillSeeder extends BaseSeeder {
    async run () {
      const skills = [
        "Java",
        "Node.js",
        "C++",
        "PHP",
        "Python",
        "Go",
        "ADVPL",
        "Angular",
        "Electron",
        "React",
        "React Native",
        "MongoDB",
        "MySQL",
        "SQLServer",
        "Postgres",
        "Backend",
        "Front-End",
      ]
  
      await Skill.updateOrCreateMany('name',skills.map((name) => ({ name })))
    }
  }