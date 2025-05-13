import { useCallback, useEffect, useState } from "react";

interface UseMenuPositionProps
{
	menuElement: HTMLElement | null;
	anchorElement: HTMLElement | null;
	positionOverride?: "top" | "bottom";
	margin?: number;
}

export default function useMenuPosition ({menuElement, anchorElement, positionOverride, margin = 10}: UseMenuPositionProps)
{
	const [isFromTop, setIsFromTop] = useState (false);

	const checkPosition = useCallback (
		() =>
		{
			if (positionOverride)
			{
				setIsFromTop (positionOverride === "top");
				return;
			}

			if (!menuElement || !anchorElement) return;

			const menuRect = menuElement.getBoundingClientRect();
			const anchorRect = anchorElement.getBoundingClientRect();

			const availableSpaceBelow = window.innerHeight - anchorRect.bottom;
			const requiredSpace = menuRect.height + margin;

			if (availableSpaceBelow < requiredSpace)
				setIsFromTop (true);
			else
				setIsFromTop (false);
		},
		[positionOverride, menuElement, anchorElement, margin]
	);

	useEffect (
		() =>
		{
			checkPosition();

			window.addEventListener ("resize", checkPosition);
			return () => {window.removeEventListener ("resize", checkPosition);};
		},
		[checkPosition]
	);

	return isFromTop;
}