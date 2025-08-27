import React, { useState, useEffect } from 'react';
import { Wallet, Plus, TrendingUp, PieChart, Calendar, Filter, Search, IndianRupee } from 'lucide-react';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import Charts from './components/Charts';
import { ExpenseProvider } from './context/ExpenseContext';
import Header from './components/Header';
import Navigation from './components/Navigation';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        <Header />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'add' && <AddExpense />}
          {activeTab === 'expenses' && <ExpenseList />}
          {activeTab === 'charts' && <Charts />}
        </main>
      </div>
    </ExpenseProvider>
  );
}

export default App;