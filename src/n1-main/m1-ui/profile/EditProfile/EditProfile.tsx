import React, {ChangeEvent, useState} from "react";
import {updateProfileTC} from "../profile-reducer";
import {useDispatch} from "react-redux";
import {PATH} from "../../routes/Routes";
import {NavLink} from "react-router-dom";
import s from "./EditProfile.module.scss"


export const EditProfile: React.FC = () => {

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

    return (
        <div className={s.editContainer}>
            <h3>Personal information</h3>
            <div >
                <h4>NickName:</h4>
                <input type="text" value={newName} onChange={changeNameHandler}/>
                <h4>urlPhoto:</h4>
                <input type="text" value={newPhoto} onChange={changePhotoHandler}/>
            </div>
            <div>
                <NavLink to={PATH.PROFILE}>cancel</NavLink>
                <button onClick={updateProfile}>Save</button>
            </div>
        </div>
    )
}