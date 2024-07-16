import React, { createContext, useContext, useReducer } from "react";
import ThemeType from "../types/theme";

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

/**
 * uses typecript mapped types to make all attributes optional
 */
type Optional<T> = {
	[P in keyof T]?: T[P]
};

type ThemeDispatchAction = {type: "set", values: Optional<ThemeType>} | {type: "reset"}

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
 * Gets the current theme
 * 
 * @returns The active theme used
 */
export function useTheme ()
{
	return useContext(ThemeContext).theme;
}

/**
 * Gets which mode is being used, either dark mode, light mode or set to auto. The former 2 are meant to be fixed, while "auto" is meant to represent a mode that changes with the system
 * 
 * @returns "dark", "light" or "auto"
 */
export function useBrightnessMode ()
{
	return useContext(ThemeContext).theme.mode;
}

/**
 * Gets the theme variable and the dispatch function used to set this theme.
 * The dispatch function takes in:
 * - an object containing the key "type" set to "set" with an object representing a part of the theme or its entirity, or
 * - an object containing the key "type" set to "reset" and nothing else, used to reset the theme to the default one.
 * 
 * @returns An object made of "theme" containing the value of the theme, as well as a "dispatch" to set the theme
 */
export function useThemeWithDispatch ()
{
	return useContext (ThemeContext);
}