import { Button, Panel } from "@jad-mlb/react-modern-ui";
import * as STYLE from "./style";
import { FaGear } from "react-icons/fa6";
import GithubLink from "./github";

export default function RightHeader ()
{
	return (
		<Panel id = "right" style = {STYLE}>
			<Button><FaGear/></Button>
			<GithubLink/>
		</Panel>
	);
}