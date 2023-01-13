import { FC, useEffect } from 'react';

import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Cell } from '../../state/types';
import CodeEditor from '../CodeEditor';
import Preview from '../Preview';
import Resizable from '../Resizable';
import './CodeCell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  const bundle = useTypedSelector(state => state.bundles[cell.id]);

  const cumulativeCode = useTypedSelector(state => {
    const { data, order } = state.cells;
    const orderedCells = order.map(id => data[id]);

    const cumulativeCode = [];

    for (let c of orderedCells) {
      if (c.type === 'code') {
        cumulativeCode.push(c.content);
      }

      if (c.id === cell.id) {
        break;
      }
    }

    return cumulativeCode;
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode.join('\n'), cell.id, createBundle]);

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
            onChange={value => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundle || bundle.isLoading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
