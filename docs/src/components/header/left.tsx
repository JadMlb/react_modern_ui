import { Panel } from "@jad-mlb/react-modern-ui";
import * as STYLE from "./style";

export default function LeftHeader ()
{
	return (
		<Panel id = "left" style = {STYLE}>
			<h1>React Modern UI</h1>
			<span>v2.0.0</span>
		</Panel>
	);
}