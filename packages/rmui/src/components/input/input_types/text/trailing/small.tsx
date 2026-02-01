import { useMemo } from "react";
import { useThemeColours } from "../../../../../styles";

interface SmallProps
{
	children?: React.ReactNode;
}

export default function Small ({children}: SmallProps)
{
	const getColour = useThemeColours();
	const gray = useMemo (
		() => getColour ("gray"),
		[getColour]
	);
	const style = useMemo (
		() => ({
			color: gray
		}),
		[gray]
	);

	return (
		<small style = {style}>
			{children}
		</small>
	);
}