import Skill from "#models/skill"
import { BaseSeeder } from "@adonisjs/lucid/seeders"

export default class SkillSeeder extends BaseSeeder {
  async run () {
    const skills = [
      { id: 1, name: "Java", icon: "fa-brands fa-java" },
      { id: 2, name: "Node.js", icon: "fa-brands fa-node-js" },
      { id: 3, name: "C++", icon: "fa-solid fa-code" },
      { id: 4, name: "PHP", icon: "fa-brands fa-php" },
      { id: 5, name: "Python", icon: "fa-brands fa-python" },
      { id: 6, name: "Go", icon: "fa-solid fa-code" },
      { id: 7, name: "ADVPL", icon: "fa-solid fa-terminal" },
      { id: 8, name: "Angular", icon: "fa-brands fa-angular" },
      { id: 9, name: "Electron", icon: "fa-solid fa-bolt" },
      { id: 10, name: "React", icon: "fa-brands fa-react" },
      { id: 11, name: "React Native", icon: "fa-brands fa-react" },
      { id: 12, name: "MongoDB", icon: "fa-solid fa-leaf" }, 
      { id: 13, name: "MySQL", icon: "fa-solid fa-database" },
      { id: 14, name: "SQLServer", icon: "fa-solid fa-server" },
      { id: 15, name: "Postgres", icon: "fa-solid fa-database" },
      { id: 16, name: "Backend", icon: "fa-solid fa-gears" },
      { id: 17, name: "Front-End", icon: "fa-solid fa-desktop" }
    ]
    
    await Skill.updateOrCreateMany('name', skills)
  }
}