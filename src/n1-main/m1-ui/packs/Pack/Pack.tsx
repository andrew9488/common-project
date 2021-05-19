import React from "react";
import {NavLink} from "react-router-dom";
import {PATH} from "../../routes/Routes";
import {PackType} from '../../../m3-dal/packAPI';

type PackPropsType = {
    pack: PackType
    updateCardsPackName: (id: string) => void
    deleteCardsPack: (id: string) => void
}

export const Pack: React.FC<PackPropsType> = (props) => {


    return (
        <>
            <tr>
                <td>{props.pack.name}</td>
                <td>{props.pack.cardsCount}</td>
                <td>{props.pack.updated}</td>
                <td>{props.pack.user_name}</td>
                <td>
                    <button onClick={() => props.deleteCardsPack(props.pack._id)}>del</button>
                    <button onClick={() => props.updateCardsPackName(props.pack._id)}>update</button>
                    <NavLink to={`${PATH.CARDS}/${props.pack._id}`}>cards</NavLink>
                    <NavLink to={`${PATH.LEARN}/${props.pack._id}`}>learn</NavLink>
                </td>
            </tr>
        </>
    );
}