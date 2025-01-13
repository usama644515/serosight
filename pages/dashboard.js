import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import Hero from "../components/Dashboard/Hero";
import Overview from "../components/Dashboard/Overview";
import Overview2 from "../components/Dashboard/Overview2";
import OrderProgress from "../components/Dashboard/OrderProgress";
import OrderProgress2 from "../components/Dashboard/OrderProgress2";
import OrderHistory from "../components/Dashboard/OrderHistory";
import SubscriptionCard from "../components/Dashboard/SubscriptionCard";
import AccountSettings from "../components/Dashboard/AccountSettings";
import Bottomlines from "../components/Bottomlines";
import axios from "axios";

export default function Dashboard() {
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        // Get userId from localStorage
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID not found in local storage");
        }

        // Fetch orders for the user
        const response = await axios.get(`/api/orders/user/${userId}`);
        const orders = response.data;

        // Check if there are any orders and their status
        const incompleteOrder = orders.find(
          (order) => order.orderStatus !== "test completed"
        );

        // Set order status
        setOrderStatus(incompleteOrder ? "incomplete" : "completed");
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        setOrderStatus("completed"); // Default to completed if error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <section>
        <Head>
          <title>Dashboard - ImmunoMap</title>
        </Head>
        <Hero />
        <Overview />
        <Overview2 />
        {/* Conditionally render components based on order status */}
        {orderStatus === "incomplete" ? <OrderProgress /> : <OrderProgress2 />}
        <OrderHistory />
        <SubscriptionCard />
        <AccountSettings />
        <Bottomlines />
      </section>
    </Layout>
  );
}
