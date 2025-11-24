import { useState } from "react";
import { Button } from "@chakra-ui/react";
const Toggle = ({ text, children }: { text: string, children: React.ReactNode }) => {
    const [showing, setShowing] = useState(false)

    return (
    <>
        <Button fontSize="sm" borderColor="#777" onClick={() => setShowing(!showing)}>{text + " " + (showing ? "˅" : ">")}</Button>
        {showing ? children : <></>}
    </>
    )
}

export default Toggle