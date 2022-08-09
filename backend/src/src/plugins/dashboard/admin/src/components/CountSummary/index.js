import React, {useEffect, useState} from 'react';
import {Typography} from '@strapi/design-system/Typography';
import {Stack} from '@strapi/design-system/Stack';
import {request} from '@strapi/helper-plugin';
import pluginId from "../../pluginId";
import * as moment from "moment";

const CountSummary = (props) => {
  // console.log("Count Summary", props);
  const {contentType, title, subTitle} = props;

  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState({
    total: 0,
  });

  useEffect(async () => {
    setIsLoading(true);
    let data = await fetchReport();
    setIsLoading(false);
    var formatter = new Intl.NumberFormat('en-US');

    setSummary({
      total: formatter.format(data.count)
    })
  }, []);

  const fetchReport = async () => {
    try {
      let from = moment().startOf('month').format("YYYY-MM-DDT00:00:00");
      let to = moment().endOf('month').format("YYYY-MM-DDT23:59:59");
      return await request(`/${pluginId}/${contentType}?from=${from}&to=${to}`, {method: 'GET'});
    } catch (error) {
      return null;
    }
  };

  return (<Stack spacing={2}>
    <Typography variant="delta">
      {title}
    </Typography>
    <Typography variant="sigma">
      {subTitle}
    </Typography>
    <Typography variant="beta">
      {isLoading ? "--" : summary.total}
    </Typography>
  </Stack>)
};
export default CountSummary;
