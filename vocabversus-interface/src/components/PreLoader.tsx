import "./GlitchText.css";
import React, { useState } from "react";
import { PreLoaderContext } from "./PreLoaderContext.js";

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
                        justifyContent: "center",
                        zIndex: 100,
                    }}>
                    <div title="Vocab Versus..." className="text-glitch">Vocab Versus...</div>
                </div>
            }
            {children}
        </PreLoaderContext.Provider>
    )
}

export default PreLoader