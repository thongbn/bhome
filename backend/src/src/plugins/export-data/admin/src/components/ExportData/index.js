import React from 'react';
import {useSelector} from 'react-redux';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ExportData = () => {
    const listViewData = useSelector((state) => state["content-manager_listView"]);
    console.log(listViewData);
    if (listViewData.contentType.apiID !== "customer"
      && listViewData.contentType.apiID !== "appointment"
    ) {
      return <></>;
    }

    const convertLocation = (locationData) => {
      if (!locationData || locationData === "") {
        return ""
      }
      let [code, text] = locationData.split("|");
      return text;
    };

    const renderTable = () => {
      switch (listViewData.contentType.apiID) {
        case "customer":
          return renderCustomerTable();
        case "appointment":
          return renderAppointmentTable();
      }

      return <table id="table-to-xls" style={{display: "none"}}>

      </table>
    };

    const renderAppointmentTable = () => {
      return (<table id="table-to-xls" style={{display: "none"}}>
        <thead>
          <tr key={`trhead`}>
            <th>Tên Họ</th>
            <th>Số điện thoại</th>
            <th>Cơ sở</th>
            <th>Dịch vụ</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Tin nhắn</th>
          </tr>
        </thead>
        <tbody>
          {listViewData.data.map((item, idx) => {
            return (<tr key={`trBody${idx}`}>
              <td>{item.fullname}</td>
              <td>{`${item.phone}`}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{item.note}</td>
            </tr>)
          })}
        </tbody>
      </table>)
    };

    const renderCustomerTable = () => {
      return (<table id="table-to-xls" style={{display: "none"}}>
        <thead>
          <tr key={`trhead`}>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Ngày sinh</th>
            <th>Địa chỉ</th>
            <th>Thành phố</th>
            <th>Quận Huyện</th>
          </tr>
        </thead>
        <tbody>
          {listViewData.data.map((item, idx) => {
            return (<tr key={`trBody${idx}`}>
              <td>{item.fullname}</td>
              <td>{item.email}</td>
              <td>{`${item.mobile}`}</td>
              <td>{item.birthday}</td>
              <td>{item.address}</td>
              <td>{convertLocation(item.city)}</td>
              <td>{convertLocation(item.district)}</td>
            </tr>)
          })}
        </tbody>
      </table>);
    };

    return (
      <>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename={`${listViewData.contentType.apiID}`}
          sheet="Data"
          buttonText="Tải Excel" />
        {renderTable()}
      </>
    )
  }
;

export default ExportData;
