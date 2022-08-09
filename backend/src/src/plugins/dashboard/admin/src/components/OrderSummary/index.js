import React, {useEffect, useState} from 'react';
import {Typography} from '@strapi/design-system/Typography';
import {Stack} from '@strapi/design-system/Stack';
import {request} from '@strapi/helper-plugin';
import pluginId from "../../pluginId";
import * as moment from "moment";

const OrderSummary = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [orderSummary, setOrderSummary] = useState({
    totalOrder: 0,
    totalRevenue: 0
  });

  useEffect(async () => {
    setIsLoading(true);
    let data = await fetchReport();
    setIsLoading(false);
    var formatter = new Intl.NumberFormat('en-US');
    setOrderSummary({
      totalRevenue: formatter.format(data.totalRevenue) + " VND",
      totalOrder: formatter.format(data.count)
    })
  }, []);

  const fetchReport = async () => {
    try {
      let from = moment().startOf('month').format("YYYY-MM-DDT00:00:00");
      let to = moment().endOf('month').format("YYYY-MM-DDT23:59:59");
      console.log(from, to);
      return await request(`/${pluginId}/order-summary?from=${from}&to=${to}`, {method: 'GET'});
    } catch (error) {
      return null;
    }
  };

  return (<Stack spacing={2}>
    <Typography variant="delta">
      Đơn hàng trong tháng
    </Typography>
    <Typography variant="sigma">
      Tổng đơn: {isLoading ? "--" : orderSummary.totalOrder}
    </Typography>
    <Typography variant="beta">
      {isLoading ? "--" : orderSummary.totalRevenue}
    </Typography>
  </Stack>)
};
export default OrderSummary;
