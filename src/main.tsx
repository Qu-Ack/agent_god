import ReactDOM from "react-dom/client"
import './index.css'
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import App from "./App.tsx"
import Cred from "./Cred.tsx"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	}, {
		path: "/creds",
		element: <Cred />
	}
]);

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
	<RouterProvider router={router} />
);
