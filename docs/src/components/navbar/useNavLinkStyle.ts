import { useThemeParser } from "@jad-mlb/react-modern-ui";
import { useCallback } from "react";
import type { NavLinkRenderProps } from "react-router";

export default function useNavLinkStyle ()
{
	const parseCss = useThemeParser();

	return useCallback (
		({isActive, isPending}: NavLinkRenderProps) => parseCss ({
			textDecoration: "unset",
			color: isActive ? "primary" : "gray",
			backgroundColor: isActive ? "color(from primaryElevated srgb r g b / 0.7)" : isPending ? "color(from gray srgb r g b / 0.7)" : "transparent",
			transition: "background 100ms ease-in-out",
			borderRadius: "calc(radius.small / 2)"
		}),
		[parseCss]
	);
}