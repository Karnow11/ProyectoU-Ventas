import { useState } from "react";

const Toggle = ({ text, children }: { text: string, children: React.ReactNode }) => {
    const [showing, setShowing] = useState(false)

    return (
    <>
        <button onClick={() => setShowing(!showing)}>{text + " " + (showing ? "˅" : ">")}</button>
        {showing ? children : <></>}
    </>
    )
}

export default Toggle