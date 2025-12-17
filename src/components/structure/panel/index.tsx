import { useCallback, useMemo } from "react";

import { useState } from "react";
import { PanelProps } from "../../../types/components/Panel/PanelProps";
import useStyle from "../../../hooks/useStyle";
import useProps from "../../../hooks/useProps";
import ScrollArea from "./scroll_area";
import PanelHeader from "./header";

/**
 * Wraps the contents inside their own division, with the ability to add a title. In the latter case, a border is shown around the panel.
 */
export default function Panel (props: PanelProps)
{
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
	} = useProps ("panel", props);
	
	const [isCollapsed, setIsCollapsed] = useState (true);

	const hasBorder = useMemo (
		() => title !== undefined && title !== null,
		[title]
	);
	const injectedStyles = useMemo (
		() => ({
			border: hasBorder ? "1px solid primary" : undefined,
		}),
		[hasBorder]
	);
	const css = useStyle ("panel", style, injectedStyles);

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
				style = {headerStyle}
				toggleCollapseButtonStyle = {toggleCollapseButtonStyle}
				title = {title}
			/>
			{
				(!collapsible || !isCollapsed) &&
				<ScrollArea>{children}</ScrollArea>
			}
		</div>
	);
}