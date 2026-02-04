import { useState } from "react"
import "./NodeMenu.css"
import { GMAIL_TRIG, GMAIL_ACT, DISCORD_MSG_ACT } from "../types/types";

export default function NodeMenu({ handleSelection }: { handleSelection: (selection: string | null) => void }) {
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
					<button onClick={() => handleSelection(GMAIL_TRIG)}>Gmail Trigger</button>
					<button onClick={() => handleSelection(GMAIL_ACT)}>Gmail Action</button>
					<button onClick={() => handleSelection(DISCORD_MSG_ACT)}>Discord Message Action</button>
				</div>
			</div>
		)
	}
}
