import { Button } from "@jad-mlb/react-modern-ui";

export default function ButtonDisabledDemo ()
{
	return (
		<>
			<Button onClick = {() => alert ("I'm available")}>Click me</Button>
			<Button disabled>I am disabled</Button>
		</>
	);
}