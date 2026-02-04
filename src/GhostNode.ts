import { type Node, type XYPosition } from "@xyflow/react"
import { type CustomNode, GMAIL_TRIG, GMAIL_ACT, DISCORD_MSG_ACT, type Trigger, type Action } from "./types/types";
import { makeid } from "./utils";

interface GhostNode extends Node {
	kind: string;
};

const GHOST_NODE_ID = "__ghost__";

function CreateGhostNode(pos: XYPosition, data: string, kind: string): GhostNode {
	const node: GhostNode = {
		id: GHOST_NODE_ID,
		position: pos,
		data: {
			label: data,
		},
		kind: kind,
		selectable: false,
		draggable: false,
		focusable: false,
		style: { opacity: 0.5 },
	}

	return node;
}


function convertGhostToHuman(setNodes: React.Dispatch<React.SetStateAction<CustomNode[]>>, nodes: CustomNode[]): boolean {
	const [ghost_node, _] = findGhostNode(nodes);

	if (!ghost_node) {
		return false;
	}

	switch (ghost_node.kind) {
		case GMAIL_TRIG:
			const new_node: Trigger = {
				id: makeid(6),
				kind: GMAIL_TRIG,
				position: ghost_node.position,
				data: {
					label: GMAIL_TRIG,
				}
			}

			setNodes(nds => {
				const filtered = nds.filter(nd => nd.id != GHOST_NODE_ID);

				const updated_elem = [...filtered, new_node];
				return updated_elem;
			})

			return true;
		case GMAIL_ACT:
			const gmail_act: Action = {
				id: makeid(6),
				kind: GMAIL_ACT,
				position: ghost_node.position,
				data: {
					label: GMAIL_ACT,
				}
			}

			setNodes(nds => {
				const filtered = nds.filter(nd => nd.id != GHOST_NODE_ID);

				const updated_elem = [...filtered, gmail_act];
				return updated_elem;
			})

			return true;
		case DISCORD_MSG_ACT:
			const discord_msg_act: Action = {
				id: makeid(6),
				kind: DISCORD_MSG_ACT,
				position: ghost_node.position,
				data: {
					label: DISCORD_MSG_ACT,
				}
			}

			setNodes(nds => {
				const filtered = nds.filter(nd => nd.id != GHOST_NODE_ID);

				const updated_elem = [...filtered, discord_msg_act];
				return updated_elem;
			})

			return true;


		default:
			return false;
	}

}

function findGhostNode(nodes: CustomNode[]): [GhostNode | undefined, number] {
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i].id == GHOST_NODE_ID) return [nodes[i], i];
	}
	return [undefined, -1];
}

function replaceGhostNode(new_node: GhostNode, setNodes: React.Dispatch<React.SetStateAction<CustomNode[]>>) {
	setNodes(nds =>
		nds.map((node) =>
			node.id == GHOST_NODE_ID ?
				new_node : node


		)

	)
}

function addGhostNode(node: GhostNode, setNodes: React.Dispatch<React.SetStateAction<CustomNode[]>>, nodes: CustomNode[]): boolean {
	for (const custom_node of nodes) {
		if (custom_node.id == GHOST_NODE_ID) {
			return false;
		}
	}

	setNodes(nds => nds.concat(node));
	return true;
}


function updateGhostNodePosition(pos: XYPosition, setNodes: React.Dispatch<React.SetStateAction<CustomNode[]>>) {
	setNodes(nodes => {
		return nodes.map(node => {
			if (node.id == GHOST_NODE_ID) {
				return { ...node, position: pos };
			} else {
				return node;
			}
		})
	})
}

export { replaceGhostNode, updateGhostNodePosition, addGhostNode, CreateGhostNode, findGhostNode, convertGhostToHuman };
