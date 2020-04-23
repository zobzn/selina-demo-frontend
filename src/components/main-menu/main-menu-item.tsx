import React from 'react';

interface Props {
  text: string;
}

export const MainMenuItem: React.FC<Props> = ({ text }: Props) => {
  return <li>{text}</li>;
};
