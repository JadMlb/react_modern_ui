import { Tag } from "@jad-mlb/react-modern-ui";
import Tooltip from "../../../components/tooltip";

export default function ChildrenOptionalTooltip ()
{
	return (
		<Tooltip
			as = "code"
			colour = "warning"
			popupContents = {
				<>
					This component accepts children (which are optional).
					Those children can be anything React can render (i.e. <Tag as = "code">React.ReactNode</Tag>).
				</>
			}
		>
			Accepts children
		</Tooltip>
	);
}