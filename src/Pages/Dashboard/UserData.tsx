import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import apis from "../../utils/apis";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CartItem {
  productId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
}

interface OrderProduct {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  size: string;
}

interface OrderStatus {
  orderId: string;
  status: string;
  paymentMethod: string;
  products: OrderProduct[];
}

interface PurchasedItem {
  productId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
}

// interface User {
//   CartItems: CartItem[];
//   OrderStatus: OrderStatus[];
//   PurchasedItems: PurchasedItem[];
// }

interface ChartData {
  name: string;
  quantity: number;
}

const UserData: React.FC = () => {
  const { user_id } = useSelector((state: RootState) => state.user);
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderStatus, setOrderStatus] = useState<OrderStatus[]>([]);
  
  // State for total quantities
  const [totalPurchasedQuantity, setTotalPurchasedQuantity] = useState(0);
  const [totalCartQuantity, setTotalCartQuantity] = useState(0);
  const [totalOrderQuantity, setTotalOrderQuantity] = useState(0);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${apis().specificUser}/${user_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);
        return;
      }

      if (result.status) {
        console.log(result.message);
        console.log(result.user);

        if (result.user) {

          setCartItems(result.user.CartItems || []);
          setOrderStatus(result.user.OrderStatus || []);
          setPurchasedItems(result.user.PurchasedItems || []);

        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setTotalPurchasedQuantity(
      purchasedItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
    );
    setTotalCartQuantity(
      cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
    );
    setTotalOrderQuantity(
      orderStatus.reduce(
        (sum, order) =>
          sum + order.products.reduce((orderSum, product) => orderSum + (product.quantity || 0), 0),
        0
      )
    );
  }, [purchasedItems, cartItems, orderStatus]); // ✅ Now updates when these states change
  

  // Function to transform PurchasedItems into chart data
  const transformData = (purchasedItems: PurchasedItem[]): ChartData[] => {
    const productCounts: Record<string, number> = {};

    purchasedItems.forEach((item) => {
      if (productCounts[item.name]) {
        productCounts[item.name] += item.quantity;
      } else {
        productCounts[item.name] = item.quantity;
      }
    });

    return Object.keys(productCounts).map((productName) => ({
      name: productName,
      quantity: productCounts[productName],
    }));
  };

  const chartData = transformData(purchasedItems);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-500 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Purchased Items</h2>
          <p className="text-4xl font-bold mb-4 text-white">{totalPurchasedQuantity}</p>
        </div>
        <div className="bg-blue-500 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Order Items</h2>
          <p className="text-4xl font-bold mb-4 text-white">{totalOrderQuantity}</p>
        </div>
        <div className="bg-orange-500 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Cart Items</h2>
          <p className="text-4xl font-bold mb-4 text-white">{totalCartQuantity}</p>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Most Purchased Products</h2>
        <div style={{ width: "100%", height: "400px" }}>
          <ResponsiveContainer>
            <BarChart layout="vertical" data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#8884d8" name="Quantity Purchased" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserData;
