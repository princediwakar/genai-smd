import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import FinishSignUp from './components/FinishSignUp';
import AppHeader from './components/AppHeader';
import Dashboard from './pages/Dashboard';

const App = () => {
	return (
		<Router>
			<div className="flex flex-col min-h-screen">
				<AppHeader />
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/finishSignUp" element={<FinishSignUp />} />
						<Route path="/dashboard" element={<Dashboard />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
