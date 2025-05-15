import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

export const RegisterFormation = ({ setCandidateFormations, candidateFormations }) => {
    const [showFormations, setShowFormations] = useState(false)
    const [canAddNewFormation, setCanAddNewFormation] = useState(true)

    useEffect(() => {
        if(showFormations){
            checkValidFormation()
        }
    }, [candidateFormations])

    const formationInputPlaceholder = [
        "Nome do Curso",
        "Instituição",
        "Data de conclusão"
    ]

    const defaultFormation = {
        course: "",
        institution: "",
        conclusion: "",
    }

    const checkValidFormation = () => {
        if(candidateFormations.length > 0) {
            let validInfo = Object.values(candidateFormations[candidateFormations.length - 1]).every(value => value.trim() !== "")
            setCanAddNewFormation(validInfo)
        } else if (candidateFormations.length == 0) {
            setCanAddNewFormation(true)
        }
    }

    const addNewFormation = () => {
        if(candidateFormations.length == 0){
            setCandidateFormations([defaultFormation])
            setCanAddNewFormation(false)
        } else if (canAddNewFormation) {
            setCandidateFormations([...candidateFormations, defaultFormation])
            setCanAddNewFormation(false)
        }
    }

    return (
        <div className="flex flex-col">
            <div className=" flex justify-start">
                <button type="button" onClick={() => setShowFormations((prev => !prev))} className="mt-10 px-2 cursor-pointer">
                    <h3 className="font-medium text-[24px]">
                        {showFormations ? <span>▲</span> : <span>▼</span>	} Formações
                    </h3>
                </button>
            </div>
        <div
            className={`transition-all duration-300 ease-in-out transform origin-top ${
            showFormations ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 h-0"
            } overflow-hidden`}
        >
            {
                candidateFormations.length != 0 &&
                candidateFormations.map((val, index)=> {
                    return (
                        <div key={index} className="flex flex-col px-2 mt-4">
                            <div className="flex mt-4">
                            <h4
                                className="text-start  text-[20px] font-medium"
                            >Formação {index + 1} </h4>
                            <button type="button" onClick={() => {
                                    const updateFormations = candidateFormations.filter((_, i) => i !== index);
                                    setCandidateFormations(updateFormations);
                                }}>
                                <FontAwesomeIcon className="ml-10 cursor-pointer hover:text-red-400" icon={faTrash} size={"lg"} />
                            </button>
                            </div>
                            {
                                Object.keys(val).map((form, i) =>{
                                    return(
                                    <input 
                                        key={i}
                                        className="border-1 border-(--basic-border-color) rounded-[0.25rem] mt-4 p-2 focus:outline-0"
                                        type="text" 
                                        placeholder={formationInputPlaceholder[i]}
                                        name={`formation${form}${index}`} 
                                        value={val.form}
                                        onChange={(e) => {
                                            let updatedFormations = [...candidateFormations];
                                            updatedFormations[index] = {
                                                ...val,
                                                [form]: e.target.value
                                            };
                                            setCandidateFormations(updatedFormations);
                                        }} 
                                    />
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        <button 
            className={`transition-all duration-300 ease-in-out transform origin-top mt-4 w-full border-2 border-dashed rounded-2xl py-3 text-[18px] text-(--secondary-highlight-color) cursor-pointer hover:text-(--primary-highlight-color) ${canAddNewFormation ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 h-0" }`}

            type="button" onClick={addNewFormation}>
            + Adicionar nova formação
        </button>
        </div>

        </div>
    )
}
