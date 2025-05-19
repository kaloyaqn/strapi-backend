import React, { useState, useEffect } from 'react';
import { Main } from '@strapi/design-system';
import { Table, Thead, Tbody, Tr, Th, Td } from '@strapi/design-system/Table';
import { HeaderLayout } from '@strapi/design-system/Layout';
import { useFetchClient } from '@strapi/helper-plugin';

const HomePage = () => {
  const { get } = useFetchClient(); // Strapi's built-in fetch client
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await get('/api/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });
        console.log('Response:', response);
        setOrders(response.data.data);
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    };
    

    fetchOrders();
  }, [get]);

  return (
    <Main>
      <HeaderLayout
        title="Orders"
        subtitle="Manage your orders"
      />
      <h1>Welcome to Orders</h1>
      <p>This is a hardcoded word: TEST</p>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Customer Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Address</Th>
              <Th>Total</Th>
              <Th>Status</Th>
              <Th>Created At</Th>
            </Tr>
          </Thead>
          asd
          <Tbody>
            {orders.map((order) => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{`${order.firstName} ${order.lastName}`}</Td>
                <Td>{order.email}</Td>
                <Td>{order.phone}</Td>
                <Td>{`${order.address}, ${order.city}, ${order.posstalCode}`}</Td>
                <Td>{order.total}</Td>
                <Td>{order.order_status}</Td>
                <Td>{new Date(order.createdAt).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Main>
  );
};

export { HomePage };
