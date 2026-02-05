import { useMemo } from "react";

export default function useCodeParser (code: string)
{
	const firstLine = useMemo (
		() => code.split("\n", 1)[0],
		[code]
	);
	
	const demoKey = useMemo (
		() =>
		{
			if (!firstLine.startsWith ("///") || !firstLine.endsWith ("///"))
				return null;
			return firstLine.slice (3, -3);
		},
		[firstLine]
	);

	const cleanCode = useMemo (
		() =>
		{
			if (!firstLine.startsWith ("///") || !firstLine.endsWith ("///"))
				return code;
			return code.slice (code.indexOf ("\n") + 1);
		},
		[code, firstLine]
	);

	return {demoKey, cleanCode};
}