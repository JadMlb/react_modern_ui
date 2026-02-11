import { Link, type Style } from "@jad-mlb/react-modern-ui";
import { FaGithub } from "react-icons/fa6";

const LINK_STYLE: Style = (isDark) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "radius.medium",
	padding: "spacing.small",
	backgroundColor: `gray${isDark ? "" : "Light"}`,
	color: isDark ? "white" : "black",
	":hover": {
		backgroundColor: "primaryElevated",
		color: "black"
	},
	":after": {
		all: "unset"
	}
});

export default function GithubLink ()
{
	return (
		<Link
			style = {LINK_STYLE}
			to = "https://github.com/JadMlb/react_modern_ui"
		>
			<FaGithub/>
		</Link>
	);
}