import { useMemo } from "react";
import { useLocation } from "react-router";

export default function useLanguagePath ()
{
	const {pathname} = useLocation();
	return useMemo (
		() =>
		{
			const cleanPath = pathname.slice (1);
			const slashIndex = cleanPath.indexOf ("/");
			if (slashIndex === -1)
				return [cleanPath, ""];
			return [cleanPath.slice (0, slashIndex), cleanPath.slice (slashIndex + 1)];
		},
		[pathname]
	);
}