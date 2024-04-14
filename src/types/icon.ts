import React from 'react';

export interface SvgIconProps {
  size?: number;
  className?: string;
}

export type SvgIcon = React.FC<SvgIconProps>;
