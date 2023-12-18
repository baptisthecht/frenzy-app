import CategoryPage from "./Pages/CategoryPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PauseScreenPage from "./Pages/PauseScreenPage";
import { Provider } from "react-redux";
import { store } from "./redux";

function App() {
	const router = createBrowserRouter([
		{ path: "/cat/:id", element: <CategoryPage /> },
		{ path: "/", element: <PauseScreenPage /> },
	]);

	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
