import React, { createContext, useCallback, useContext, useReducer } from "react";
import { PartialThemeType, ThemeType } from "../types/styles/theme";
import { COLOURS_ALT_NAMES, Colour, Measurements } from "../types";
import { DEFAULT_RADIUS, DEFAULT_SPACING } from "./defaults/measurements";
import { ThemeModeProvider } from "./mode";
import { merge } from "lodash";
import { DEFAULT_THEME } from "./defaults/theme";
import { StaticStyle } from "../types";

type ThemeDispatchAction = {type: "set", values: PartialThemeType} | {type: "reset"}

type ThemeContextType = {
	theme: ThemeType,
	dispatch: React.Dispatch<ThemeDispatchAction>
}

const ThemeContext = createContext<ThemeContextType> ({theme: DEFAULT_THEME, dispatch: ()=>{}});

function mergeThemeValues (base: ThemeType, modifications: PartialThemeType) : ThemeType
{
	return {
		mode: modifications.mode ?? base.mode,
		measurements: {
			radius: {...base.measurements.radius, ...modifications.measurements?.radius},
			spacing: {...base.measurements.spacing, ...modifications.measurements?.spacing},
		},
		colours: {...base.colours, ...modifications.colours},
		defaults: merge (base.defaults, modifications.overrides)
	};
}

export function createTheme (theme: PartialThemeType) : ThemeType
{
	return mergeThemeValues (DEFAULT_THEME, theme);
}

function themeReducer (state: ThemeType, action: ThemeDispatchAction)
{
	switch (action.type)
	{
		case "set": return mergeThemeValues (state, action.values);
		case "reset": return DEFAULT_THEME;
	}
}

interface ThemeProviderProps
{
	theme?: ThemeType;
	children: React.ReactNode;
}

/**
 * Theme provider to wrap the app components so they can use a theme and be displayed
 * @param theme Sets the inital values of the theme
 */
export function ThemeProvider ({theme, children}: ThemeProviderProps)
{
	const [realTheme, dispatch] = useReducer (themeReducer, theme ?? DEFAULT_THEME);

	return (
		<ThemeContext.Provider value = {{theme: realTheme, dispatch}}>
			<ThemeModeProvider mode = {realTheme.mode}>
				{children}
			</ThemeModeProvider>
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
	return useContext (ThemeContext);
}

/**
 * Used to get the colour based on its simplified name
 * @returns A function that takes the role and returns its hex value
 */
export function useThemeColours (): ThemeColourFunction
{
	const {theme} = useContext (ThemeContext);
	const getColour = useCallback (
		(role: Colour) =>
		{
			let roleTree = COLOURS_ALT_NAMES[role].split (".");
			const COLOUR_TYPE = roleTree[0] as keyof ThemeType["colours"];
			return "#" + theme.colours[COLOUR_TYPE][roleTree[1] as "dark" | "medium" | "light"];
		},
		[theme]
	);

	return getColour;
}

export function useThemeParser ()
{
	const getColour = useThemeColours();
	const {theme} = useTheme();
	const {spacing, radius} = theme.measurements;

	const processValue = useCallback (
		function process (value: any): any
		{
			if (typeof value === "string")
			{
				let replaced = value;
				for (const colourCode in COLOURS_ALT_NAMES)
				{
					const pattern = new RegExp (`\\b${colourCode}\\b`, "g");
					replaced = replaced.replace (pattern, getColour (colourCode as keyof typeof COLOURS_ALT_NAMES));
				}

				for (let size of Object.keys (DEFAULT_SPACING))
				{
					const pattern = new RegExp (`\\bspacing\\.${size}\\b`, "g");
					replaced = replaced.replace (pattern, spacing[size as keyof Measurements["spacing"]]);
				}
				
				for (let size of Object.keys (DEFAULT_RADIUS))
				{
					const pattern = new RegExp (`\\bradius\\.${size}\\b`, "g");
					replaced = replaced.replace (pattern, radius[size as keyof Measurements["radius"]]);
				}

				return replaced;
			}
			else if (Array.isArray (value))
				return value.map (process)
			else
				return value;
		},
		[getColour]
	);

	const processStyles = useCallback (
		function process (styles: StaticStyle): StaticStyle
		{
			const res: StaticStyle = {};
			Object.entries (styles)
					.forEach (
						([k, v]) =>
						{
							if (typeof v === "object" && v !== null)
								res[k] = process (v);
							else
								res[k] = processValue (v);
						}
					);

			return res;
		},
		[processValue]
	);

	return processStyles;
}

export type ThemeColourFunction = (col: Colour) => string;