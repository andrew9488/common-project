import React from "react";
import s from "./Table.module.scss"

type TablePropsType = {
    titleColumns: string[]
    items: (string | number | JSX.Element)[][]
}

export const Table: React.FC<TablePropsType> = props => {

    return (
        <table className={s.tableContainer}>
            <thead className={s.tableHeader}>
            <tr>
                {
                    props.titleColumns.map((t, index) => {
                        return <th key={index}>{t}</th>
                    })
                }
            </tr>
            </thead>
            <tbody className={s.tableBody}>
            {props.items && props.items.map((it, index) => {
                return <tr key={index} className={s.row}>
                    {it.map((i, index) => {
                        return <td key={index}>{i}</td>
                    })}
                </tr>
            })}
            </tbody>
        </table>
    );
}
