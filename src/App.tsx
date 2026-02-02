import './App.css'
import { useCallback, useState } from 'react';
import { ReactFlow, ReactFlowProvider, type Node, type Edge, type NodeChange, type EdgeChange, type Connection } from '@xyflow/react';
import { useNodesState, useEdgesState, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { useReactFlow } from "@xyflow/react"
import '@xyflow/react/dist/style.css';
import NodeMenu from './components/NodeMenu';

interface Trigger extends Node {
	kind: string;
	text: string;
};

interface Action extends Node {
	text: string;
	kind: string;
	shape: string;
};

type CustomNode = Trigger | Action;

const initialNodes: CustomNode[] = [
	{
		text: "hello",
		kind: "trigger",
		id: "n1",
		position: {
			x: 0,
			y: 0,
		},
		data: {
			label: "node 1"
		},
	},
	{
		text: "daksg",
		kind: "action",
		shape: "square",
		type: "getEnv",
		id: "n2",
		position: {
			x: 100,
			y: 100,
		},
		data: {
			label: "node 2"
		},
	},
	{
		text: "daksh",
		kind: "action",
		shape: "square",
		type: "getEnv",
		id: "n3",
		position: {
			x: 200,
			y: 200,
		},
		data: {
			label: "node 3"
		},
	},
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
			// render the node on the editor in some transparent color
			const idx = nodes.findIndex(node => node.id == "1233");
			const newNode: CustomNode = {
				text: "hello",
				kind: "action",
				id: "1233",
				position: screenToFlowPosition({
					x: e.clientX,
					y: e.clientY,
				}),
				data: {
					label: selectedNode,
				},
			};

			if (idx == -1) {
				setNodes((nds) => nds.concat(newNode));
			} else {
				setNodes(nds => {
					const nodes = [...nds];
					nds[idx] = newNode;
					return nodes;
				})
			}
		}
	}

	function updateNodePosition(nodeId: string, position: { x: number; y: number }) {
		setNodes((nds) =>
			nds.map((node) =>
				node.id === nodeId
					? { ...node, position }
					: node
			)
		);
	}


	function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
		if (selectedNode) {
			updateNodePosition("1233", screenToFlowPosition({ x: e.clientX, y: e.clientY }));
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
		let nodes_map: Record<string, CustomNode> = {};
		const nodes = getNodes();
		const edges = getEdges();

		for (let node of nodes) {
			nodes_map[node.id] = node;
		}

		for (let edge of edges) {
			let source_node = nodes_map[edge.source];
			let target_node = nodes_map[edge.target];
			switch (source_node.kind) {
				case "trigger":
					console.log(source_node);
					console.log(target_node);
					console.log("=========");
					break;
				case "action":
					console.log(source_node);
					console.log(target_node);
					console.log("=========");
					break;
				default:
					break;
			}
		}
	}

	return (
		<div id="dev-tools">
			<button onClick={handleClick}>log DSL</button>
		</div>
	)
}
