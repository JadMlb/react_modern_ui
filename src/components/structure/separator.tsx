/** @jsxImportSource @emotion/react */
import useProps from "../../hooks/useProps";
import useStyle from "../../hooks/useStyle";
import SeparatorProps from "../../types/components/Separator/SeparatorProps";

/**
 * Draws a horizontal separator with or without a title to distinguish parts
 */
export default function Separator (props: SeparatorProps)
{
	const {id, className, style, parentStyle, title} = useProps ("separator", props);
	
	const css = useStyle ("separator", style);
	const parentCss = useStyle ("separator", parentStyle, undefined, "parentStyle");

	return (
		<div id = {id} className = {className} css = {parentCss}>
			{title && <span>{title}</span>}
			<hr css = {css}/>
		</div>
	);
}