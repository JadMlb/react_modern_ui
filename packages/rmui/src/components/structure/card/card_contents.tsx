const CONTENTS_STYLE = {
	gridArea: "contents"
} as const;

interface CardContentsProps
{
	children?: React.ReactNode;
}

export default function CardContents ({children}: CardContentsProps)
{
	if (!children)
		return null;

	return (
		<span css = {CONTENTS_STYLE}>
			{children}
		</span>
	);
}