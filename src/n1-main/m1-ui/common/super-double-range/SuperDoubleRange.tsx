import React, {ChangeEvent} from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

type SuperDoubleRangePropsType = {
    onChangeRange: (value: [number, number]) => void
    value: number | number[]
    className?: string
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (props) => {

    const handleChange = (event: ChangeEvent<{}>, newValue: any) => {
        props.onChangeRange([newValue[0], newValue[1]])
    };

    return (
        <div className={props.className ? props.className : ''}>
            <Typography id="range-slider2" gutterBottom>
            </Typography>
            <Slider
                value={props.value}
                onChange={handleChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider2"
            />
        </div>
    );
}


export default SuperDoubleRange;