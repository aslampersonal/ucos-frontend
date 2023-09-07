import React from "react";
import States from './states';


function SimpleList (props) {
    
    const {
        data,
        onAction,
        onLabelClick
    } = props;

    return (
        <main>
            {
                data.map((obj) => {
                    return <States 
                    key={obj.title} 
                    title={obj.title} 
                    desc={obj.desc} 
                    isActive={obj.isActive}
                    onLabelClick={onLabelClick} 
                    onDelete={() => {
                        onAction(obj);
                    }}
                    />
                })
            }
        </main>
    );
}

export default SimpleList;