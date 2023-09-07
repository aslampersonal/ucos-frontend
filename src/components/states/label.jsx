import React, {useContext} from "react";
import { Mycontext } from "../../pages/HomePage";

function Label (props) {

        const val = useContext(Mycontext);
        const style = props.isActive ? {background: 'green', padding: "5px", color: "white"} : {background: 'orange', padding: "5px"};

        if(val === false) {
            return null;
        }
        return (
            <span 
                onClick={() => {
                    props.onAction(props.isActive ? "active" : "non-active");
                }} 
                style={style}
            >
                {props.isActive ? "Active" : "Non Active"}
            </span>
        )
}

export default Label;