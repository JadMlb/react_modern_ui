import { Button, useTheme } from "@jad-mlb/react-modern-ui";
import "./button-role-type.css";
import { useMemo } from "react";

export default function ButtonRoleTypeDemo ()
{
	const {theme: {measurements: {spacing}}} = useTheme();

	const gap = useMemo (
		() => ({gap: spacing.medium}),
		[spacing.medium]
	);

	return (
		<div className = "grid" style = {gap}>
			<div className = "right"><strong>Role/Type</strong></div>
			<code className = "centered">filled</code>
			<code className = "centered">outlined</code>
			<code className = "centered">link</code>
			<code className = "right">normal</code>
			<Button type = "filled">This is a filled normal button</Button>
			<Button type = "outlined">This is an outlined normal button</Button>
			<Button type = "link">This is a link normal button</Button>
			<code className = "right">primary</code>
			<Button type = "filled" role = "primary">This is a filled primary button</Button>
			<Button type = "outlined" role = "primary">This is an outlined primary button</Button>
			<Button type = "link" role = "primary">This is a link primary button</Button>
			<code className = "right">alert</code>
			<Button type = "filled" role = "alert">This is a filled alert button</Button>
			<Button type = "outlined" role = "alert">This is an outlined alert button</Button>
			<Button type = "link" role = "alert">This is a link alert button</Button>
			<code className = "right">warn</code>
			<Button type = "filled" role = "warn">This is a filled warn button</Button>
			<Button type = "outlined" role = "warn">This is an outlined warn button</Button>
			<Button type = "link" role = "warn">This is a link warn button</Button>
		</div>
	);
}