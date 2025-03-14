import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/BudgetForm";



export default function ExpenseForm() {

    


    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })

    const {dispatch,state, reaminingBudget} = useBudget()

    const [error, setError] = useState('')
    const [previusAmount, setPreviusAmount] = useState(0)

    useEffect(() => {
        if(state.editingId){
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            setPreviusAmount(editingExpense.amount)
        }
    }, [state.editingId])

    const handleChangeDate = (value:Value) =>{
        setExpense({
            ...expense,
            date: value
        })
    }    

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(expense).includes('')){
            setError('Todos los campos son obligatorios')
            return 
        }

        if((expense.amount - previusAmount) > reaminingBudget){
            setError('Ese Gasto se sale del presupuesto')
            return 
        }


        if(state.editingId) {
            dispatch({type: 'UPDATE_EXPENSE', payload: {expense: {id: state.editingId, ...expense}}})
            

        }else{
            dispatch({type: 'ADD_EXPENSE', payload: {expense}})
        }
        

        setExpense({        
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date()
        })
        setPreviusAmount(0)
            
    }


  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="text-center text-2xl font-black uppercase  border-b-4 border-blue-600 ">
            {state.editingId ? 'Actualizar Gasto' : 'Registrar Gasto'}
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>
        }
            

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName"
            className="text-xl font-bold"

            >Nombre Gasto:</label>

            <input type="text"
                id="expenseName"
                placeholder= "Añade el nombre del Gasto"
                className="bg-slate-100 p-2"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            />
            
        </div>

        <div className="flex flex-col gap-2">
           

            <label htmlFor="amount"
            className="text-xl font-bold">
                Cantidad:
            </label>

            <input type="number"
                id="amount"
                name="amount"
                className="bg-slate-100 py-2"
                placeholder="Añada la cantidad del gasto ej: 300"
                value={expense.amount}
                onChange={handleChange}
            />
            
        </div>

        <div className="flex flex-col gap-2">
           

           <label htmlFor="category"
           className="text-xl font-bold">
               Categoria:
           </label>

                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
      
       </div>


       <div className="flex flex-col gap-2">
           

            <label htmlFor="amount"
            className="text-xl font-bold">
                Fecha Gasto:
            </label>

           <DatePicker
             className={"bg-slate-100 p-2 border-8"} 
             value={expense.date}
                onChange={handleChangeDate}
           />
            
        </div>

    

       <input type="submit"
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={state.editingId ? 'Actualizar Gasto' : 'Registrar Gasto'}

       />

    </form>
  )
}
