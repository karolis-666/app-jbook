import { FC, useEffect, useState } from 'react';

import bundle from '../../bundler';
import { useActions } from '../../hooks/useActions';
import { Cell } from '../../state/types';
import CodeEditor from '../CodeEditor';
import Preview from '../Preview';
import Resizable from '../Resizable';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const [error, setError] = useState('');
  const [code, setCode] = useState('');

  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setError(output.error);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
