import { BASE_URL } from "@/constants/apiDetails";

import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { Loader } from "@mantine/core";

const Home = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
  ];

  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
  ];
  const data02 = [
    { name: "A1", value: 100 },
    { name: "A2", value: 300 },
  ];

  const products = async () => {
    const response = await fetch(`${BASE_URL}/product/total`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useQuery({
    queryKey: ["product"],
    queryFn: products,
  });

  const categories = async () => {
    const response = await fetch(`${BASE_URL}/category/categoryCount`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const {
    data: category,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: categories,
  });

  const customers = async () => {
    const response = await fetch(`${BASE_URL}/user/totalUsers`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const {
    data: customer,
    isLoading: isCustomerLoading,
    error: CustomerError,
  } = useQuery({
    queryKey: ["customer"],
    queryFn: customers,
  });
  if (isProductLoading || isCategoryLoading || isCustomerLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (productError || categoryError || isCustomerLoading) {
    return (
      <div>
        Error:{" "}
        {productError?.message ||
          categoryError?.message ||
          CustomerError?.message}
      </div>
    );
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards gap-10 ">
        <div className="card">
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{product ? product.total : "No Data"}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{category ? category.total : "No Category"}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{customer ? customer.total : "No Customer"}</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={data01}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
            />
            <Pie
              data={data02}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default Home;
