/** @jsxImportSource @emotion/react */
import useProps from "../../hooks/useProps";
import useStyle from "../../hooks/useStyle";
import { SeparatorProps } from "../../types/components/Separator/SeparatorProps";

/**
 * Draws a horizontal separator with or without a title to distinguish parts
 */
export default function Separator (instanceProps: SeparatorProps)
{
	const props = useProps ("separator", instanceProps);
	const {id, className, style, parentStyle, title} = props;
	
	const css = useStyle ("separator", props, style);
	const parentCss = useStyle ("separator", props, parentStyle, "parentStyle");

	return (
		<div id = {id} className = {className} css = {parentCss}>
			{title && <span>{title}</span>}
			<hr css = {css}/>
		</div>
	);
}