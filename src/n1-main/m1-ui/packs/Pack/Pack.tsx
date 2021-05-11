import React from "react";
import {NavLink} from "react-router-dom";
import {PATH} from "../../routes/Routes";
import {PackType} from "../../../m3-dal/api";

type PackPropsType = {
    pack: PackType
}

export const Pack: React.FC<PackPropsType> = (props) => {
    return (
        <>
            <tr key={props.pack._id}>
                <td>{props.pack.name}</td>
                <td>{props.pack.cardsCount}</td>
                <td>{props.pack.updated}</td>
                <td>{props.pack.path}</td>
                <td>
                    <button>add</button>
                    <button>update</button>
                    <NavLink to={PATH.CARDS}>cards</NavLink>
                </td>
            </tr>
        </>
    );
}