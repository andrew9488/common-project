import React, {ChangeEvent, useState} from "react";
import s from "./EditPack.module.scss";

type EditPackPropsType = {
    packId: string
    closeEditModal: () => void
    updatePack: (id: string, name: string) => void
    packName?: string
}

export const EditPack: React.FC<EditPackPropsType> = props => {

    const {packName= "packName"} = props

    const [newName, setNewName] = useState<string>(packName)

    const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }
    const updateCard = () => {
        props.updatePack(props.packId, newName)
        props.closeEditModal()
    }

    const closeEditMode = () => {
        props.closeEditModal()
    }

    return (
        <div className={s.editContainer}>
            <h3>Pack info</h3>
            <div className={s.inputsBlock}>
                <div className={s.editInput}>
                    <label htmlFor="edit_pack">New name:</label>
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