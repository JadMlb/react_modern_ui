import { createBrowserRouter } from "react-router";
import Root from "../pages/root";
import Lazy from "../components/lazy";
import createSectionRoutes from "./createSectionRoutes";

const routes = createBrowserRouter ([
	{
		path: "/:lang",
		element: <Lazy><Root/></Lazy>,
		children: [
			createSectionRoutes ("getting-started", ["overview", "installation", "usage"]),
			createSectionRoutes ("inputs", ["Button", "Checkbox", "Combobox", "Input", "RadioButtonsGroup", "Slider", "Switch"]),
			createSectionRoutes ("feedback", ["Badge", "Dialog", "Drawer", "Menu", "ProgressBar", "SkeletonLoader", "Toaster"]),
			createSectionRoutes ("structure", ["Animation", "Card", "List", "Panel", "Separator", "Table", "Tag"]),
			createSectionRoutes ("utils", ["Theme"])
		]
	}
]);

export default routes;