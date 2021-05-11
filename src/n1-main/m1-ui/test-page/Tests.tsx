import React from "react";
import SuperButton from "../common/super-button/SuperButton";
import SuperInput from "../common/super-input/SuperInput";
import SuperCheckbox from "../common/super-checkbox/SuperCheckbox";
import SuperRadio from "../common/super-radio/SuperRadio";

const TestPage: React.FC = () => {
    return (
        <div>
            <SuperButton text={'a'}/>
            <SuperInput/>
            <SuperCheckbox/>
            <SuperRadio/>
        </div>
    )
}

export default TestPage