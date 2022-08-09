import {Combobox, ComboboxOption} from '@strapi/design-system/Combobox';
import React, {useEffect, useState} from 'react';
import {useCMEditViewDataManager} from '@strapi/helper-plugin';

const Field = (props) => {
  const {
    name,
    value,
    attribute,
    onChange,
  } = props;

  const {
    // All our custom field config are here
    placeholder,
    label,
    hint,
  } = attribute.customFieldConfig || {};

  const {modifiedData, initialData} = useCMEditViewDataManager();
  const [districtData, setDistrictData] = useState({});
  const [districtCode, setDistrictCode] = useState();
  const [cityCode, setCityCode] = useState(initialData[attribute.targetField] || null);

  useEffect(async () => {
    if (initialData[attribute.targetField]) {
      await onChangeCityCode(initialData[attribute.targetField]);
      setDistrictCode(value);
    }
  }, [initialData]);

  useEffect(async () => {
    if (modifiedData[attribute.targetField] && cityCode !== modifiedData[attribute.targetField]) {
      setDistrictCode(null);
      await onChangeCityCode(modifiedData[attribute.targetField]);
    }
  }, [modifiedData]);

  const setValue = (district) => {
    const arg = {
      target: {
        name,
        value: district,
      },
    };
    setDistrictCode(district);
    onChange(arg);
  };

  const onChangeCityCode = async (city) => {
    const [code, name] = city.split("|");
    if (!code || !name) {
      return;
    }

    try {
      let data = await import(`./district/${code}.json`);
      setCityCode(city);
      setDistrictData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const isValueInData = (v) => {
    if (!v || v == "") {
      return false;
    }
    const [code, name] = v.split("|");
    return !!districtData[code];
  };

  const renderComboOption = () => {
    let options = [];
    for (const [key, value] of Object.entries(districtData)) {
      if (key === "default") continue;
      options.push(<ComboboxOption
        key={`district${key}`}
        value={`${key}|${value.name}`}>
        {value.name}
      </ComboboxOption>);
    }
    return options;
  };

  return (
    <Combobox id={name}
              name={name}
              placeholder={placeholder}
              label={label || name}
              hint={hint}
              value={isValueInData(value) ? value : null}
              onChange={setValue}>
      {renderComboOption()}
    </Combobox>
  );
};

export default Field;
