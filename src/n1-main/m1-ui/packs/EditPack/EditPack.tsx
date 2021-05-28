import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import s from "../../profile/EditProfile/EditProfile.module.scss";
import {updateCardsPackTC} from "../packs-reducer";

type EditPackPropsType = {
    packId: string
    closeEditModal: () => void
}

export const EditPack: React.FC<EditPackPropsType> = props => {

    const dispatch = useDispatch();

    const [newName, setNewName] = useState<string>("")

    const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }
    const updateCard = () => {
        dispatch(updateCardsPackTC(props.packId, newName))
    }
    const closeEditMode = () => {
        props.closeEditModal()
    }

    return (
        <div className={s.editContainer}>
            <h3>Pack info</h3>
            <div className={s.inputsBlock}>
                <div className={s.editInput}>
                    <label htmlFor="edit_pack">Question:</label>
                    <input type="text" value={newName} onChange={changePackNameHandler} id="edit_pack"/>
                </div>
            </div>
            <div className={s.buttonsBlock}>
                <button className={s.cancelBtn} onClick={closeEditMode}>Cancel</button>
                <button className={s.saveBtn} onClick={updateCard}>Save</button>
            </div>
        </div>
    )
}