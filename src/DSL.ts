import { type CustomNode } from "./types/types"
import { type Edge } from "@xyflow/react"

export class WorkflowEngine {
	adj: Record<string, string[]>
	NodeMap: Record<string, CustomNode>
	Incoming: Set<string>

	constructor(nodes: CustomNode[], edges: Edge[]) {
		this.adj = {};
		this.NodeMap = {};
		this.Incoming = new Set<string>();

		for (const node of nodes) {
			this.adj[node.id] = [];
			this.NodeMap[node.id] = node;
		}

		for (const edge of edges) {
			this.adj[edge.source].push(edge.target);
		}

		console.log(this.adj);
		this.getStartNodes();
	}

	getStartNodes(): string[] {
		this.Incoming = new Set<string>();

		for (const sourceId in this.adj) {
			for (const targetId of this.adj[sourceId]) {  
				this.Incoming.add(targetId);
			}
		}

		let result = [];
		for (const nodeId in this.NodeMap) {
			if (!this.Incoming.has(nodeId)) {
				result.push(nodeId);
			}
		}

		console.log(result);
		return result;
	}
}
