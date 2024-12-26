export interface Shadow
{
	offset: {x: number, y: number};
	colour?: string;
	inset?: boolean;
	blur?: number;
	spread?: number;
}