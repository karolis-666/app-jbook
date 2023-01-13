import { FC, useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './Resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const WIDTH_RATIO = 0.75;

const Resizable: FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * WIDTH_RATIO);

  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    let timer: any;

    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);

        if (window.innerWidth * WIDTH_RATIO < width) {
          setWidth(window.innerWidth * WIDTH_RATIO);
        }
      }, 100);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  if (direction === 'horizontal') {
    resizableProps = {
      height: Infinity,
      width,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * WIDTH_RATIO, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      className: 'resize-horizontal',
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 30],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
