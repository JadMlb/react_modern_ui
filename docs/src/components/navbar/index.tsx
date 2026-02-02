import { Panel } from "@jad-mlb/react-modern-ui";
import { useCallback, useEffect, useState } from "react";
import type { Sections } from "./Sections";
import "./navbar.css";
import TreeRenderer from "./tree_renderer";

export default function Navbar ()
{
	const [data, setData] = useState<Sections> ({});

	const getData = useCallback (
		async () =>
		{
			await fetch ("/sections.json")
					.then (r => r.json())
					.then (r => r as Sections)
					.then (r => setData (r));
		},
		[setData]
	);

	useEffect (
		() => {getData();},
		[]
	);
	
	return (
		<Panel as = "aside">
			<TreeRenderer nodes = {data}/>
		</Panel>
	);
}