import React, {useEffect, useState} from 'react';

import {Box} from '@strapi/design-system/Box';

import {request, useCMEditViewDataManager} from '@strapi/helper-plugin';
import {Divider} from '@strapi/design-system/Divider';
import {Typography} from '@strapi/design-system/Typography';
import {Button} from '@strapi/design-system/Button';
import pluginId from "../../pluginId";
import {Stack} from '@strapi/design-system/Stack';

const GetFlyChecker = () => {
  const {modifiedData, initialData} = useCMEditViewDataManager();
  const [getFlyRecord, setGetFlyRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveGetFlyData = async () => {

    if (!getFlyRecord.account_id) {
      setError("Vui lòng 'Tìm kiếm dữ liệu' trước!");
      return;
    }

    try {
      setIsLoading(true);
      const {id} = modifiedData;
      const bodyData = {
        customerId: id,
        getFlyData: getFlyRecord
      };
      console.log(bodyData);
      const res = await request(`/${pluginId}/saveGetFlyData`, {
        method: 'PUT',
        body: bodyData
      });
    } catch (e) {
      const {response} = e;
      console.log("Error Response: ", response);
      const {payload} = response;
      if (payload.error) {
        setError(payload.error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateToGetFly = async () => {
    try {
      setIsLoading(true);
      const {id} = modifiedData;
      const res = await request(`/${pluginId}/syncCustomer?customerId=${id}&&isTransferToGetFly=${true}`, {method: 'POST'});
      console.log(res);
    } catch (e) {
      const {response} = e;
      console.log("Error Response: ", response);
      const {payload} = response;
      if (payload.error) {
        setError(payload.error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const findGetFlyCustomer = async () => {
    const {mobile, email} = modifiedData;
    try {
      setIsLoading(true);
      const res = await request(`/${pluginId}/findCustomer?mobile=${mobile}&email=${email}`, {method: 'GET'});
      console.log(res);
      if (res.getFlyData) {
        setGetFlyRecord(res.getFlyData);
      } else {
        setGetFlyRecord(null);
      }
    } catch (e) {
      const {response} = e;
      console.log("Error Response: ", response);
      const {payload} = response;
      if (payload.error) {
        setError(payload.error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderControllerButton = () => {
    return <Box paddingTop={2}>
      <Stack spacing={2}>
        <Button disabled={isLoading} size={"S"} variant='tertiary' onClick={findGetFlyCustomer}>
          Tìm kiếm dữ liệu
        </Button>
        <Button disabled={isLoading || !getFlyRecord} size={"S"} variant='tertiary' onClick={saveGetFlyData}>
          Cập nhập từ GetFly
        </Button>
        <Button disabled={isLoading} size={"S"} variant='tertiary' onClick={updateToGetFly}>
          Chuyển dữ liệu qua GetFly
        </Button>
      </Stack>
    </Box>
  };

  const renderNoInfoBlock = () => {
    return <Box paddingTop={2}>
      <Typography variant="omega">Chưa có dữ liệu</Typography>
    </Box>;
  };

  const renderGetFlyDataBlock = () => {
    return <Stack spacing={2}>
      <Typography variant="omega">
        <Typography variant="omega" fontWeight="bold">Mã:</Typography> {getFlyRecord?.account_code}
      </Typography>
      <Typography variant="omega">
        <Typography variant="omega" fontWeight="bold">Khách hàng:</Typography> {getFlyRecord?.account_name}
      </Typography>
      <Typography variant="omega">
        <Typography variant="omega" fontWeight="bold">Nguồn:</Typography> {getFlyRecord?.account_source}
      </Typography>
      {/*<Typography variant="omega">*/}
      {/*  <Typography variant="omega" fontWeight="bold">Loại:</Typography> {getFlyRecord?.account_type}*/}
      {/*</Typography>*/}
      <Typography variant="omega">
        <Typography variant="omega" fontWeight="bold">SĐT:</Typography> {getFlyRecord?.phone}
      </Typography>
      <Typography variant="omega">
        <Typography variant="omega" fontWeight="bold">Email:</Typography> {getFlyRecord?.email}
      </Typography>
    </Stack>;
  };

  useEffect(() => {
    if (modifiedData.hasOwnProperty('getFlyData') && modifiedData.hasOwnProperty('id')) {
      if (initialData && initialData.getFlyData) {
        setGetFlyRecord(JSON.parse(initialData.getFlyData));
      }
    }
  }, [initialData]);

  if (modifiedData.hasOwnProperty('getFlyData') && modifiedData.hasOwnProperty('id')) {
    return (
      <Box
        as="aside"
        aria-labelledby="additional-informations"
        paddingTop={4}
      >
        <Box
          as="aside"
          aria-labelledby="additional-informations"
          paddingBottom={2}
        >
          <Typography textColor={"#666687"} variant="sigma">GetFly</Typography>
        </Box>
        <Divider />
        {error && <Box paddingBottom={2}>
          <Typography textColor={"#FF0000"} variant="pi">{error}</Typography>
        </Box>
        }
        <Box paddingTop={2}>
          {!getFlyRecord ? renderNoInfoBlock() : renderGetFlyDataBlock()}
          {renderControllerButton()}
        </Box>
      </Box>
    );
  }
  return <></>;
};

export default GetFlyChecker;
