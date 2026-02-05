import { useCallback, useMemo } from "react";

export default function useCleaner (value: string, keyPatternStart: string, keyPatternEnd?: string)
{
	const realKeyPatternEnd = useMemo (
		() => keyPatternEnd ?? keyPatternStart,
		[keyPatternEnd, keyPatternStart]
	);

	const keyPatternStartLength = useMemo (
		() => keyPatternStart.length,
		[keyPatternStart]
	);
	
	const keyPatternEndLength = useMemo (
		() => realKeyPatternEnd.length,
		[realKeyPatternEnd]
	);

	const match = useCallback (
		(firstLine: string) =>
			!firstLine.startsWith (keyPatternStart) || !firstLine.endsWith (realKeyPatternEnd),
		[keyPatternStart, realKeyPatternEnd]
	);

	const firstLine = useMemo (
		() => value.split("\n", 1)[0],
		[value]
	);
	
	const key = useMemo (
		() =>
		{
			if (match (firstLine))
				return null;
			return firstLine.slice (keyPatternStartLength, -keyPatternEndLength);
		},
		[firstLine, match]
	);

	const cleanValue = useMemo (
		() =>
		{
			if (match (firstLine))
				return value;
			return value.slice (value.indexOf ("\n") + 1);
		},
		[match, value, firstLine]
	);

	return {key, cleanValue};
}