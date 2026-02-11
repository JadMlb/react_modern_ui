import { Tag, type TagProps } from "@jad-mlb/react-modern-ui";

export default function DefaultRawCodeRenderer (props: TagProps)
{
	return (
		<Tag
			{...props}
			as = "code"
		/>
	);
}