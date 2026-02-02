import { useState } from "react"
import "./NodeMenu.css"

export default function NodeMenu({handleSelection}: {handleSelection: (selection: string | null) => void}) {
    const [collapsed, setCollapsed] = useState(true);

    function handleCollapse() {
        setCollapsed(!collapsed);
    }

    if (collapsed) {
        return (
            <div className="node_menu_opener">
                <button onClick={handleCollapse}>open</button>
            </div>
        )
    } else {
        return (
            <div className="node_menu">
                <button onClick={handleCollapse}>Close</button>

                <div>
                    <button onClick={() => handleSelection("gmail_trigg")}>Gmail Trigger</button>
                    <button onClick={() => handleSelection("discord_msg")}>Send Discord Message</button>
                </div>
            </div>
        )
    }
}