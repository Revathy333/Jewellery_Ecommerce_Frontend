import React, { useEffect, useState } from "react";
import api from "../api/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminHome = () => {
  const [dashboardData, setDashboardData] = useState({
    user_count: 0,
    order_count: 0,
    total_revenue: 0,
  });
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats
      const [dashboardRes, usersRes, productsRes, ordersRes] = await Promise.all([
        api.get("admin/dashboard/"),
        api.get("admin/users/"),
        api.get("admin/products/"),
        api.get("admin/orders/"),
      ]);

      setDashboardData(dashboardRes.data);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.is_active).length;
  const inactiveUsers = totalUsers - activeUsers;
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const earnings = dashboardData.total_revenue || 0;

  // Calculate monthly orders
  const monthlyOrders = Array.from({ length: 12 }, (_, i) => {
    const monthOrders = orders.filter(
      (o) => new Date(o.created_at).getMonth() === i
    );
    return {
      month: new Date(0, i).toLocaleString("default", { month: "short" }),
      orders: monthOrders.length,
    };
  });

  // Calculate orders by category (from order items)
  const categoryOrdersData = () => {
    const categoryCount = {};
    
    orders.forEach((order) => {
      order.items?.forEach((item) => {
        // const categoryName = item.product?.category?.name || "Unknown";
        const categoryName = item.category_name || "Unknown";
        categoryCount[categoryName] = (categoryCount[categoryName] || 0) + item.quantity;
      });
    });

    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title="Total Users" value={totalUsers} />
        <Card title="Active Users" value={activeUsers} />
        <Card title="Inactive Users" value={inactiveUsers} />
        <Card title="Total Products" value={totalProducts} />
        <Card title="Total Orders" value={totalOrders} />
        <Card title="Total Revenue" value={`₹${earnings.toLocaleString()}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monthly Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#8884d8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Product Orders by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryOrdersData()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryOrdersData().map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition">
    <h3 className="text-gray-500 font-medium mb-2">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default AdminHome;
