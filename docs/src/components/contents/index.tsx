import { Panel } from "@jad-mlb/react-modern-ui";
import { Outlet } from "react-router";
import "./contents.css";

export default function Contents ()
{
	return (
		<Panel as = "main">
			<Outlet/>
		</Panel>
	);
}