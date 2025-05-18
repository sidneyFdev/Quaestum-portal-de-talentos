import { BaseSeeder } from "@adonisjs/lucid/seeders"
import { DateTime } from "luxon";
import User from "#models/user";
import Address from "#models/address";
import Education from "#models/education";
import hash from "@adonisjs/core/services/hash";

export default class usersSeed extends BaseSeeder {
    async run () {


      const users = [
        {
          "is_admin": true,
          "is_recruiter": true,
          "name": "Admin",
          "last_name": "Main Admin",
          "birthdate": "1989-11-11",
          "email": "admin@example.com",
          "email_token": null,
          "email_verified": true,
          "password": await hash.make('senha1'),
          "address": {
            "address": "Av. Central, 1000",
            "number": "1000",
            "city": "São Paulo",
            "uf": "SP",
            "postcode": "01000-000"
          }
        },
        {
          "is_admin": false,
          "is_recruiter": true,
          "name": "Recruiter",
          "birthdate": "1989-11-11",
          "last_name": "Non Admin",
          "email": "recruiter@example.com",
          "email_token": null,
          "email_verified": true,
          "password": await hash.make('senha2'),
          "address": {
            "address": "Rua das Flores, 200",
            "number": "200",
            "city": "Rio de Janeiro",
            "uf": "RJ",
            "postcode": "20000-000"
          }
        },
        {
          "name": "Maria",
          "is_admin": false,
          "is_recruiter": false,
          "last_name": "Oliveira",
          "email": "maria@example.com",
          "telephone": "222222222",
          "birthdate": "2025-01-01 00",
          "educations": [
            {
              "institution": "USP",
              "course": "Engenharia de Computação",
              "start_date": DateTime.fromISO("2019-06-01").startOf('day'),
              "finished_date": DateTime.fromISO("2023-06-01").startOf('day')
            },
            {
              "institution": "Unicamp",
              "course": "Ciência da Computação",
              "start_date": DateTime.fromISO("2020-07-01").startOf('day'),
              "finished_date": DateTime.fromISO("2024-07-01").startOf('day')
            }
          ],
          "skills": [1, 3, 5],
          "email_token": null,
          "email_verified": true,
          "password": await hash.make('senha3'),
          "address": {
            "address": "Rua das Acácias, 123",
            "number": "123",
            "city": "Campinas",
            "uf": "SP",
            "postcode": "13000-000"
          }
        },
        {
          "name": "João",
          "last_name": "Silva",
          "is_admin": false,
          "is_recruiter": false,
          "email": "joao@example.com",
          "telephone": "333333333",
          "address": {
            "address": "Rua sem nome",
            "number": "1234",
            "city": "São Paulo",
            "uf": "SP",
            "postcode": "02222-222"
          },
          "birthdate": "1998-04-22 00",
          "educations": [],
          "skills": [2, 4, 6, 8],
          "email_token": null,
          "email_verified": true,
          "password": await hash.make('senha4'),
        },
        {
          "name": "Ana",
          "last_name": "Souza",
          "is_admin": false,
          "is_recruiter": false,
          "email": "ana@example.com",
          "telephone": "444444444",
          "birthdate": "2000-09-15 00",
          "educations": [
            {
              "institution": "IFSP",
              "course": "Sistemas para Internet",
              "start_date": DateTime.fromISO("2019-10-10").startOf('day'),
              "finished_date": DateTime.fromISO("2021-10-10").startOf('day')
            }
          ],
          "skills": [1, 7, 9, 12, 13],
          "email_token": null,
          "email_verified": true,
          "password": await hash.make('senha5'),
          "address": {
            "address": "Av. Brasil, 500",
            "number": "500",
            "city": "Santos",
            "uf": "SP",
            "postcode": "11000-000"
          }
        },
        {
          "name": "Carlos",
          "last_name": "Pereira",
          "is_admin": false,
          "is_recruiter": false,
          "email": "carlos@example.com",
          "telephone": "555555555",
          "birthdate": "1995-06-08 00",
          "educations": [
            {
              "institution": "PUC-SP",
              "course": "Engenharia de Software",
              "start_date": DateTime.fromISO("2012-05-20").startOf('day'),
              "finished_date": DateTime.fromISO("2016-05-20").startOf('day')
            }
          ],
          "skills": [3, 5, 10],
          "email_token": null,
          "email_verified": true,
          "password": await hash.make('senha6'),
          "address": {
            "address": "Rua das Palmeiras, 789",
            "number": "789",
            "city": "Campinas",
            "uf": "SP",
            "postcode": "13000-000"
          }
        },
        {
          "name": "Fernanda",
          "last_name": "Almeida",
          "is_admin": false,
          "is_recruiter": false,
          "email": "fernanda@example.com",
          "telephone": "666666666",
          "birthdate": "2001-02-20 00",
          "educations": [],
          "skills": [6, 11, 13, 14, 15],
          "email_token": null,
          "email_verified": true,
          "password": await hash.make('senha7'),
          "address": {
            "address": "Rua das Laranjeiras, 456",
            "number": "456",
            "city": "São Bernardo do Campo",
            "uf": "SP",
            "postcode": "09800-000"
          }
        },
        {
          "name": "Rafael",
          "last_name": "Costa",
          "is_admin": false,
          "is_recruiter": false,
          "email": "rafael@example.com",
          "telephone": "777777777",
          "birthdate": "1993-12-01 00",
          "educations": [
            {
              "institution": "UFABC",
              "course": "Tecnologia da Informação",
              "start_date": DateTime.fromISO("2015-07-15").startOf('day'),
              "finished_date": DateTime.fromISO("2019-07-15").startOf('day')
            }
          ],
          "skills": [2, 3],
          "email_token": null,
          "email_verified": true,
          "password": await hash.make('senha8'),
          "address": {
            "address": "Av. Paulista, 1000",
            "number": "1000",
            "city": "São Paulo",
            "uf": "SP",
            "postcode": "01310-000"
          }
        },
        {
          "name": "Juliana",
          "last_name": "Mendes",
          "is_admin": false,
          "is_recruiter": false,
          "email": "juliana@example.com",
          "telephone": "888888888",
          "birthdate": "1999-03-18 00",
          "educations": [
            {
              "institution": "UNESP",
              "course": "Análise e Desenvolvimento de Sistemas",
              "start_date": DateTime.fromISO("2017-11-30").startOf('day'),
              "finished_date": DateTime.fromISO("2020-11-30").startOf('day')
            },
            {
              "institution": "FATEC",
              "course": "Banco de Dados",
              "start_date": DateTime.fromISO("2021-12-01").startOf('day'),
              "finished_date": DateTime.fromISO("2023-12-01").startOf('day')
            }
          ],
          "skills": [1, 4, 7, 9],
          "email_token": null,
          "email_verified": true,
          "password": await hash.make('senha9'),
          "address": {
            "address": "Rua do Comércio, 321",
            "number": "321",
            "city": "Sorocaba",
            "uf": "SP",
            "postcode": "18000-000"
          }
        }
      ];

      for (const user of users) {
        const { address, educations, skills, ...rest } = user;
        const userRecord = await User.updateOrCreate(
            { email: user.email },
            {
                ...rest,
                birthdate: DateTime.fromISO(user.birthdate.split(' ')[0]),
            }
        );
        const userKeys = userRecord.serialize()

        
      if (skills && skills.length > 0) {
          await userRecord.related('skills').sync(skills)
      }
      if (address) { 
          await Address.updateOrCreate(
            {user_id:userKeys.id},
            {...address, user_id: userRecord.id}
          )
      }
      if (educations && educations.length > 0) {
          await Education.createMany(
              educations.map(value=>{
                return {
                  ...value,
                  user_id: userRecord.id
                }
              })
          )
      }
      }
    }
}
