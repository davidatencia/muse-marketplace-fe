import ui from '@private/dashboard/styles/ui.module.css';
import { getStockStatus } from '@private/dashboard/utils/stock';

const VARIANTS = {
  out: ui.pillDanger,
  low: ui.pillWarning,
  ok: ui.pillSuccess,
};

interface StockPillProps {
  stock: number;
}

function StockPill({ stock }: StockPillProps) {
  const status = getStockStatus(stock);

  return (
    <span className={`${ui.pill} ${VARIANTS[status]}`}>
      {status === 'out' ? 'Agotado' : `${stock} en stock`}
    </span>
  );
}

export default StockPill;
