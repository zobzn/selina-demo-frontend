import styles from './flex.module.scss';
import React from 'react';
import classNames from 'classnames';

interface Props {
  grow?: boolean;
  equal?: boolean;
}

export const FlexCell: React.FC<Props> = ({
  children,
  grow = false,
  equal = false,
}) => {
  return (
    <div
      className={classNames({
        [styles.FlexCell]: true,
        [styles.FlexCellGrow]: grow,
        [styles.FlexCellEqual]: equal,
      })}
    >
      {children}
    </div>
  );
};
