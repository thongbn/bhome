import {Combobox, ComboboxOption} from '@strapi/design-system/Combobox';
import React from 'react';
import cityData from './city/tinh_tp.json';

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

  const setValue = (value) => {
    const arg = {
      target: {
        name,
        value: value,
      },
    };
    onChange(arg);
  };

  const isValueInData = (v) => {
    if (!v || v == "") {
      return false;
    }
    const [code, name] = v.split("|");
    return !!cityData[code];
  };

  return (
    <Combobox id={name}
              name={name}
              placeholder={placeholder}
              label={label || name}
              hint={hint}
              value={isValueInData(value) ? value : null}
              onChange={setValue}>
      {Object.entries(cityData).map((obj) => {
        return <ComboboxOption key={`city${obj[0]}`} value={`${obj[0]}|${obj[1].name}`}>{obj[1].name}</ComboboxOption>
      })}
    </Combobox>
  );
};

export default Field;
