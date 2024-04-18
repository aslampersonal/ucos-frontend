import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Users from "../../components/Admin/dataTables/Users";
import Orders from "../../components/Admin/dataTables/Orders";
import Products from "../../components/Admin/dataTables/Products";

export default function DataPage() {
    
    const [path, setPath] = useState("");
    const loc = useLocation().pathname.slice(7.0);

    if (loc == "users") {
        return (
            <div className="main">
                <Users />
            </div>
        ) 
    } else if (loc == "orders") {
        return (
            <div className="main">
                <Orders />
            </div>
        )
    } else if (loc == "products") {
        return (
            <div className="main">
                <Products />
            </div>
        )
    }
}