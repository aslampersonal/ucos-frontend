import react from 'react';
import Label from './label';

function States(props) {

    const {
        title,
        desc,
        isActive, 
        onDelete,
        onLabelClick
    } = props;
     
    return (
        <div style={{marginBottom:"2rem", border: "2px solid black", width: "50rem", padding: "1rem"}}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <h4>{title}</h4>
                <label onClick={onDelete} style={{fontSize: "15px", color: "blue", padding: "0 4px", cursor: "pointer"}}>Delete</label>
            </div>
            <h4>{desc}</h4>
            <div>
                <Label onAction={onLabelClick} isActive={isActive} />
            </div>
        </div>
    );

}

export default States;