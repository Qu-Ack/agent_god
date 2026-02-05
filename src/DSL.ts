import { type CustomNode } from "./types/types"
import { type Edge } from "@xyflow/react"
import { Queue } from "./Queue"

export class WorkflowEngine {
	adj: Record<string, string[]>
	NodeMap: Record<string, CustomNode>
	TotalNodes: number;
	TotalEdges: number;
	Incoming: Set<string>

	constructor(nodes: CustomNode[], edges: Edge[]) {
		this.adj = {};
		this.NodeMap = {};
		this.Incoming = new Set<string>();

		this.TotalNodes = nodes.length;
		this.TotalEdges = edges.length;

		for (const node of nodes) {
			this.adj[node.id] = [];
			this.NodeMap[node.id] = node;
		}

		for (const edge of edges) {
			this.adj[edge.source].push(edge.target);
		}

		this.execute(this.getStartNodes(), nodes);
	}

	ConvertToExecutionQueue(node: string, nodes: CustomNode[]) {
		let q = new Queue<string>();
		let execution_queue = new Queue<CustomNode>();

		q.push(node);

		let VisitedMap: Record<string, number> = {};

		for (const node of nodes) {
			VisitedMap[node.id] = -1;
		}

		let flag = false;

		while (!q.empty()) {
			const f = q.front();
			q.pop();
			VisitedMap[f] = 1

			for (const n of this.adj[f]) {
				if (VisitedMap[n] == -1) {
					execution_queue.push(this.NodeMap[n]);
					q.push(n);
				} else {
					console.log("breaking cycle detected");
					flag = true;
					break;
				}
			}
		}
		if (!flag) execution_queue.print();
	}

	execute(startNodes: string[], nodes: CustomNode[]) {
		if (startNodes.length == 0) {
			console.log("no start node found.");
		}

		for (const node of startNodes) {
			this.ConvertToExecutionQueue(node, nodes);
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
