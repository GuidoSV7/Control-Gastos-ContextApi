import { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import "react-swipeable-list/dist/styles.css";
import { useBudget } from "../hooks/BudgetForm";


type ExpenseDetailProps = {
  expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

  const { dispatch } = useBudget();

  console.log(expense);

  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
  );


  const leadingActions = () => (
    <LeadingActions>
        <SwipeAction
            onClick={() => dispatch({type: 'GET_EDITING_ID', payload: {id: expense.id}})}
            
        >
            Actualizar
        </SwipeAction>

    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
        <SwipeAction
            onClick={() => dispatch({type: 'DELETE_EXPENSE', payload: {id: expense.id}})}
            destructive={true}
            
        >
            Eliminar
        </SwipeAction>

    </TrailingActions>
  )

  return (
    <SwipeableList>
        <SwipeableListItem
            maxSwipe={1}
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex items-center gap-4">
                <div>
                    <img
                    src={`/icono_${categoryInfo?.icon}.svg`}
                    alt="icono gasto"
                    className="w-20"
                    />
                </div>

                <div className="flex-1 space-y-2">
                    <p className="text-sm font-bold uppercase text-slate-500">
                    {categoryInfo?.name}
                    </p>
                    <p>{expense.expenseName}</p>
                    <p className="text-slate-600 text-sm">
                    {formatDate(expense.date!.toLocaleString())}
                    </p>
                </div>

                <div className="flex-shrink-0">
                    <AmountDisplay amount={expense.amount} />
                </div>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  );
}
