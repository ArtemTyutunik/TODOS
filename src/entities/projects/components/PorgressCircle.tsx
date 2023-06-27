import React, {memo} from 'react';

const ProgressCircle = memo(({all, completed}: {all: number, completed: number}) => {
  const radius = 9;
  const circumference = radius * Math.PI * 2
  const offset = all > 0 ? circumference - (completed/all * circumference) : circumference
  return (
    <svg width={'25px'} height={'25px'} className={'progressCircleSvg'}>
      <circle cx={12}
        cy={12}
        r={radius}
        stroke={'#1976d2'}
        strokeWidth={2}
        fill={'transparent'}
        strokeDashoffset={offset}
        strokeDasharray={`${circumference} ${circumference}`}/>
    </svg>
  );
});

export default ProgressCircle;
