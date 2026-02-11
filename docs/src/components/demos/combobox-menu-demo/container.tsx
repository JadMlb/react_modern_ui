import { Panel, type Style } from "@jad-mlb/react-modern-ui";

interface ContainerProps
{
	children?: React.ReactNode;
}

const style = {
	".rmui-panel-scroll-area": {
		display: "grid",
		gridTemplateColumns: "repeat(4, 1fr)"
	}
} satisfies Style;

export default function Container ({children}: ContainerProps)
{
	return (
		<Panel style = {style}>
			{children}
		</Panel>
	);
}