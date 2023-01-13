import { FC, Fragment } from 'react';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import AddCell from '../AddCell';
import CellListItem from '../CellListItem';

const CellList: FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div>
      <AddCell prevCellId={null} forceVisible={!cells.length} />
      {renderCells}
    </div>
  );
};

export default CellList;
