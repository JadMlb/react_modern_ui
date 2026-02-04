import { useMemo } from "react";
import { useLocation } from "react-router";
import getLanguagePath from "../utils/getLanguagePath";

export default function useLanguagePath ()
{
	const {pathname} = useLocation();
	return useMemo (
		() => getLanguagePath (pathname),
		[pathname]
	);
}