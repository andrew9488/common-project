import React from "react";

type TablePropsType = {
    titleColumns: string[]
    items: (string | number | JSX.Element)[][]
}

export const Table: React.FC<TablePropsType> = props => {

    return (
        <table>
            <thead>
            <tr>
                {
                    props.titleColumns.map((t, index) => {
                        return <th key={index}>{t}</th>
                    })
                }
            </tr>
            </thead>
            <tbody>
            {props.items && props.items.map((it, index) => {
                return <tr key={index}>
                    {it.map((i, index) => {
                        return <td key={index}>{i}</td>
                    })}
                </tr>
            })}
            </tbody>
        </table>
    );
}
