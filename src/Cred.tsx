import { useState } from "react";
import "./Cred.css"

export default function Cred() {
	const [isModal, setIsModal] = useState(false);
	const [cred, setCred] = useState<string | null>(null);

	function setUpDiscord() {
		setIsModal(true);
		setCred("discord");
	}

	function setUpGmail() {
		setIsModal(true);
		setCred("gmail");
	}

	function handleCloseModal() {
		setIsModal(false);
		setCred(null);
	}

	return (
		<div className="creds">
			<button onClick={setUpDiscord}>Discord</button>
			<button onClick={setUpGmail}>Gmail</button>
			{isModal && <div className="modal">
				<CredModal cred={cred!} />
				<button onClick={handleCloseModal}>Close</button>
				</div>}
		</div>
	)
}


function CredModal({ cred }: { cred: string }) {
	switch (cred) {
		case "discord":
			return <div>Discord</div>
		case "gmail":
			return <div>Gmail</div>
		default:
			return <div>Invalid Cred</div>
	}


}
