import { Menu, Tag, type Position, type TagProps } from "@jad-mlb/react-modern-ui";
import { useCallback, useRef, useState } from "react";

const DIV_STYLE = {width: "fit-content", height: "fit-content"};
const MENU_POSITION: Position = {vertical: "top", horizontal: "center"};
const MENU_STYLE = {padding: "spacing.xsmall", borderRadius: "radius.small", maxWidth: 300};

interface PopupProps extends TagProps
{
	popupContents: React.ReactNode;
}

export default function Tooltip ({popupContents, ...props}: PopupProps)
{
	const [open, setIsOpen] = useState (false);
	const ref = useRef<HTMLDivElement | null> (null);

	const handleMouseEnter = useCallback (
		() =>
		{
			setIsOpen (true);
		},
		[setIsOpen]
	);
	const handleMouseLeave = useCallback (
		() =>
		{
			setIsOpen (false);
		},
		[setIsOpen]
	);

	return (
		<>
			<div
				ref = {ref}
				style = {DIV_STYLE}
				onMouseEnter = {handleMouseEnter}
				onMouseLeave = {handleMouseLeave}
			>
				<Tag {...props}/>
			</div>
			<Menu
				open = {open}
				anchorElement = {ref.current}
				position = {MENU_POSITION}
				direction = {MENU_POSITION}
				style = {MENU_STYLE}
			>
				{popupContents}
			</Menu>
		</>
	);
}