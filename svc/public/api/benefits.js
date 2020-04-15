import axios from "axios"
import { BENEFITS_SVC_URL } from './config';
import { FileReader } from '../../../fileReader';
const path = require('path');
const csv = require('csvtojson')

const getBenefits = async () => {
  const { data } = await axios.get(`${BENEFITS_SVC_URL}/benefits`);
  return data;
}

export const getBenefitsFromFile = async () => {
  const result_DE = await csv().fromFile(path.resolve(__dirname, `../../../data-imports/benefits-DE.csv`));
  const result_ES = await csv().fromFile(path.resolve(__dirname, `../../../data-imports/benefits-ES.csv`));
  const result = [...result_DE, ...result_ES];
  return result;
}

export const getBenefitsFromJsonFile = async () => {
  // TODO!!!!
  const fileReader = new FileReader();
  const result = await fileReader.getContent(path.resolve(__dirname, `../../../data-imports/benefits-DE.json`));
  return result;
}