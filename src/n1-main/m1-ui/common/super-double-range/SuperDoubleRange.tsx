import React, {ChangeEvent} from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

type SuperDoubleRangePropsType = {
    onChangeRange: (value: [number, number]) => void
    value: number | number[]
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (props) => {
    // сделать самому, можно подключать библиотеки

    const handleChange = (event: ChangeEvent<{}>, newValue: any) => {
        props.onChangeRange([newValue[0], newValue[1]])
    };

    return (
        <div>
            <Typography id="range-slider2" gutterBottom>
            </Typography>
            <Slider
                value={props.value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider2"
            />
        </div>
    );
}



export default SuperDoubleRange;