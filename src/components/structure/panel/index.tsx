import { useCallback } from "react";

import { useState } from "react";
import { PanelProps } from "../../../types/components/Panel/PanelProps";
import useStyle from "../../../hooks/useStyle";
import useProps from "../../../hooks/useProps";
import ScrollArea from "./scroll_area";
import PanelHeader from "./header";

/**
 * Wraps the contents inside their own division, with the ability to add a title. In the latter case, a border is shown around the panel.
 */
export default function Panel (instanceProps: PanelProps)
{
	const props = useProps ("panel", instanceProps);
	const {
		id,
		className,
		style,
		title,
		collapsible = false,
		headerStyle,
		toggleCollapseButtonStyle,
		children,
		...rest
	} = props;
	
	const css = useStyle ("panel", props, style);
	const headerCss = useStyle ("panel", props, headerStyle, "headerStyle");
	const toggleCollapseButtonCss = useStyle ("panel", props, toggleCollapseButtonStyle, "toggleCollapseButtonStyle");
	
	const [isCollapsed, setIsCollapsed] = useState (true);

	const handleCollapseToggle = useCallback (
		() =>
		{
			setIsCollapsed (old => !old);
		},
		[setIsCollapsed]
	);

	return (
		<div
			css = {css}
			className = {className}
			id = {id}
			{...rest}
		>
			<PanelHeader
				collapsed = {isCollapsed}
				collapsible = {collapsible}
				onCollapseToggle = {handleCollapseToggle}
				style = {headerCss}
				toggleCollapseButtonStyle = {toggleCollapseButtonCss}
				title = {title}
			/>
			{
				(!collapsible || !isCollapsed) &&
				<ScrollArea>{children}</ScrollArea>
			}
		</div>
	);
}