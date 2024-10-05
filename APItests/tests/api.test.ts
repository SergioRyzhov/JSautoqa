import axios from 'axios';
import { describe, it, expect } from '@jest/globals';
import sdkPostBody from '../data/sdk.fakebody.v1.json';
import sdkSchema from '../data/sdk.schema.v1.json';
import viewContentSettingsBody from '../data/viewContentSettings.fakebody.v1.json';
import viewContentSettingsSchema from '../data/viewContentSettings.schema.v1.json';
import { Validator } from 'jsonschema';

import { sdkUrlbulk, viewContentSettingsUrl, webLayersUrl, ajaxSettingsUrl, viewContentSettingsParams, ajaxSettingsParams } from '../resources/constants';
import { sdkHeaders, viewContentHeaders, weblayersHeaders, ajaxSettingsHeaders } from '../resources/headers';

const validator = new Validator();

describe('Boohoo API Tests', () => {
  it('should successfully send "Sdk" request and get a valid response', async () => {
    const response = await axios.post(sdkUrlbulk, sdkPostBody, { headers: sdkHeaders });

    expect(response.status).toBe(200);
    const validationResult = validator.validate(response.data, sdkSchema);
    expect(validationResult.valid).toBe(true);
  });

  it('should successfully send the "View Content Setting" request and get a valid response', async () => {
    const response = await axios.post(viewContentSettingsUrl, viewContentSettingsBody, { headers: viewContentHeaders, params: viewContentSettingsParams });

    expect(response.status).toBe(200);
    const validationResult = validator.validate(response.data, viewContentSettingsSchema);
    expect(validationResult.valid).toBe(true);
  });

  it('should successfully get info about weblayers', async () => {
    const response = await axios.get(webLayersUrl, { headers: weblayersHeaders });

    expect(response.status).toBe(200);
  });

  it('should successfully get info about ajax settings', async () => {
    const response = await axios.get(ajaxSettingsUrl, { headers: ajaxSettingsHeaders, params: ajaxSettingsParams });

    expect(response.status).toBe(200);
  });
});