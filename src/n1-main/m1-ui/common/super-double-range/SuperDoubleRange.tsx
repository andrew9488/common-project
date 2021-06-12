import React, {ChangeEvent} from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {withStyles} from "@material-ui/core";

type SuperDoubleRangePropsType = {
    onChangeRange: (value: [number, number]) => void
    value: number | number[]
    className?: string
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (props) => {

    const handleChange = (event: ChangeEvent<{}>, newValue: any) => {
        props.onChangeRange([newValue[0], newValue[1]])
    };


    const StyledSlider = withStyles({
        root: {
            color: "rgb(53, 62, 14)",
            width: "100%",
            cursor: "pointer",
            height: "5px",
            display: "inline-block",
            padding: "13px 0",
            position: "relative",
            boxSizing: "content-box",
            touchAction: "none",
            webkitTapHighlightColor: "transparent"
        },
        rail: {
            width: "100%",
            height: "5px",
            display: "block",
            opacity: "0.38",
            position: "absolute",
            borderRadius: "1px",
            backgroundColor: "currentColor"
        },
        track: {
            height: "5px",
            display: "block",
            position: "absolute",
            borderRadius: "1px",
            backgroundColor: "currentColor"
        },
        thumb: {
            width: "16px",
            height: "16px",
            display: "flex",
            outline: "0",
            position: "absolute",
            boxSizing: "border-box",
            marginTop: "-5px",
            transition: "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            alignItems: "center",
            marginLeft: "-6px",
            borderRadius: "50%",
            justifyContent: "center",
            backgroundColor: "currentColor",
            valueLabel: {
                left: "calc(-50% - 0px)",
            }
        },
        valueLabel: {
            left: "calc(-50% - 0px)",
        },
        // circle10: {
        //     width: "32px",
        //     height: "24px",
        //     display: "flex",
        //     alignItems: "center",
        //     borderRadius: "3px",
        //     justifyContent: "center",
        //     backgroundColor: "currentColor"
        // }
    })(Slider);

    return (

        <div>
            <Typography id="range-slider2" gutterBottom>
            </Typography>
            <StyledSlider value={props.value}
                          onChange={handleChange}
                          valueLabelDisplay="on"
                          aria-labelledby="range-slider2"
            />
        </div>
    );
}


export default SuperDoubleRange;