import React, {useEffect, useState} from 'react';
import * as moment from "moment";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Stack} from '@strapi/design-system/Stack';
import {Typography} from '@strapi/design-system/Typography';


const OrderChart = (props) => {
  const {dateRange, orderData} = props;
  const [data, setData] = useState([]);
  //
  useEffect(async () => {
    console.log(`Fetch OrderChart`, dateRange, orderData);
    filterData(orderData);
  }, [dateRange, orderData]);

  const filterData = async (resData) => {
    if (!resData.entries) {
      resData.entries = []
    }
    let chartData = [];
    dateRange.dateRangeLabel.forEach(date => {
      chartData.push({
        value: 0,
        revenue: 0,
        name: moment(date).format('DD/MM/YYYY')
      })
    });
    resData.entries.map(entry => {
      let date = moment(entry.createdAt).format('DD/MM/YYYY');
      for (let i = 0; i < chartData.length; i++) {
        if (chartData[i].name === date) {
          chartData[i].value++;
          chartData[i].revenue = parseInt(entry.total);
          break;
        }
      }
    });
    setData(chartData);
  };

  return (<Stack spacing={3}>
    <Typography variant="delta">
      Đơn hàng
    </Typography>
    <ResponsiveContainer width={"100%"} height={200}>
      <LineChart data={data} margin={{top: 5, right: 0, bottom: 5, left: 0}}>
        <Line name="Tổng" type="monotone" dataKey="revenue" stroke="#82ca9d" activeDot={true} />
        <Line name="Số lượng" type="monotone" dataKey="value" stroke="#8884d8" />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  </Stack>)
};
export default OrderChart;
