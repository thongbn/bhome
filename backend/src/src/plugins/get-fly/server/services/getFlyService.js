'use strict';
const axios = require('axios');

module.exports = ({strapi}) => ({
  async getUrlParams() {
    const settings = await strapi.entityService.findOne('api::setting.setting', 1, {
      fields: ['getFlyApiKey', 'getFlyApiUrl']
    });
    const {getFlyApiKey, getFlyApiUrl} = settings;
    return {
      baseUrl: getFlyApiUrl,
      apiKey: getFlyApiKey,
      headers: {
        'X-API-KEY': getFlyApiKey
      }
    };
  },

  async asyncCustomer(customer, isTransferToGetFly = false) {
    console.log("=======asyncCustomer========", customer, isTransferToGetFly);
    if (!customer || (!customer.email || !customer.mobile)) {
      return {
        error: "Thiếu mobile hoac email",
        data: []
      };
    }

    //Check GetFly information
    let hasGetFlyData = false;
    if (customer.getFlyData) {
      let getFlyData = customer.getFlyData;
      console.log("GetFlyData", getFlyData);
      if (getFlyData.account_id) {
        let res = await this.getCustomer(getFlyData.account_id);
        console.log("GetFlyData Response", res);
        if (!res.error && res.data) {
          //Truong hop neu la transfer sang get fly thi viet tiep o day
          if (isTransferToGetFly) {
            let updateData = await this.updateCustomer(getFlyData.account_id, customer);
            if (!updateData.error) {
              res = await this.getCustomer(getFlyData.account_id);
            }
          }

          let newData = this.toGetflyData(res.data.info);
          getFlyData = {
            ...getFlyData,
            ...newData
          };
          hasGetFlyData = true;
          //Cap nhap lai getFlyData moi lay ve
          customer.getFlyData = getFlyData;
        } else {
          console.log(res.error);
          return {
            error: res.error,
            data: []
          };
        }
      }
    }

    if (hasGetFlyData) {
      await strapi.entityService.update("api::customer.customer", customer.id, {
        data: customer
      });
    } else {
      try {
        const res = await this.createOrUpdateCustomer(customer);
        console.log("Response createCustomer", res);
        if (!res.error && res.data && res.data.account_id) {
          const newCustomerRes = await this.getCustomer(res.data.account_id);
          customer.getFlyData = this.toGetflyData(newCustomerRes.data.info);
          await strapi.entityService.update("api::customer.customer", customer.id, {
            data: customer
          });
        } else {
          console.log(res.error);
          return {
            error: res.error ? res.error : "Lỗi GetFly ko trả ve dữ liệu đúng",
            data: []
          };
        }
      } catch (e) {
        console.error(e);
        return {
          error: "Internal Server Error",
          data: []
        };
      }
    }

    console.log("=======End AsyncCustomer========");
    return {
      data: customer
    }
  },

  toGetflyData(rawData) {
    return {
      account_id: rawData.account_id,
      account_code: rawData.account_code,
      account_name: rawData.account_name,
      account_source: rawData.account_source,
      address: rawData.address,
      phone: rawData.phone,
      email: rawData.email
    }
  },

  async createOrUpdateCustomer(customerData) {
    if (!customerData) {
      return {
        error: "Chua co du lieu khach hang",
        data: []
      };
    }
    const urlInfo = await this.getUrlParams();
    const {headers, baseUrl, apiKey} = urlInfo;
    if (!baseUrl || !apiKey || baseUrl === "" || apiKey === "") {
      return {
        error: "Chưa cấu hình GetFly",
        data: []
      };
    }

    const url = `${baseUrl}/api/v3/account/`;

    const bodyData = await this.getBodyData(customerData);

    try {
      console.log(bodyData);
      const res = await axios.post(url, bodyData, {
        headers
      });
      const {data} = res;
      if (data.code && data.code === 402 && data.accounts && data.accounts.length > 0) {
        console.log("Data accounts:", data.accounts);
        const {account_id} = data.accounts[0];
        // const gfCustomerRes = this.getCustomer(account_id);

        //Update to getfly
        const updateUrl = `${baseUrl}/api/v3/account/${account_id}`;
        const updateRes = await axios.put(updateUrl, bodyData, {
          headers
        });
        const updateData = updateRes.data;
        const updateCode = updateRes.status;
        console.log("Update gf:", updateData, updateCode);
        if (updateCode !== 200) {
          return {
            error: (updateData && updateData.message) ? updateData.message : "Lỗi dữ liệu GetFly",
            updateData
          }
        }
        return {
          data: {
            account_id
          }
        }
      } else if (!data.code || (data.code !== 200 && data.code !== 201) || data.account_id == null) {
        return {
          error: data.message ? data.message : "Lỗi dữ liệu GetFly",
          data
        }
      } else {
        return {
          data: data
        }
      }
    } catch (e) {
      console.log("getFlyService:createCustomer:Error", e);
      return {
        error: e.message,
        data: []
      };
    }
  },

  async getBodyData(customerData) {
    //Customer province and district
    let provinceId = null;
    let districtId = null;
    if (customerData.city) {
      let cityData = await require("../data/province/city.json");
      const [key, name] = customerData.city.split("|");
      if (cityData[key]) {
        provinceId = cityData[key]['gfId'] ? cityData[key]['gfId'] : null;
      }
      if (customerData.district) {
        try {
          const [districtKey, districtName] = customerData.district.split("|");
          let districtData = await require(`../data/district/${key}.json`);
          if (districtData[districtKey] && districtData[districtKey]['gfId']) {
            districtId = districtData[districtKey]['gfId'];
          }
        } catch (e) {
          console.log(e);
        }
      }
      console.log("GF Province | District: ", provinceId, districtId);
    }

    const body = {
      account: {
        "account_name": customerData.fullname,
        "phone_office": customerData.mobile,
        "email": customerData.email,
        "billing_address_street": customerData.address,
        "account_source": "5",
        "country_id": 1,
        "province_id": provinceId ? parseInt(provinceId) : null,
        "district_id": districtId ? parseInt(districtId) : null,
      },
      referer: {
        "utm_source": "https://vietlifenano.vn",
        "utm_campaign": "NGMK- Website"
      },
    };

    console.log(body);
    return  body;
  },

  async updateCustomer(account_id, customerData) {
    const bodyData = await this.getBodyData(customerData);
    const urlInfo = await this.getUrlParams();
    const {headers, baseUrl, apiKey} = urlInfo;
    if (!baseUrl || !apiKey || baseUrl === "" || apiKey === "") {
      return {
        error: "Chưa cấu hình GetFly",
        data: []
      };
    }

    const updateUrl = `${baseUrl}/api/v3/account/${account_id}`;
    const updateRes = await axios.put(updateUrl, bodyData, {
      headers
    });
    const updateData = updateRes.data;
    const updateCode = updateRes.status;
    console.log("Update gf:", updateData, updateCode);
    if (updateData.code !== 200) {
      return {
        error: (updateData && updateData.message) ? updateData.message : "Lỗi dữ liệu GetFly",
        updateData
      }
    }

    return {
      data: updateData
    }
  },

  async getCustomer(accountId) {
    console.log("getCustomer", accountId);
    if (!accountId) {
      return {
        error: "Chua co du lieu get fly",
        data: []
      };
    }
    const urlInfo = await this.getUrlParams();
    const {headers, baseUrl, apiKey} = urlInfo;
    if (!baseUrl || !apiKey || baseUrl === "" || apiKey === "") {
      return {
        error: "Chưa cấu hình GetFly",
        data: []
      };
    }
    const url = `${baseUrl}/api/v3/account/${accountId}`;
    try {
      const {data} = await axios.get(url, {
        headers
      });
      console.log("getCustomerResponse", data);
      return {
        error: data.message ? data.message : null,
        data
      };
    } catch (e) {
      console.log(e);
      return {
        error: "Error data",
        data: []
      };
    }
  },

  async searchCustomer(q) {
    console.log("searchCustomer", q);
    if (!q) {
      return {
        error: "Thiếu mobile hoac email",
        data: []
      };
    }

    const urlInfo = await this.getUrlParams();

    console.log("urlInfo", urlInfo);
    const {headers, baseUrl, apiKey} = urlInfo;

    if (!baseUrl || !apiKey || baseUrl === "" || apiKey === "") {
      return {
        error: "Chưa cấu hình GetFly",
        data: []
      };
    }

    const params = {
      q
    };

    const url = `${baseUrl}/api/v3/accounts`;
    console.log(url, headers, params);
    try {
      const {data} = await axios.get(url, {
        params,
        headers
      }).catch(e => {
        console.error(e);
        throw e;
      });
      return {
        data
      };
    } catch (e) {
      console.log(e);
      return {
        error: "Error data",
        data: []
      };
    }
  }
});
