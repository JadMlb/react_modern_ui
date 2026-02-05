import React from "react";
import demos, { type AvailableDemos } from "../../../components/demos";
import { Panel, type Style } from "@jad-mlb/react-modern-ui";

const STYLE: Style = isDark => ({
	borderBottom: `1px solid gray${isDark ? "Dark" : ""}`,
	padding: "spacing.medium",
	flexDirection: "row",
	justifyContent: "center",
	borderTopLeftRadius: "radius.small",
	borderTopRightRadius: "radius.small"
});

interface DemoProps
{
	demoKey: string | null;
}

export default function Demo ({demoKey}: DemoProps)
{
	if (!demoKey)
		return null;
	
	const DemoComponent = demoKey ? demos[demoKey as AvailableDemos] : React.Fragment;
	
	return (
		<Panel style = {STYLE}>
			<DemoComponent/>
		</Panel>
	);
}