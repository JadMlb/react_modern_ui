import { Button, Link, Panel } from "@jad-mlb/react-modern-ui";
import * as STYLE from "./style";
import { FaGear, FaGithub } from "react-icons/fa6";

export default function RightHeader ()
{
	return (
		<Panel id = "right" style = {STYLE}>
			<Button><FaGear/></Button>
			<Link to = "https://github.com/JadMlb/react_modern_ui">
				<FaGithub/>
			</Link>
		</Panel>
	);
}