import useLanguagePath from "./useLanguagePath";
import { useCallback } from "react";

export default function useAppNavigationPath ()
{
	const [usedLang] = useLanguagePath();

	return useCallback (
		(to: string) => `/${usedLang}/${to}`,
		[usedLang]
	);
}