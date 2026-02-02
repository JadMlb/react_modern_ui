import { createBrowserRouter } from "react-router";
import Root from "../pages/root";
import Lazy from "../components/lazy";

const routes = createBrowserRouter ([
	{
		path: "/:lang",
		element: <Lazy><Root/></Lazy>,
		children: [
			
		]
	}
]);

export default routes;