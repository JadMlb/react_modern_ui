import React, { createContext, useContext, useReducer } from "react";
import { ThemeType } from "../types/theme";
import { COLOURS_ALT_NAMES, Colour } from "../types";

const DEFAULT_THEME: ThemeType = {
	mode: "auto",
	primary: {
		dark: "123D56",
		medium: "2274A5",
		light: "DDE8EF"
	},
	accent: {
		dark: "40260A",
		medium: "F2D0A9",
		light: "F9EDE0"
	},
	neutral: {
		dark: "131B23",
		medium: "7E7F81",
		light: "FEFEFF"
	},
	gray: {
		dark: "555555",
		medium: "AAAAAA",
		light: "EEEEEE"
	},
	affirmative: {
		dark: "014A22",
		medium: "018E42",
		light: "76D4A2"
	},
	error: {
		dark: "9A1E2F",
		medium: "D52941",
		light: "EDD0D4"
	},
	alert: {
		dark: "A16A09",
		medium: "FFBF00",
		light: "FFF3D0"
	}
};

type ThemeDispatchAction = {type: "set", values: Partial<ThemeType>} | {type: "reset"}

type ThemeContextType = {
	theme: ThemeType,
	dispatch: React.Dispatch<ThemeDispatchAction>
}

const ThemeContext = createContext<ThemeContextType> ({theme: DEFAULT_THEME, dispatch: ()=>{}});

function themeReducer (state: ThemeType, action: ThemeDispatchAction)
{
	switch (action.type)
	{
		case "set": return {...state, ...action.values};
		case "reset": return DEFAULT_THEME;
	}
}

/**
 * Theme provider to wrap the app components so they can use a theme and be displayed
 */
export function ThemeProvider ({children}: {children: React.ReactNode})
{
	const [theme, dispatch] = useReducer (themeReducer, DEFAULT_THEME);

	return (
		<ThemeContext.Provider value = {{theme, dispatch}}>
			{children}
		</ThemeContext.Provider>
	);
}

/**
 * Gets the current theme and the dispatch function used to change it.
 * The dispatch function takes in:
 * - an object containing the key "type" set to "set" with an object representing a part of the theme or its entirity, or
 * - an object containing the key "type" set to "reset" and nothing else, used to reset the theme to the default one.
 * 
 * @returns An object made of "theme" containing the value of the active theme, as well as a "dispatch" to set the theme
 */
export function useTheme ()
{
	return useContext(ThemeContext);
}

function doesPreferDarkMode ()
{
	if (window.matchMedia("(prefers-color-scheme: dark)").matches)
		return true;
	return false;
}

/**
 * Gets which mode is being used, either dark mode, light mode or set to auto. The former 2 are meant to be fixed, while "auto" is meant to represent a mode that changes with the system, and thus is affected by it.
 * 
 * @returns true if theme.mode is "dark", or "auto" and the system prefers dark mode, false otherwise
 */
export function useDarkMode ()
{
	const context = useContext (ThemeContext);
	
	if (context.theme.mode === "auto")
		return doesPreferDarkMode();
	return context.theme.mode === "dark";
}

/**
 * Gets the colour based on its simplified name
 * @param role The simplified colour name to get
 * @returns The hex value of the colour
 */
export function useColour (role: Colour)
{
	const {theme} = useContext (ThemeContext);
	let roleTree = COLOURS_ALT_NAMES[role].split (".");
	const COLOUR_TYPE = roleTree[0] as keyof Omit<ThemeType, "mode">;
	return "#" + theme[COLOUR_TYPE][roleTree[1] as "dark" | "medium" | "light"];
}