import React from 'react';
import classnames from 'classnames';

import styles from './flex.module.scss';

export enum FlexAlignVertical {
  BASELINE = 'baseline',
  MIDDLE = 'middle',
}

interface Props {
  alignVertical?: FlexAlignVertical;
}

export const FlexRow: React.FC<Props> = ({
  alignVertical = FlexAlignVertical.BASELINE,
  children,
}) => {
  return (
    <div
      className={classnames({
        [styles.FlexRow]: true,
        [styles.FlexRowMiddle]: alignVertical === FlexAlignVertical.MIDDLE,
      })}
    >
      {children}
    </div>
  );
};
