import User from "#models/user";
import { HttpContext } from "@adonisjs/core/http"



export default class RecruitersController {
    async get({ response }:HttpContext){
        const users = await User.all()

        const candidates = users.map((val)=> {
            if (val.is_recruiter === false) {
                return val
            }
        })

        return response.ok(candidates)
    }
}