import cn from 'classnames';
import { Reorder, useDragControls } from 'framer-motion';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import stylesExample from 'styles/example.module.scss';

import styles from './Example.module.scss';

const Example: React.FC = () => {
  const [items, setItems] = useState([
    {
      id: '1001',
      emoji: '🇰🇿',
      back: 'fr',
    },
    {
      id: '1002',
      emoji: '🇺🇦',
      back: 'ua',
    },
    {
      id: '1003',
      emoji: '🇺🇸',
      back: 'usa',
    },
    {
      id: '1004',
      emoji: '🇬🇧',
      back: 'gbr',
    },
  ]);

  const [dragByText, setDragByText] = useState(false);
  const [axis, setAxis] = useState('y');

  const code = `
<Reorder.Group
  as="div"
  values={items} ${axis !== 'drag' ? `\n  axis="${axis}"` : ''} 
  onReorder={setItems}
>
  {items.map((item) => (
    <Reorder.Item
      as="div"
      value={value}
      layout="position"
      dragListener={!dragByText} // toggle
      dragControls={controls} ${axis === 'drag' ? '\n      drag' : ''} 
    >
      ...
      <p onPointerDown={(e) => {
          if (dragByText) controls.start(e);
        }}
      />
    </Reorder.Item>
  ))}
</Reorder.Group>`.substr(1);

  return (
    <div className={stylesExample.example}>
      <div className={cn(styles.interactive, stylesExample.example__interactive)}>
        <Reorder.Group
          as="div"
          className={cn(styles.motions, { [styles.grab]: !dragByText })}
          values={items}
          axis={axis !== 'drag' ? 'y' : undefined}
          onReorder={setItems}
        >
          {items.map((item) => (
            <ReorderItem
              key={item.id}
              value={item}
              dragByText={dragByText}
              axis={axis}
            />
          ))}
        </Reorder.Group>
      </div>
      <div className={cn(styles.code, stylesExample.example__code)}>
        <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
          {code}
        </SyntaxHighlighter>
        <div className={stylesExample.example__divider} />
        <div className={styles.control}>
          <div className={stylesExample.inputs}>
            <div className={stylesExample.input}>
              <p className={stylesExample.input__p}>Click to change dragListener</p>
              <button onClick={() => setDragByText((prev) => !prev)} type="button">
                {dragByText ? 'Drag by <div>' : 'Drag by <p>'}
              </button>
            </div>
            <div className={stylesExample.input}>
              <p className={stylesExample.input__p}>Change axis</p>
              <select value={axis} onChange={(e) => setAxis(e.target.value)}>
                <option value="y">y</option>
                <option value="drag">drag</option>
              </select>
            </div>
          </div>
          <h6>Can be vertical / horizontal & scrollable</h6>
        </div>
      </div>
    </div>
  );
};

interface IReorderItem {
  value: { id: string; emoji: string; back: string };
  dragByText: boolean;
  axis: string;
}

const ReorderItem: React.FC<IReorderItem> = ({ value, dragByText, axis }) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      as="div"
      className={cn(styles.motion, styles[`motion--${value.back}`])}
      value={value}
      layout="position"
      dragListener={!dragByText}
      dragControls={controls}
      drag={axis === 'drag' ? true : 'y'}
    >
      <p>{value.emoji}</p>
      <p
        className={cn(styles.motion__text, { [styles.grab]: dragByText })}
        onPointerDown={(e) => {
          if (dragByText) controls.start(e);
        }}
      >
        {dragByText ? 'Drag Here' : 'Draggable'}
      </p>
    </Reorder.Item>
  );
};

export { Example };
