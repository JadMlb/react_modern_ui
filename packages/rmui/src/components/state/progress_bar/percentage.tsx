interface ProgressBarPercentageProps
{
	value: number;
	thin?: boolean;
	show?: boolean;
}

export default function ProgressBarPercentage ({value, thin, show}: ProgressBarPercentageProps)
{
	if (!show || thin)
		return null;

	return (
		<span>{value}%</span>
	);
}