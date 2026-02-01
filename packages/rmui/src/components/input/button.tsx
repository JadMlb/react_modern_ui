/** @jsxImportSource @emotion/react */
import { ButtonProps } from "../../types/components/Button/ButtonProps";
import useProps from "../../hooks/useProps";
import useStyle from "../../hooks/useStyle";

/**
 * Button component
 */
export default function Button (instanceProps: ButtonProps)
{
	const props = useProps (`button.${instanceProps.type ?? "filled"}`, instanceProps);
	
	const {
		role = "normal",
		type = "filled",
		htmlType,
		style,
		forceMode: _,
		...rest
	} = props;
	
	const css = useStyle (`button.${type}`, props, style);

	return (
		<button
			type = {htmlType}
			css = {css}
			{...rest}
		/>
	);
}