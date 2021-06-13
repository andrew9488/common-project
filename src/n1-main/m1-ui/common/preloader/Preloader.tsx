import React from "react";
import preloader from "../../../../assets/icons-and-images/482.svg"

export const Preloader: React.FC = () => {
    return (
        <div style={{margin: "100px auto", width: "150px", height: "150px"}}>
            <img src={preloader} alt="loading..."/>
        </div>
    )
}