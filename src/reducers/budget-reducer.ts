import { DraftExpense, Expense } from '../types/index';
import {v4 as uuidv4} from 'uuid'

export type BudgetActions = 
    {type : 'ADD_BUDGET', payload: {budget:number}} | 
    {type : 'SHOW_MODAL'} |
    {type : 'ADD_EXPENSE', payload: {expense: DraftExpense}} |
    {type : 'DELETE_EXPENSE', payload: {id: string}} |
    {type : 'UPDATE_EXPENSE', payload: {expense: Expense}} |
    {type : 'GET_EDITING_ID', payload: {id: string}} |
    {type : 'RESET_APP'} |
    {type: 'ADD_FILTER_CATEGORY', payload: {id: string}} 


export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: string | null,
    currentCategory: string | null,
    
}

const initialBudget = () : number =>{
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses =  () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []

}

export const initialState : BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: ''

}

const createExpense = (draftExpense:DraftExpense): Expense => {
    return {
        id: uuidv4(),
        ...draftExpense
    }
}

export const budgetReducer = (
    state: BudgetState,
    action: BudgetActions
    ) => {

        if(action.type === 'ADD_BUDGET'){



            return{
                ...state,
                budget: action.payload.budget
                
            }
        }

        if(action.type === 'SHOW_MODAL'){

            return{
                ...state,
                modal: !state.modal
            }
        }

        if(action.type === 'ADD_EXPENSE'){
            
            const expense = createExpense(action.payload.expense)
            return{
                ...state,
               expenses: [...state.expenses, expense],
                modal: false
            }
        }

        if(action.type === 'DELETE_EXPENSE'){

            return{
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
            }
        }

        if(action.type === 'GET_EDITING_ID'){
            return{
                ...state,
                editingId: action.payload.id,
                modal: true
            }
        }



        if(action.type === 'UPDATE_EXPENSE'){
            

            return{
                ...state,
                expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
                editingId: '',
                modal: false

                
            }
        }

        if(action.type === 'RESET_APP'){
            return{
                ...state,
                budget: 0,
                expenses: [],
                
            }
        }

        if(action.type === 'ADD_FILTER_CATEGORY'){
            return{
                ...state,
                currentCategory: action.payload.id
            }
        }

    return state
}


