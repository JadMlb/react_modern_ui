import { Input } from "@jad-mlb/react-modern-ui";
import { useCallback, useState } from "react";

export default function InputHintErrorDemo ()
{
	const [email, setEmail] = useState ("");
	const [isError, setIsError] = useState (false);

	const handleChange = useCallback (
		(_: React.ChangeEvent | null, value: string) =>
		{
			setEmail (value);
			setIsError (!!value && !/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test (value))
		},
		[setIsError, setEmail]
	);

	return (
		<Input
			label = "Enter your email and try to enter any value to see what happens"
			placeholder = "Enter your value here"
			type = "email"
			value = {email}
			onChange = {handleChange}
			hint = "johnny.appleseed@email.com"
			textOnError = "This email is invalid"
			isError = {isError}
		/>
	);
}