import StylingProps from "../../../types/styles/StylingProps";
import { StaticStyle } from "../../../types";

interface TextLineLoaderProps extends StylingProps
{
	style?: StaticStyle;
}

export default function TextLineLoader ({id, className, style}: TextLineLoaderProps)
{
	return (
		<div css = {style} className = {className} id = {id}/>
	);
}