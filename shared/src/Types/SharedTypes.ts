import { ScreenIdentifierEnum } from './EnumTypes';

export type NullableString = string | null;
export type NullableNumber = number | null;

export interface INoOperationFunction {
  (): void;
}

export type EulerDimensions = {
  width: number;
  height: number;
};

export type EulerPosition = {
  x: number;
  y: number;
};

export type DatabaseInsertResult = {
  id: string | number;
};

export type ReactSelectOptionType = {
  label: string;
  value: string;
};

export const staticRoutes: {
  [key in keyof typeof ScreenIdentifierEnum]: string;
} = {
  HOME: '/',
  ABOUT: '/screens/about',
};
