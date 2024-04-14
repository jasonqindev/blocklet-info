import React from 'react';

export interface SvgIconProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  color?: string;
  size?: number;
  className?: string;
}

export type SvgIcon = React.FC<SvgIconProps>;
