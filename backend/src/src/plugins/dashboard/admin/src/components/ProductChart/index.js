import React, {useEffect, useState} from 'react';
import * as moment from "moment";
import {CartesianGrid, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Stack} from '@strapi/design-system/Stack';
import {Typography} from '@strapi/design-system/Typography';


const ProductChart = (props) => {
  const {dateRange, orderData} = props;
  const [data, setData] = useState([]);
  //
  useEffect(async () => {
    filterData(orderData);
  }, [dateRange, orderData]);

  const filterData = async (resData) => {
    if (!resData.entries) {
      resData.entries = []
    }
    let chartData = [];
    resData.entries.map(entry => {
      let items = entry.items;
      items.map(item => {
        if(item.product){
          let isNew = true;
          for (let i = 0; i < chartData.length; i++) {
            if (chartData[i].id === item.product.id) {
              isNew = false;
              chartData[i].value += item.quantity;
              break;
            }
          }

          if(isNew){
            chartData.push({
              id: item.product.id,
              name: item.product.name,
              value: 1
            });
          }
        }
      });
    });
    setData(chartData);
  };

  return (<Stack spacing={3}>
    <Typography variant="delta">
      Sản phẩm
    </Typography>
    <ResponsiveContainer width={"100%"} height={200}>
      <BarChart data={data} margin={{top: 5, right: 0, bottom: 5, left: 0}}>
        <Bar name="Số lượng" dataKey="value" stroke="#82ca9d" />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </BarChart>
    </ResponsiveContainer>
  </Stack>)
};
export default ProductChart;
