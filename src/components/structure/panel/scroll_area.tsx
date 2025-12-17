/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useTheme } from "../../../styles";

const ScrollAreaElement = styled.div<{$spacingSmall: string}>
`
	min-height: 15px;
	overflow: auto;
	display: flex;
	flex-direction: column;
	gap: ${({$spacingSmall}) => $spacingSmall};
`;

interface ScrollAreaProps
{
	children?: React.ReactNode;
}

export default function ScrollArea ({children}: ScrollAreaProps)
{
	const {theme: {measurements: {spacing}}} = useTheme();

	return (
		<ScrollAreaElement $spacingSmall = {spacing.small} className = "rmui-panel-scroll-area">
			{children}
		</ScrollAreaElement>
	);
}