import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from "./SuperButton.module.css";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    text:string
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red,text, className,
        ...restProps
    }
) => {

    const finalClassName = `${red ? s.red : s.default} ${className}`;

    return (
        <button
            className={finalClassName}
            {...restProps}
        >{text}</button>

    );
}

export default SuperButton;