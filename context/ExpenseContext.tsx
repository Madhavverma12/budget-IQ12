import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'expense' | 'income';
}

interface ExpenseState {
  expenses: Expense[];
  budget: number;
}

type ExpenseAction = 
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'SET_BUDGET'; payload: number }
  | { type: 'LOAD_DATA'; payload: ExpenseState };

const ExpenseContext = createContext<{
  state: ExpenseState;
  dispatch: React.Dispatch<ExpenseAction>;
} | null>(null);

const expenseReducer = (state: ExpenseState, action: ExpenseAction): ExpenseState => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      const newState = { ...state, expenses: [action.payload, ...state.expenses] };
      localStorage.setItem('budgetiq-data', JSON.stringify(newState));
      return newState;
    case 'DELETE_EXPENSE':
      const filteredState = { ...state, expenses: state.expenses.filter(exp => exp.id !== action.payload) };
      localStorage.setItem('budgetiq-data', JSON.stringify(filteredState));
      return filteredState;
    case 'SET_BUDGET':
      const budgetState = { ...state, budget: action.payload };
      localStorage.setItem('budgetiq-data', JSON.stringify(budgetState));
      return budgetState;
    case 'LOAD_DATA':
      return action.payload;
    default:
      return state;
  }
};

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, { expenses: [], budget: 50000 });

  React.useEffect(() => {
    const savedData = localStorage.getItem('budgetiq-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
};