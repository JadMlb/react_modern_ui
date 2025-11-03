import { createContext, useContext, useEffect, useState } from "react";
import { ThemeType } from "../types";

const ThemeModeContext = createContext<boolean> (false);

interface ThemeModeProviderProps
{
	mode: ThemeType["mode"];
	children: React.ReactNode;
}

function getMediaQuery ()
{
	if (typeof window === "undefined" || typeof window.matchMedia === "undefined")
		return null;

	return window.matchMedia ("(prefers-color-scheme: dark)");
}

export function ThemeModeProvider ({mode, children}: ThemeModeProviderProps)
{
	const [isDark, setIsDark] = useState (
		() =>
		{
			if (mode === "auto")
				return getMediaQuery()?.matches ?? false;
			return mode === "dark";
		}
	);

	useEffect (
		() =>
			{
			if (mode !== "auto")
			{
				setIsDark (mode === "dark");
				return;
			}

			const media = getMediaQuery();
			if (!media)
				return;

			function listener (e: MediaQueryListEvent)
			{
				setIsDark(e.matches);
			}

			media.addEventListener ("change", listener);

			return () => {media.removeEventListener ("change", listener);};
		},
		[mode]
	);
	
	return (
		<ThemeModeContext.Provider value = {isDark}>
			{children}
		</ThemeModeContext.Provider>
	);
}

/**
 * Gets which mode is being used, either dark mode, light mode or set to auto. The former 2 are meant to be fixed, while "auto" is meant to represent a mode that changes with the system, and thus is affected by it.
 * 
 * @returns true if theme.mode is "dark", or "auto" and the system prefers dark mode, false otherwise
 */
export function useDarkMode ()
{
	return useContext (ThemeModeContext);
}