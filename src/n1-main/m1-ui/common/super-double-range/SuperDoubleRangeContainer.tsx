import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {setMinMaxValuesAC} from "../../Search/filter-reducer";
import SuperDoubleRange from "./SuperDoubleRange";

type SuperDoubleRangeContainerPropsType = {
    min: number
    max: number
}
export const SuperDoubleRangeContainer: React.FC<SuperDoubleRangeContainerPropsType> = (props) => {

    const dispatch = useDispatch();
    const [min, setMin] = useState<number>(props.min);
    const [max, setMax] = useState<number>(props.max);
    const onChangeRangeHandler = (values: number[]) => {
        setMin(values[0]);
        setMax(values[1]);
        dispatch(setMinMaxValuesAC(values));
    }

    return (
        <>
            <SuperDoubleRange onChangeRange={onChangeRangeHandler} value={[min, max]}/>
        </>
    );
}