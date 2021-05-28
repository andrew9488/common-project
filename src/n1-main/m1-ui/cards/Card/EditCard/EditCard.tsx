import React, {ChangeEvent, useState} from "react";
import s from "../../../profile/EditProfile/EditProfile.module.scss";
import {useDispatch} from "react-redux";
import {updateCardTC} from "../../cards-reducer";

type EditCardPropsType = {
    cardId: string
    closeEditModal: () => void
}

export const EditCard: React.FC<EditCardPropsType> = (props) => {

    const dispatch = useDispatch();

    const [question, setQuestion] = useState<string>("")
    const [answer, setAnswer] = useState<string>("")

    const changeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const changeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const updateCard = () => {
        dispatch(updateCardTC(props.cardId, question, answer))
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
                    <input type="text" value={question} onChange={changeQuestionHandler} id="edit_question"/>
                </div>
                <div className={s.editInput}>
                    <label htmlFor="edit_answer">Answer:</label>
                    <input type="text" value={answer} onChange={changeAnswerHandler} id="edit_answer"/>
                </div>
            </div>
            <div className={s.buttonsBlock}>
                <button className={s.cancelBtn} onClick={closeEditMode}>Cancel</button>
                <button className={s.saveBtn} onClick={updateCard}>Save</button>
            </div>

        </div>
    );
}