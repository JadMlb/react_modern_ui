import { Panel, SkeletonLoader } from "@jad-mlb/react-modern-ui";

export default function Loader ()
{
	return (
		<Panel id = "loader">
			<SkeletonLoader
				lines = {10}
			/>
		</Panel>
	);
}