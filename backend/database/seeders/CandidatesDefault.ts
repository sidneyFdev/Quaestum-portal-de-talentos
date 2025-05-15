import { BaseSeeder } from "@adonisjs/lucid/seeders"
import Candidate from '#models/candidate';
import { DateTime } from "luxon";

export default class CandidatesSeed extends BaseSeeder {
    async run () {
      const candidates = [
        {
          "name": "Maria",
          "lastname": "Oliveira",
          "email": "maria@example.com",
          "telephone": "222222222",
          "birthdate": "2025-01-01 00",
          "educations": [
            {
              "institution": "USP",
              "course": "Engenharia de Computação",
              "conclusion": "2022-12-01"
            },
            {
              "institution": "Unicamp",
              "course": "Ciência da Computação",
              "conclusion": "2023-12-01"
            }
          ],
          "skills": [1, 3, 5],
          "email_token": null,
          "email_verified": true
        },
        {
          "name": "João",
          "lastname": "Silva",
          "email": "joao@example.com",
          "telephone": "333333333",
          "birthdate": "1998-04-22 00",
          "educations": [],
          "skills": [2, 4, 6, 8],
          "email_token": null,
          "email_verified": true
        },
        {
          "name": "Ana",
          "lastname": "Souza",
          "email": "ana@example.com",
          "telephone": "444444444",
          "birthdate": "2000-09-15 00",
          "educations": [
            {
              "institution": "IFSP",
              "course": "Sistemas para Internet",
              "conclusion": "2020-11-30"
            }
          ],
          "skills": [1, 7, 9, 12, 13],
          "email_token": null,
          "email_verified": true
        },
        {
          "name": "Carlos",
          "lastname": "Pereira",
          "email": "carlos@example.com",
          "telephone": "555555555",
          "birthdate": "1995-06-08 00",
          "educations": [
            {
              "institution": "PUC-SP",
              "course": "Engenharia de Software",
              "conclusion": "2019-07-15"
            }
          ],
          "skills": [3, 5, 10],
          "email_token": null,
          "email_verified": true
        },
        {
          "name": "Fernanda",
          "lastname": "Almeida",
          "email": "fernanda@example.com",
          "telephone": "666666666",
          "birthdate": "2001-02-20 00",
          "educations": [],
          "skills": [6, 11, 13, 14, 15],
          "email_token": null,
          "email_verified": true
        },
        {
          "name": "Rafael",
          "lastname": "Costa",
          "email": "rafael@example.com",
          "telephone": "777777777",
          "birthdate": "1993-12-01 00",
          "educations": [
            {
              "institution": "UFABC",
              "course": "Tecnologia da Informação",
              "conclusion": "2016-05-20"
            }
          ],
          "skills": [2, 3],
          "email_token": null,
          "email_verified": true
        },
        {
          "name": "Juliana",
          "lastname": "Mendes",
          "email": "juliana@example.com",
          "telephone": "888888888",
          "birthdate": "1999-03-18 00",
          "educations": [
            {
              "institution": "UNESP",
              "course": "Análise e Desenvolvimento de Sistemas",
              "conclusion": "2021-10-10"
            },
            {
              "institution": "FATEC",
              "course": "Banco de Dados",
              "conclusion": "2023-06-01"
            }
          ],
          "skills": [1, 4, 7, 9],
          "email_token": null,
          "email_verified": true
        },
        {
          "name": "Pedro",
          "lastname": "Lima",
          "email": "pedro@example.com",
          "telephone": "999999999",
          "birthdate": "1997-01-30 00",
          "educations": [],
          "skills": [5, 10, 11],
          "email_token": null,
          "email_verified": true
        },
        {
          "name": "Larissa",
          "lastname": "Ribeiro",
          "email": "larissa@example.com",
          "telephone": "101010101",
          "birthdate": "2002-07-12 00",
          "educations": [
            {
              "institution": "UNICID",
              "course": "Informática para Negócios",
              "conclusion": "2024-07-01"
            }
          ],
          "skills": [6, 8, 9, 15],
          "email_token": null,
          "email_verified": true
        },
        {
          "name": "Thiago",
          "lastname": "Fernandes",
          "email": "thiago@example.com",
          "telephone": "111111111",
          "birthdate": "1989-11-11",
          "educations": [
            {
              "institution": "UFMG",
              "course": "Ciência da Computação",
              "conclusion": "2013-12-01"
            }
          ],
          "skills": [2, 4, 7, 13, 14],
          "email_token": null,
          "email_verified": true
        }
      ]
  
      await Candidate.updateOrCreateMany('email', candidates.map((candidate) =>{
        const { educations, skills, ...rest } = candidate;
        return {
          ...rest,
          birthdate: DateTime.fromISO(candidate.birthdate.split(' ')[0]),
          educations: JSON.stringify(educations),
          skills: JSON.stringify(skills)
        }
      } ))
    }
  }