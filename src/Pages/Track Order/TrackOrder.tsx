import { useState, useEffect } from "react";
import { Stepper, Button, Container, Title, Text, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { motion } from "framer-motion";
import apis from "../../utils/apis"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store";

interface User {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  cnic: string;
  postalAddress: string;
  permanentAddress: string;
  country: string;
  province: string;
  city: string;
  zipCode: string;
  imageUrl: string;
  otp: {
    otp: string;
    sendTime: number;
    token: string;
  };
  cartItems: {
    productId: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
  }[];
  OrderStatus: {
    orderId: string;
    status: string;
    paymentMethod: string;
    products: {
      productId: string;
      name: string;
      quantity: number;
      price: number;
      size: string;
    }[];
  }[];
  purchasedItems: {
    productId: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
  }[];
  createdAt: Date;
  updatedAt?: Date;
}


const TrackOrder = () => {
  const [active, setActive] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { user_id } = useSelector((state: RootState) => state.user)
  const [user, setUser] = useState<User>()
  const [orderId, setOrderId] = useState("");

  const getSpecificUser = async () => {
    try {
      const response = await fetch(`${apis().specificUser}/${user_id}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json'}
      })

      const result = await response.json()

      if(!response.ok) {
        console.log(result.message)
      }

      if(result.status) {
        console.log(result.message)
        setUser(result.user)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(String(error));
      }
    }
  }

  const handleTrackOrder = () => {
    if (!user) {
      console.log("User or orderStatus is undefined");
      return;
    }

    const status = user?.OrderStatus.find((order) => order.orderId === orderId)?.status

    switch (status) {
      case "Order Placed":
        setActive(1);
        break;
      case "Ready to Ship":
        setActive(2);
        break;
      case "In Transit":
        setActive(3);
        break;
      case "Out for Delivery":
        setActive(4);
        break;
      case "Delivered":
        setActive(5);
        break;
      default:
        setActive(0);
    }
  }

  useEffect(() => {
    getSpecificUser()
  }, [])

  return (
    <div className="bg-slate-100 min-h-screen flex pt-20 justify-center">
      <Container size="lg" py="xl">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <Title order={1} className="font-bold text-4xl md:text-5xl mb-4">
          Track Your Order
        </Title>
        <Text color="dimmed" className="text-lg">
          Stay updated with your order's journey from our warehouse to your doorstep.
        </Text>
        <div className="flex justify-center items-center gap-2 mt-6">
            <TextInput
              placeholder="Enter Order ID"
              radius="md"
              size="md"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-96"
            />
            <Button onClick={handleTrackOrder} color="teal">
              Track Order
            </Button>
          </div>
      </motion.section>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10"
      >
        <Stepper
          active={active}
          onStepClick={setActive}
          orientation={isMobile ? "vertical" : "horizontal"}
          size="lg"
          color="teal"
          className="shadow-lg p-6 rounded-lg bg-white"
        >
          <Stepper.Step
            label="Order Placed"
            allowStepClick = {false}
            allowStepSelect = {false}
            description="Your order has been placed"
            icon={<span className="text-teal-500">📦</span>}
          />
          <Stepper.Step
            label="Ready to Ship"
            allowStepClick = {false}
            allowStepSelect = {false}
            description="Your order is ready to ship"
            icon={<span className="text-teal-500">🚚</span>}
          />
          <Stepper.Step
            label="In Transit"
            allowStepClick = {false}
            allowStepSelect = {false}
            description={`Your order has reached ${user?.country}`}
            icon={<span className="text-teal-500">✈️</span>}
          />
          <Stepper.Step
            label="Out for Delivery"
            allowStepClick = {false}
            allowStepSelect = {false}
            description="Waiting at your door"
            icon={<span className="text-teal-500">🏠</span>}
          />
          <Stepper.Completed>
            <Text color="teal" fw={500} className="text-center">
              Your order has been delivered! 🎉
            </Text>
          </Stepper.Completed>
        </Stepper>
      </motion.article>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center"
      >
      </motion.div>
    </Container>
    </div>
  );
};

export default TrackOrder;