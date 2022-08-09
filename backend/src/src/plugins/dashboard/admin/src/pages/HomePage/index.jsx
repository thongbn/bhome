/*
 *
 * HomePage
 *
 */

import React, {memo, useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
import {ContentLayout, HeaderLayout, Layout} from "@strapi/design-system/Layout";
import {Box} from '@strapi/design-system/Box';
import {Flex} from '@strapi/design-system/Flex';
import {Grid, GridItem} from '@strapi/design-system/Grid';
import OrderSummary from "../../components/OrderSummary";
import CountSummary from "../../components/CountSummary";
import {DatePicker} from '@strapi/design-system/DatePicker';
import {Stack} from '@strapi/design-system/Stack';
import OrderChart from "../../components/OrderChart";
import {getDates} from "../../utils/util";
import * as moment from "moment";
import pluginId from "../../pluginId";
import {request} from '@strapi/helper-plugin';
import ProductChart from "../../components/ProductChart";

const Homepage = (props) => {
  const [orderData, setOrderData] = useState({
    entries: [],
    count: 0,
    totalRevenue: 0
  });
  const [dateRange, setDateRange] = useState(() => {
    let date = new Date();
    let fromDate = (new Date(date.getFullYear(), date.getMonth(), 1));
    let toDate = (new Date(date.getFullYear(), date.getMonth() + 1, 0));
    let dateRangeLabel = getDates(fromDate, toDate);
    return {
      fromDate: fromDate,
      toDate: toDate,
      dateRangeLabel
    }
  });

  useEffect( async ()=> {
    // let data = await fetchOrderReport();
    // setOrderData(data);
  },[dateRange]);

  const fetchOrderReport = async () => {
    console.log(`fetchOrderReport`);
    try {
      let from = moment(dateRange.fromDate).format("YYYY-MM-DDT00:00:00");
      let to = moment(dateRange.toDate).format("YYYY-MM-DDT23:59:59");
      console.log(from, to);
      return await request(`/${pluginId}/order-summary?from=${from}&to=${to}`, {method: 'GET'});
    } catch (error) {
      return {
        entries: []
      };
    }
  };

  const onChangeFromDate = (date) => {
    console.log('onChangeFromDate', date);
    setDateRange({
      ...dateRange,
      fromDate: date,
      dateRangeLabel: getDates(date, dateRange.toDate)
    })
  };

  const onChangeToDate = (date) => {
    console.log(`onChangeToDate`, date);
    setDateRange({
      ...dateRange,
      toDate: date,
      dateRangeLabel: getDates(dateRange.fromDate, date)
    })
  };

  return (
    <Layout>
      <HeaderLayout title={"Dashboard"} subtitle={"Summary all the love"} as={"h2"} />
      <ContentLayout>
        {/*Date Input*/}
        <Grid gap={{
          desktop: 5,
          tablet: 2,
          mobile: 1
        }}>
          {/*<GridItem padding={1} col={3} s={12}>*/}
          {/*  <Box padding={3} background="neutral0" hasRadius={true} shadow="filterShadow">*/}
          {/*    <OrderSummary />*/}
          {/*  </Box>*/}
          {/*</GridItem>*/}
          <GridItem padding={1} col={3} s={12}>
            <Box padding={3} background="neutral0" hasRadius={true} shadow="filterShadow">
              <CountSummary contentType={"article-summary"} title={"Bài viết"} subTitle={"Trong tháng"} />
            </Box>
          </GridItem>
          <GridItem padding={1} col={3} s={12}>
            <Box padding={3} background="neutral0" hasRadius={true} shadow="filterShadow">
              <CountSummary contentType={"contact-summary"} title={"Liên hệ"} subTitle={"Đăng ký trong tháng"} />
            </Box>
          </GridItem>
          <GridItem padding={1} col={3} s={12}>
            <Box padding={3} background="neutral0" hasRadius={true} shadow="filterShadow">
              <CountSummary contentType={"customer-summary"} title={"Khách hàng"} subTitle={"Trong tháng"} />
            </Box>
          </GridItem>
          <GridItem padding={1} col={12}>
            <Stack spacing={4} horizontal>
              <DatePicker onChange={onChangeFromDate}
                          selectedDate={dateRange.fromDate}
                          selectedDateLabel={formattedDate => {
                          }}
                          label={"Ngày bắt đầu"} />
              <DatePicker onChange={onChangeToDate}
                          selectedDateLabel={formattedDate => {
                          }}
                          selectedDate={dateRange.toDate}
                          label={"Ngày kết thúc"} />
            </Stack>
          </GridItem>
          {/*<GridItem padding={1} col={6} s={12}>*/}
          {/*  <Box padding={3} background="neutral0" hasRadius={true} shadow="filterShadow">*/}
          {/*    <OrderChart dateRange={dateRange} orderData={orderData} />*/}
          {/*  </Box>*/}
          {/*</GridItem>*/}
          {/*<GridItem padding={1} col={6} s={12}>*/}
          {/*  <Box padding={3} background="neutral0" hasRadius={true} shadow="filterShadow">*/}
          {/*    <ProductChart dateRange={dateRange} orderData={orderData} />*/}
          {/*  </Box>*/}
          {/*</GridItem>*/}
        </Grid>
      </ContentLayout>
    </Layout>
  );
};

export default memo(Homepage);
