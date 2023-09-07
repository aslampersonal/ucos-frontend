import React, {useState, useEffect} from "react";

function AboutUs(props) {
    
    const [value, setValue] = useState(0);
    const [color, setColor] = useState("white");
    const [boom, setBoom] = useState(false);

    useEffect(() => {
        setBoom(false);
        const id = setTimeout(() => {
            setBoom(true);
        }, value * 1000);

        return () => {
            clearTimeout(id);
        }

    }, [value]);

    useEffect(() => {
        console.log("component mounted")

        return () => {
            console.log("component un-mounted")
        }

    }, []);
    
    return (
        <>
            <div style={{backgroundColor: color, margin: "4rem", border: "1px solid black", borderRadius: "5px", width: "10rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2rem"}}>
                <button onClick={() => {
                    setValue((state) => {
                        return state + 1;
                    });
                }}>Increment</button>
                <label style={{fontSize: "45px"}}>{value}</label>
                <button onClick={() => {
                    setValue((state) => {
                        return state - 1;
                    });
                }}>Decrement</button>
            </div>
            <div>
                <button onClick={() => {
                    setColor("green");
                }}>Green</button>
                <button onClick={() => {
                    setColor("red");
                }}>Red</button>
            </div>
            {
                boom && value ? (
                    <div>
                        <span style={{fontSize: "55px", color: "red"}}>BooM</span>
                    </div>
                ) : null
                    }
        </>
    );
}

export default AboutUs;