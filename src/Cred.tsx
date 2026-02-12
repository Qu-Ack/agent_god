import "./Cred.css"


export default function Creds() {

	async function handleConnectGmail() {
		window.location.href = `${import.meta.env.VITE_API_URL}/redirect/gmail`; 
	}

	return (
		<div>
			<button onClick={handleConnectGmail}>Connect Gmail</button>
		</div>
	)
}

