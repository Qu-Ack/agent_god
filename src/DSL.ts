import { type CustomNode } from "./types/types"
import { type Edge } from "@xyflow/react"
import { Queue } from "./Queue"

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

		this.execute(this.getStartNodes());
	}

	ConvertToExecutionQueue(node: string) {
		let q = new Queue<string>();
		let execution_queue = new Queue<CustomNode>();
		q.push(node);

		while (!q.empty()) {
			const f = q.front();
			q.pop();

			for (const n of this.adj[f]) {
				execution_queue.push(this.NodeMap[n]);
				q.push(n);
			}
		}

		execution_queue.print();
	}

	execute(startNodes: string[]) {
		for (const node of startNodes) {
			this.ConvertToExecutionQueue(node);
		}
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

		return result;
	}
}
