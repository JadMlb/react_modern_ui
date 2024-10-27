/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Colour } from "../../../types";
import { spacing } from "../../../styles";

const ClearButton = styled.button<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	all: unset;
	margin-inline: ${spacing.small};

	&:hover
	{
		color: ${props => props.$colour ("error")};
	}

	align-self: start;
`;

export default ClearButton;