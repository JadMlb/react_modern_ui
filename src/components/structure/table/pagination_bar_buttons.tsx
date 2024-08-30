import React from "react";
import { Button } from "../../input";
import { PaginationButton } from "./pagination_button";

type PaginationBarButtonsProps = {
	nbPages: number,
	currentPageIndex: number,
	onPageRequest: (pageIndex: number) => void,
};

export function PaginationBarButtons ({nbPages, currentPageIndex, onPageRequest}: PaginationBarButtonsProps)
{	
	function navPageForward ()
	{
		onPageRequest (currentPageIndex + 1);
	}
	
	function navPageBackward ()
	{
		onPageRequest (currentPageIndex - 1);
	}
	
	return (
		<>
			<Button
				onClick = {navPageBackward}
				disabled = {currentPageIndex === 0}
				rounded
			>
				&lt;
			</Button>
			
			<PaginationButton
				key = {`nav-to-page-1`}
				index = {0}
				selected = {currentPageIndex == 0}
				onPageRequest = {onPageRequest}
			/>
			
			{
				nbPages <= 4 ?
					Array.from (
						{length: nbPages - 2},
						(_, i) => <PaginationButton
										key = {`nav-to-page-${i + 1}`}
										index = {i + 1}
										selected = {currentPageIndex === i + 1}
										onPageRequest = {onPageRequest}
									/>
					)
					:
					[0, 1, nbPages - 2, nbPages - 1].includes (currentPageIndex) ?
						<>
							{
								Array.from (
									{length: 2},
									(_, i) => <PaginationButton
													key = {`nav-to-page-${i + 1}`}
													index = {i + 1}
													selected = {currentPageIndex === i + 1}
													onPageRequest = {onPageRequest}
												/>
								)
							}
							...
							{
								Array.from (
									{length: 2},
									(_, i) => <PaginationButton
													key = {`nav-to-page-${nbPages + i - 1}`}
													index = {nbPages + i - 1}
													selected = {currentPageIndex === nbPages + i - 3}
													onPageRequest = {onPageRequest}
												/>
								)
							}
						</>
						:
						<>
							...
							{
								[-1, 0, 1].map (
									i => <PaginationButton
												key = {`nav-to-page-${currentPageIndex + i}`}
												index = {currentPageIndex + i}
												selected = {i == 0}
												onPageRequest = {onPageRequest}
											/>
								)
							}
							...
						</>
			}

			<PaginationButton
				key = {`nav-to-page-${nbPages}`}
				index = {nbPages - 1}
				selected = {currentPageIndex == nbPages - 1}
				onPageRequest = {onPageRequest}
			/>

			<Button
				onClick = {navPageForward}
				disabled = {currentPageIndex === nbPages - 1}
				rounded
			>
				&gt;
			</Button>
		</>
	);
}