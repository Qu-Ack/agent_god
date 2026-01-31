import './App.css'
import { useCallback } from 'react';
import { ReactFlow, ReactFlowProvider, type Node, type Edge, type NodeChange, type EdgeChange, type Connection } from '@xyflow/react';
import { useNodesState, useEdgesState, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { useReactFlow } from "@xyflow/react"
import '@xyflow/react/dist/style.css';

interface Trigger extends Node {
	kind: string;
	text: string;
}

interface Action extends Node {
	text: string;
	kind: string;
	shape: string;
}

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
	}
];

const initialEdges: Edge[] = [
]

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
	const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const handleNodesChange = useCallback((changes: NodeChange<CustomNode>[]) => {
		setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot))
	}, [])

	const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
		setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot))
	}, [])

	const handleConnection = useCallback((params: Connection) => {
		setEdges((edgesSnapshot) => addEdge({ ...params, type: "step" }, edgesSnapshot))
	}, [])

	return (
		<ReactFlowProvider>
			<div style={{ width: '100vw', height: '100vh' }}>
				<DeveloperTools />
				<ReactFlow
					nodeTypes={nodeTypes}
					onNodesChange={handleNodesChange}
					onEdgesChange={handleEdgesChange}
					onConnect={handleConnection}
					edges={edges}
					nodes={nodes}
					fitView
				/>
			</div>
		</ReactFlowProvider>
	);
}

function DeveloperTools() {
	const { getNodes, getEdges } = useReactFlow();

	function handleClick() {
		let dsl = {};
		let nodes_map: Record<string, Node> = {};
		const nodes = getNodes();
		const edges = getEdges();

		for (let node of nodes) {
			nodes_map[node.id] = node;
		}

		for (let edge of edges) {
			console.log(edge);
		}
	}

	return (
		<div id="dev-tools">
			<button onClick={handleClick}>log DSL</button>
		</div>
	)

}
