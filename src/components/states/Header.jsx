import React from "react";

function Header(props) {
    
    const {
        onMenuSelect
    } = props;
    
    return (
        <div style={{width: "100%", height: "5rem", display: "flex", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "#f1f1f1"}}>
            <span onClick={() => {onMenuSelect("home")}} style={{cursor: "pointer", color: "blue", fontSize: "17px"}}>Home</span>
            <span onClick={() => {onMenuSelect("about us")}} style={{cursor: "pointer", color: "blue", fontSize: "17px"}}>About Us</span>
            <span onClick={() => {onMenuSelect("settings")}} style={{cursor: "pointer", color: "blue", fontSize: "17px"}}>Settings</span>
            <span onClick={() => {onMenuSelect("logout")}} style={{cursor: "pointer", color: "blue", fontSize: "17px"}}>Logout</span>
        </div>
    );
}

export default Header;