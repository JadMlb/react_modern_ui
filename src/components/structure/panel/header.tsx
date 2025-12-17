import useStyle from "../../../hooks/useStyle";
import { PanelProps } from "../../../types";
import Chevron from "../../chevron";
import { Button } from "../../input";

interface PanelHeaderProps
{
	title?: PanelProps["title"];
	style?: PanelProps["headerStyle"];
	toggleCollapseButtonStyle?: PanelProps["toggleCollapseButtonStyle"];
	collapsible?: PanelProps["collapsible"];
	collapsed?: boolean;
	onCollapseToggle?: () => void;
}

export default function PanelHeader ({title, style, collapsible, collapsed, onCollapseToggle, toggleCollapseButtonStyle}: PanelHeaderProps)
{
	const css = useStyle ("panel", style, undefined, "headerStyle");
	const buttonCss = useStyle ("panel", toggleCollapseButtonStyle, undefined, "toggleCollapseButtonStyle");

	if (!title)
		return null;

	return (
		<div css = {css}>
			<span>{title}</span>
			{
				collapsible &&
				<Button
					onClick = {onCollapseToggle}
					style = {buttonCss}
				>
					<Chevron orientation = {collapsed ? "down" : "up"}/>
				</Button>
			}
		</div>
	);
}