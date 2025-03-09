
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import { useBudget } from '../hooks/BudgetForm';
import AmountDisplay from './AmountDisplay';
import 'react-circular-progressbar/dist/styles.css'

export default function BudgetTracker() {

    const {state, dispatch, totalExpenses, reaminingBudget} = useBudget()
    const percentage = +( (totalExpenses/state.budget) * 100).toFixed(2)


  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
        <div className='flex justify-center'>
            <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                    pathColor: percentage === 100 ? '#DC2626' : '#3b82f6',
                    trailColor: '#F5F5F5',
                    textSize: 8,
                    textColor: percentage === 100 ? '#DC2626' : '#3b82f6'
                })}
                text={`${percentage}% Gastado`}
            />
        </div>
        
        <div className='flex flex-col justify-center items-center gap-6 '>
            <button
            type='button'
            className='w-full bg-pink-600 font-bold text-2xl text-white rounded-lg p-3'
            onClick={() => dispatch({type: 'RESET_APP'})}
            >
                RESETEAR APP
            </button>

            <AmountDisplay
                label='Presupuesto'
                amount={state.budget}
            />

            <AmountDisplay
                label='Disponible'
                amount={reaminingBudget}
            />

            <AmountDisplay
                label='Gastado'
                amount={totalExpenses}
            />

        </div>
    </div>
  )
}
