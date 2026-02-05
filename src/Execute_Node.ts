import { type CustomNode, type Action, GMAIL_ACT, DISCORD_MSG_ACT } from "./types/types";

export function executeActionNodes(node: CustomNode) {
	switch (node.kind) {
		case GMAIL_ACT:
			executeGmailAct(node);
			break;
		case DISCORD_MSG_ACT:
			executeDiscordMsgAct(node);
			break;
		default:
			console.log("invalid node kind")
	}
}

function executeGmailAct(node: Action) {
	console.log("gmail action");
	console.log(node);
}


function executeDiscordMsgAct(node: Action) {
	console.log("discord message");
	console.log(node);
}
