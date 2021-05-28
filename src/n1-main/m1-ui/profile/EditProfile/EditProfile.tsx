import React, {ChangeEvent, useState} from "react";
import {updateProfileTC} from "../profile-reducer";
import {useDispatch} from "react-redux";
import s from "./EditProfile.module.scss"

type EditProfilePropsType = {
    closeEditModal: () => void
}

export const EditProfile: React.FC<EditProfilePropsType> = (props) => {

    const dispatch = useDispatch();

    const [newName, setNewName] = useState<string>("")
    const [newPhoto, setNewPhoto] = useState<string>("")

    const changePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPhoto(e.currentTarget.value)
    }
    const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }
    const updateProfile = () => {
        dispatch(updateProfileTC(newName, newPhoto))
    }
    const closeEditMode = () => {
        props.closeEditModal()
    }

    return (
        <div className={s.editContainer}>
            <h3>Personal information</h3>
            <div className={s.inputsBlock}>
                <div className={s.editInput}>
                    <label htmlFor="edit_name">Nick Name:</label>
                    <input type="text" value={newName} onChange={changeNameHandler} id="edit_name"/>
                </div>
                <div className={s.editInput}>
                    <label htmlFor="edit_photo">URL Photo:</label>
                    <input type="text" value={newPhoto} onChange={changePhotoHandler} id="edit_photo"/>
                </div>
            </div>
            <div className={s.buttonsBlock}>
                <button className={s.cancelBtn} onClick={closeEditMode}>Cancel</button>
                <button className={s.saveBtn} onClick={updateProfile}>Save</button>
            </div>
        </div>
    )
}