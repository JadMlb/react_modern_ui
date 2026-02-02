export default function camelCaseToDashed (camelCaseString: string)
{
	return camelCaseString.replaceAll (/[A-Z]/g, match => `-${match.toLowerCase()}`)
							.slice (1);
}