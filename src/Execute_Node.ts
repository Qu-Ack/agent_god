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

// https://discord.com/api/v{version_number}
// https://gmail.googleapis.com

function executeGmailAct(node: Action) {
}

function executeDiscordMsgAct(node: Action) {
	console.log("discord message");
	console.log(node);
}
