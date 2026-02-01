import { useCallback } from "react";
import { useThemeColours } from "../../styles";
import { Colour, COLOURS_ALT_NAMES } from "../../types";

export default function useColour ()
{
	const getColour = useThemeColours();

	return useCallback (
		(colour: string) =>
		{
			if (colour in COLOURS_ALT_NAMES)
				return getColour (colour as Colour);
			return colour;
		},
		[getColour]
	);

}