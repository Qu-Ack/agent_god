import { type CustomNode } from "./types/types"
import { type Edge } from "@xyflow/react"


// workflows could be traversed..
function convertEdgesAndNodesToWorkflow(nodes: CustomNode[], edges: Edge[]) {
	const NodeMap: Record<string, CustomNode> = {};

	for (const node of nodes) {
		NodeMap[node.id] = node;
	}


}

export { convertEdgesAndNodesToWorkflow };
