import { Panel } from "@jad-mlb/react-modern-ui";
import LeftHeader from "./left";
import RightHeader from "./right";
import "./header.css";

export default function Header ()
{
	return (
		<Panel as = "header">
			<LeftHeader/>
			<RightHeader/>
		</Panel>
	);
}