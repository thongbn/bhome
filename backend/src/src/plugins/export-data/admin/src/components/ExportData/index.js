import React from 'react';
import {useSelector} from 'react-redux';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {useIntl} from "react-intl";

const ExportData = () => {
    const listViewData = useSelector((state) => state["content-manager_listView"]);
    const {formatMessage} = useIntl();
    console.log(listViewData);
    if (listViewData.contentType.apiID !== "customer"
      && listViewData.contentType.apiID !== "order"
      && listViewData.contentType.apiID !== "contact"
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
        case "order":
          return renderOrderTable();
        case "contact":
          return renderContactTable();
      }

      return <table id="table-to-xls" style={{display: "none"}}>
      </table>
    };

  const renderContactTable = () => {
    return (<table id="table-to-xls" style={{display: "none"}}>
      <thead>
        <tr key={`trhead`}>
          <th>Họ và tên</th>
          <th>Email</th>
          <th>SĐT</th>
          <th>Ghi chú</th>
        </tr>
      </thead>
      <tbody>
        {listViewData.data.map((item, idx) => {
          return (<tr key={`trBody${idx}`}>
            <td>{item.fullname}</td>
            <td>{item.email}</td>
            <td>{`${item.mobile}`}</td>
            <td>{item.description}</td>
          </tr>)
        })}
      </tbody>
    </table>);
  };

    const renderOrderTable = () => {
      return (<table id="table-to-xls" style={{display: "none"}}>
        <thead>
          <tr key={`trhead`}>
            <th>Mã đơn hàng</th>
            <th>Tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Địa chỉ</th>
            <th>Thành phố</th>
            <th>Quận Huyện</th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Dơn giá</th>
            <th>Tổng</th>
            <th>Thanh toán</th>
            <th>Ngày tạo</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {listViewData.data.map((order, idx) => {
            const products = order.items;
            const rows = [];
            if (!products) {
              rows.push(<tr key={`trBody${idx}`}>
                <td>#{order.id}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{`${order.phone}`}</td>
                <td>v{order.address}</td>
                <td>{convertLocation(order.city)}</td>
                <td>{convertLocation(order.district)}</td>
                <td colSpan={3}>Không tìm thấy sản phẩm</td>
                <td>{order.paymentType ? formatMessage({id: order.paymentType}) : ""}</td>
                <td>{order.createdAt}</td>
                <td>{order.note}</td>
              </tr>)
            } else {
              products.map((p, idx) => {
                rows.push(<tr key={`trBody${idx}`}>
                  <td>#{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{`${order.phone}`}</td>
                  <td>{order.address}</td>
                  <td>{convertLocation(order.city)}</td>
                  <td>{convertLocation(order.district)}</td>
                  <td>{p.productName}</td>
                  <td>{p.quantity}</td>
                  <td>{p.price}</td>
                  <td>{p.price * parseInt(p.quantity)}</td>
                  <td>{order.paymentType? formatMessage({id: order.paymentType}) : ""}</td>
                  <td>{order.createdAt}</td>
                  <td>{idx === 0 ? order.note : ""}</td>
                </tr>)
              });
            }
            return rows;
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
