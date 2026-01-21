import { Keyframes } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import GenericAnimationProps from "../../types/components/Animation/AnimationProps";
import { useStaticStyleWrapper } from "../../hooks/useStyle";
import { useDarkMode } from "../../styles";

interface AnimatedProps extends GenericAnimationProps
{
	animation: Keyframes;
	exitAnimation?: Keyframes;
	infinite?: boolean;
}

export default function Animated ({as = "div", visible, style, children, animation, exitAnimation, duration = "1s", infinite}: AnimatedProps)
{
	const [shouldRender, setShouldRender] = useState (visible);
	const Component = as;

	const isDark = useDarkMode();
	const getStyle = useStaticStyleWrapper (style);

	const staticStyle = useMemo (
		() => getStyle (isDark, {}),
		[isDark, getStyle]
	);

	const css = useMemo (
		() => ({
			...staticStyle,
			animation: `${visible ? animation : exitAnimation} ${duration} ease-in-out ${infinite ? "infinite" : ""}`,
			animationFillMode: "forwards"
		}),
		[staticStyle, duration, visible, infinite]
	);

	useEffect (
		() =>
		{
			if (visible)
				setShouldRender (true);
		},
		[visible]
	);

	function onAnimationEnd ()
	{
		if (!visible)
			setShouldRender (false);
	}

	if (!shouldRender && !visible)
		return null;

	return (
		<Component
			onAnimationEnd = {onAnimationEnd}
			css = {css}
		>
			{children}
		</Component>
	);
}