import { Style } from "../../../styles";

interface TableContainerProps
{
	children?: React.ReactNode;
}

const STYLE = {
	display: "flex",
	flexDirection: "column"
} satisfies Style;

export default function TableContainer ({children}: TableContainerProps)
{
	return (
		<div css = {STYLE}>
			{children}
		</div>
	);
}