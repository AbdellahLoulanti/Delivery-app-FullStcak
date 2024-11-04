import React, { useEffect, useState } from 'react';
import { FaHome, FaUser, FaBox, FaSignOutAlt, FaDollarSign } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import { useAuth } from '../../api/AuthContext';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({ ordersCount: 0, usersCount: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);

  // Fonction pour générer des données de revenus mensuels aléatoires
  const generateRandomMonthlyRevenue = () => {
    const revenueData = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const month = (currentDate.getMonth() - i + 12) % 12 + 1; // Mois en cours - i
      const year = currentDate.getFullYear() - Math.floor((currentDate.getMonth() - i) / 12); // Année correspondante
      const totalRevenue = Math.floor(Math.random() * 10000); // Valeur aléatoire de revenus

      revenueData.push({ month, year, totalRevenue });
    }

    return revenueData.reverse(); // Inverser l'ordre pour afficher du plus ancien au plus récent
  };

  const fetchData = async () => {
    try {
      // Récupération des statistiques générales
      const statisticsResponse = await axios.get('http://localhost:8088/api/v1/admin/statistics', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const statisticsData = statisticsResponse.data;

      // Mise à jour des métriques
      setMetrics({
        ordersCount: statisticsData.totalCommandes,
        usersCount: statisticsData.totalGestionnaires,
        revenue: statisticsData.totalRevenu,
      });
      setRecentOrders(statisticsData.recentOrders || []);
      setMonthlyRevenue(generateRandomMonthlyRevenue()); // Remplacer par des données aléatoires

      // Récupération des meilleurs clients
      const customersResponse = await axios.get('http://localhost:8088/api/v1/admin/top-customers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const customersData = customersResponse.data;

      // Mise à jour des meilleurs clients
      setTopCustomers(customersData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Préparation des données pour le graphique de revenu mensuel
  const chartData = {
    labels: monthlyRevenue.map((data) => `${data.month}/${data.year}`),
    datasets: [
      {
        label: 'Revenue',
        data: monthlyRevenue.map((data) => data.totalRevenue),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'MAD' } },
    },
  };

  const { logout } = useAuth(); // Assuming useAuth provides a logout function

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      // Optionally, redirect to login or perform other actions
      window.location.href = '/login'; // Redirect to login after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 p-6 flex flex-col text-white" style={{ backgroundColor: '#018B98' }}>
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Panel</h2>
        <ul className="flex-1">
          <li className="mb-4 flex items-center">
            <FaHome className="mr-2" />
            <a href="/admin-dashboard" className="hover:text-gray-400">Dashboard</a>
          </li>
          <li className="mb-4 flex items-center">
            <FaBox className="mr-2" />
            <a href="/admin/manage-managers" className="hover:text-gray-400">Manage Managers</a>
          </li>
          
        </ul>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mt-auto flex items-center"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
        
      </aside>

      <main className="flex-1 p-6 bg-gray-100" style={{ backgroundColor: '#81CFD5' }}> 
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <div className="mr-4 p-3 rounded-full bg-blue-500 text-white">
              <FaBox size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Total Commands</h2>
              <p className="text-3xl font-bold">{metrics.ordersCount}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <div className="mr-4 p-3 rounded-full bg-green-500 text-white">
              <FaUser size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Total Managers</h2>
              <p className="text-3xl font-bold">{metrics.usersCount}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <div className="mr-4 p-3 rounded-full bg-yellow-500 text-white">
              <FaDollarSign size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Total Revenue</h2>
              <p className="text-3xl font-bold">MAD {metrics.revenue}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Monthly Revenue</h2>
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Customers</h2>
            <ul className="space-y-4">
              {topCustomers.map((customer, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {customer.name.charAt(0)}
                  </div>
                  <span className="text-lg font-medium text-gray-700 ml-2 pr-4">{customer.name}</span>
                  <span className="text-lg font-medium text-gray-700 ml-36 pr-12">{customer.totalSpent}CM</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
