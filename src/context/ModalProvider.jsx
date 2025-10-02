/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const ModalContext = createContext();

// custom hook
export const useModalContext = () => {
    return useContext(ModalContext);
};

function ModalProvider({ children }) {
    const [isShowing, setIsShowing] = useState(false);
    const [content, setContent] = useState();

    useEffect(() => {
        if (isShowing) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }, [isShowing]);

    const openPopUp = (content) => {
        setIsShowing(true);
        setContent(content);
    };

    return (
        <ModalContext.Provider value={{ openPopUp }}>
            {children}
            {isShowing && (
                <div className="fixed inset-0">
                    <div className="absolute inset-0 bg-slate-600/60" />
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        onClick={() => setIsShowing(false)}
                    >
                        {content}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
}
export default ModalProvider;
