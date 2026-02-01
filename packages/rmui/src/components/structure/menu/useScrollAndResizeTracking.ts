import { useEffect } from "react";

export default function useScrollAndResizeTracking (open: boolean, onUpdate: () => void)
{
	useEffect (
		() =>
		{
			if (!open)
				return;

			function handleScroll ()
			{
				onUpdate();
			}

			function handleResize ()
			{
				onUpdate();
			}

			window.addEventListener ("scroll", handleScroll, true);
			window.addEventListener ("resize", handleResize);
			
			return () =>
			{
				window.removeEventListener ("scroll", handleScroll, true);
				window.removeEventListener ("resize", handleResize);
			};	
		},
		[open, onUpdate]
	);
}