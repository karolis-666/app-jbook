import { FC } from 'react';

import { useActions } from '../../hooks/useActions';
import './AddCell.css';

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <button
        className='button is-rounded is-primary is-small'
        onClick={() => insertCellAfter(prevCellId, 'code')}
      >
        <span className='icon is-small'>
          <i className='fas fa-plus' />
        </span>
        <span>Code</span>
      </button>
      <button
        className='button is-rounded is-primary is-small'
        onClick={() => insertCellAfter(prevCellId, 'text')}
      >
        <span className='icon is-small'>
          <i className='fas fa-plus' />
        </span>
        <span>Text</span>
      </button>
      <div className='divider' />
    </div>
  );
};

export default AddCell;
