import React, {ChangeEvent, useState} from "react";
import s from "../../profile/EditProfile/EditProfile.module.scss";

type EditCardPropsType = {
    cardId: string
    closeEditModal: () => void
    updatePack: (cardId: string, question: string, answer: string) => void
    answer?: string
    question?: string
}

export const EditCard: React.FC<EditCardPropsType> = (props) => {
    // const {myQuestion="question", myAnswer="answer"}=props

    const [question, setQuestion] = useState<string>("")
    const [answer, setAnswer] = useState<string>("")

    const questionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const answerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const updateCard = () => {
        props.updatePack(props.cardId, question, answer)
        props.closeEditModal()
    }
    const closeEditMode = () => {
        props.closeEditModal()
    }

    return (
        <div className={s.editContainer}>
            <h3>Card info</h3>
            <div className={s.inputsBlock}>
                <div className={s.editInput}>
                    <label htmlFor="edit_question">Question:</label>
                    <input type="text" value={question} onChange={questionHandler} id="edit_question"/>
                </div>
                <div className={s.editInput}>
                    <label htmlFor="edit_answer">Answer:</label>
                    <input type="text" value={answer} onChange={answerHandler} id="edit_answer"/>
                </div>
            </div>
            <div className={s.buttonsBlock}>
                <button className={s.cancelBtn} onClick={closeEditMode}>Cancel</button>
                <button className={s.saveBtn} onClick={updateCard}>Save</button>
            </div>

        </div>
    );
}