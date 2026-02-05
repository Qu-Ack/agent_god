import './App.css'
import { useCallback, useState } from 'react';
import { ReactFlow, ReactFlowProvider, type Edge, type NodeChange, type EdgeChange, type Connection } from '@xyflow/react';
import { useNodesState, useEdgesState, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { CreateGhostNode, addGhostNode, updateGhostNodePosition, convertGhostToHuman } from './GhostNode';
import { WorkflowEngine } from './DSL';
import { useReactFlow } from "@xyflow/react"
import '@xyflow/react/dist/style.css';
import { type CustomNode } from './types/types';
import NodeMenu from './components/NodeMenu';

const initialNodes: CustomNode[] = [
	//	{
	//		kind: "trigger",
	//		id: "n1",
	//		position: {
	//			x: 0,
	//			y: 0,
	//		},
	//		data: {
	//			label: "node 1"
	//		},
	//	},
	//	{
	//		kind: "action",
	//		type: "getEnv",
	//		id: "n2",
	//		position: {
	//			x: 100,
	//			y: 100,
	//		},
	//		data: {
	//			label: "node 2"
	//		},
	//	},
	//	{
	//		kind: "action",
	//		type: "getEnv",
	//		id: "n3",
	//		position: {
	//			x: 200,
	//			y: 200,
	//		},
	//		data: {
	//			label: "node 3"
	//		},
	//	},
];

const initialEdges: Edge[] = [
];

export function TextUpdaterNode() {
	const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
		console.log(evt.target.value);
	}, []);

	return (
		<div className="text-updater-node">
			<div>
				<label htmlFor="text">Text:</label>
				<input id="text" name="text" onChange={onChange} className="nodrag" />
			</div>
		</div>
	);
}

const nodeTypes = {
	textUpdater: TextUpdaterNode,
};

export default function App() {
	return (
		<ReactFlowProvider>
			<Editor />
		</ReactFlowProvider>
	)
}

function Editor() {
	const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [selectedNode, setSelectedNode] = useState<string | null>(null);
	const { screenToFlowPosition } = useReactFlow();

	const handleNodesChange = useCallback((changes: NodeChange<CustomNode>[]) => {
		setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot))
	}, [])

	const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
		setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot))
	}, [])

	const handleConnection = useCallback((params: Connection) => {
		setEdges((edgesSnapshot) => addEdge({ ...params, type: "step" }, edgesSnapshot))
	}, [])

	function handleSelectNode(selection: string | null) {
		setSelectedNode(selection);
	}

	function handleMouseOver(e: React.MouseEvent<HTMLDivElement>) {
		if (selectedNode) {
			const pos = screenToFlowPosition({
				x: e.clientX,
				y: e.clientY,
			})

			if (!addGhostNode(CreateGhostNode(pos, selectedNode, selectedNode), setNodes, nodes)) {
				console.log("a ghost node is already present, cannot add another one!");
			}
		}
	}

	function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
		if (selectedNode) {
			console.log("updating...");
			updateGhostNodePosition(screenToFlowPosition({ x: e.clientX, y: e.clientY }), setNodes)
		}
	}

	function handleMouseClick() {
		if (selectedNode) {
			if (!convertGhostToHuman(setNodes, nodes)) {
				console.log("could not add to nodes either no ghost node present, or wrong ghost_node.kind")
			}
			setSelectedNode(null);
		}
	}

	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<NodeMenu handleSelection={handleSelectNode} />
			<DeveloperTools />
			<ReactFlow
				nodeTypes={nodeTypes}
				onNodesChange={handleNodesChange}
				onEdgesChange={handleEdgesChange}
				onConnect={handleConnection}
				onMouseOver={handleMouseOver}
				onMouseMove={handleMouseMove}
				onClick={handleMouseClick}
				edges={edges}
				nodes={nodes}
				fitView
			/>
		</div>
	);
}

function DeveloperTools() {
	const { getNodes, getEdges } = useReactFlow<CustomNode>();

	function handleClick() {
		const workflowEngine = new WorkflowEngine(getNodes(), getEdges());
		console.log(workflowEngine.adj);
	}

	function handlelogNodes() {
		const nodes = getNodes();
		console.log(nodes);
	}

	function handlelogEdges() {
		const edges = getEdges();
		console.log(edges);
	}

	return (
		<div id="dev-tools">
			<button onClick={handleClick}>log adj</button>
			<button onClick={handlelogNodes}>log nodes</button>
			<button onClick={handlelogEdges}>log edges</button>
		</div>
	)
}
