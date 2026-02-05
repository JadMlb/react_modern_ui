import { useDarkMode, useThemeParser, type StaticStyle } from "@jad-mlb/react-modern-ui";
import { useEffect, useMemo, type HTMLAttributes } from "react";
import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js";

const PRE_STYLE: (isDark: boolean, withDemo?: boolean) => StaticStyle = (isDark, withDemo) => ({
	backgroundColor: isDark ? "grayDark" : "black",
	color: "white",
	borderRadius: "calc(radius.small - 1px)",
	borderTopLeftRadius: withDemo ? "0" : "calc(radius.small - 1px)",
	borderTopRightRadius: withDemo ? "0" : "calc(radius.small - 1px)"
});

const CODE_STYLE: (withDemo?: boolean) => StaticStyle = (withDemo) => ({
	borderRadius: "calc(radius.small - 1px)",
	borderTopLeftRadius: withDemo ? "0" : "calc(radius.small - 1px)",
	borderTopRightRadius: withDemo ? "0" : "calc(radius.small - 1px)"
});

interface CodeContentsProps extends HTMLAttributes<HTMLPreElement>
{
	children?: React.ReactNode;
	withDemo?: boolean;
}

export default function CodeContents ({children, withDemo, ...props}: CodeContentsProps)
{
	const parseCss = useThemeParser();
	const isDark = useDarkMode();

	const preStyle = useMemo (
		() => parseCss (PRE_STYLE (isDark, withDemo)),
		[parseCss, isDark]
	);
	
	const codeStyle = useMemo (
		() => parseCss (CODE_STYLE (withDemo)),
		[parseCss, withDemo]
	);

	useEffect (
		() =>
		{hljs.highlightAll();},
		[]
	);

	return (
		<pre {...props} style = {preStyle}>
			<code style = {codeStyle}>
				{children}
			</code>
		</pre>
	);
}