import React from "react";
import "./StoreMain.css";
import SkinCare from "../skincare/SkinCare"
import CosmeticsMain from "../cosmetics/CosmeticsMain";

export default function StoreMain() {
    return (
        <div id="storemain-div">
            <section id="skincare-sec">
                <SkinCare />
            </section>
            <section id="cosmetics-sec">
                <CosmeticsMain />
            </section>
        </div>
    );
}