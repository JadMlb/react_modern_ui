import { PanelProps, StaticStyle } from "../../../types";
import Chevron from "../../chevron";
import { Button } from "../../input";

interface PanelHeaderProps
{
	title?: PanelProps["title"];
	style?: StaticStyle;
	toggleCollapseButtonStyle?: StaticStyle;
	toggleCollapseButtonChevronColour?: string;
	toggleCollapseButtonChevronForceMode?: "light" | "dark";
	collapsible?: PanelProps["collapsible"];
	collapsed?: boolean;
	onCollapseToggle?: () => void;
}

export default function PanelHeader ({title, style, collapsible, collapsed, onCollapseToggle, toggleCollapseButtonStyle, toggleCollapseButtonChevronColour, toggleCollapseButtonChevronForceMode}: PanelHeaderProps)
{
	return (
		<div css = {style}>
			<span className = "rmui-panel-header-title">{title}</span>
			{
				collapsible &&
				<Button
					onClick = {onCollapseToggle}
					style = {toggleCollapseButtonStyle}
				>
					<Chevron
						orientation = {collapsed ? "down" : "up"}
						colour = {toggleCollapseButtonChevronColour}
						forceMode = {toggleCollapseButtonChevronForceMode}
					/>
				</Button>
			}
		</div>
	);
}