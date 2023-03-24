import "./PreLoader.css";
import React, { useState } from "react";
import { PreLoaderContext } from "./PreLoaderContext.js";
import Title from "./Title.js";

type PreLoaderProps = {
    children: React.ReactNode;
};

function PreLoader({ children }: PreLoaderProps) {
    const [isActive, setIsActive] = useState(true);

    return (
        <PreLoaderContext.Provider value={{
            EnablePreLoader: () => setIsActive(true),
            DisablePreLoader: () => setIsActive(false),
        }}>
            {isActive &&
                <div
                    id="preloader"
                    style={{
                        backgroundColor: "#242424",
                        position: "absolute",
                        top: "0px",
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <div title="Vocab Versus..." className="text-glitch">Vocab Versus...</div>
                </div>
            }
            {children}
        </PreLoaderContext.Provider>
    )
}

export default PreLoader