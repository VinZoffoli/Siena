import type { MenuItem } from "@/lib/order-menu";
import { MinusIcon, PlusIcon, TrashIcon } from "./icons";

export function CartLine({
  item,
  qty,
  onAdd,
  onRemove,
  onEdit,
  onDelete,
}: {
  item: MenuItem;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
  onEdit?: () => void;
  onDelete: () => void;
}) {
  const unitPrice = parseFloat(item.price);
  const hasNumericPrice = !isNaN(unitPrice);
  const lineTotal = hasNumericPrice ? `$${(unitPrice * qty).toFixed(2)}` : item.price;

  return (
    <div className="py-4 border-b border-white/10 last:border-b-0">
      <div className="flex items-start gap-3">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-14 h-14 object-cover flex-shrink-0" />
        ) : (
          <div className="w-14 h-14 flex-shrink-0 bg-white/8" />
        )}

        <div className="flex-1 min-w-0 flex items-start justify-between gap-2">
          <h4 className="text-[15px] text-white leading-snug">{item.name}</h4>
          <div className="flex items-center gap-3 flex-shrink-0">
            {onEdit && (
              <button onClick={onEdit} className="text-[13px] text-[#e0b265] hover:text-white transition-colors">
                Edit
              </button>
            )}
            <button
              onClick={onDelete}
              aria-label={`Remove ${item.name} from cart`}
              className="text-white/50 hover:text-white transition-colors"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pl-[68px]">
        <div className="flex items-center gap-1 border border-white/20 rounded-full px-1 py-1">
          <button
            onClick={onRemove}
            aria-label={`Decrease ${item.name} quantity`}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition"
          >
            <MinusIcon />
          </button>
          <span className="w-6 text-center text-[13px] font-semibold text-white">{qty}</span>
          <button
            onClick={onAdd}
            aria-label={`Increase ${item.name} quantity`}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition"
          >
            <PlusIcon />
          </button>
        </div>
        <span className="text-[14px] font-semibold text-[#e0b265]">{lineTotal}</span>
      </div>
    </div>
  );
}
