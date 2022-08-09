import React, {useEffect, useState} from 'react';
import MapPicker from "react-google-map-picker";
import {request} from '@strapi/helper-plugin';
import {useIntl} from 'react-intl';
import {Stack} from '@strapi/design-system/Stack';

const DefaultLocation = {lat: 10, lng: 106};
const DefaultZoom = 10;

const Field = (props) => {
  const {
    name,
    value,
    attribute,
    onChange
  } = props;

  useEffect(async () => {
    const settings = await request(`/content-manager/single-types/api::setting.setting?fields[0]=googleApiKey`);
    if (settings && settings.googleApiKey) {
      setGoogleApiKey(settings.googleApiKey);
    }
  }, []);

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

  const {formatMessage} = useIntl();
  const [defaultLocation, setDefaultLocation] = useState(value ? JSON.parse(value) : DefaultLocation);
  const [location, setLocation] = useState(value || DefaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [googleApiKey, setGoogleApiKey] = useState(null);

  function handleChangeLocation(lat, lng) {
    const val = {lat: lat, lng: lng};
    setLocation(val);
    setValue(JSON.stringify(val));
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  if (!googleApiKey) {
    return <Stack>
      <i>{formatMessage({id: "googleApiKey.missing"})}</i>
    </Stack>
  }

  return (
    <MapPicker
      name={name}
      defaultLocation={defaultLocation}
      zoom={zoom}
      mapTypeId="roadmap"
      style={{height: '700px'}}
      onChangeLocation={handleChangeLocation}
      onChangeZoom={handleChangeZoom}
      apiKey={googleApiKey} />
  );
};

export default Field;
