import { type Node } from "@xyflow/react";

export interface Trigger extends Node {
	kind: string;
};

export interface Action extends Node {
	kind: string;
};

interface GhostNode extends Node {
	kind: string;
};

export type CustomNode = Trigger | Action | GhostNode;

export const GMAIL_TRIG = "gmail trigger";
export const GMAIL_ACT = "gmail action";
export const DISCORD_MSG_ACT = "discord message";


