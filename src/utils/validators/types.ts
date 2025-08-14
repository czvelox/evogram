import { ICommandArgumentValidtatorParams } from '../..';

export interface ValidatorOptions {
	[x: string]: any;
}

export type ValidatorFunction = (context: ICommandArgumentValidtatorParams) => Promise<any>;

export type ValidatorCreator = (options?: ValidatorOptions) => ValidatorFunction;
