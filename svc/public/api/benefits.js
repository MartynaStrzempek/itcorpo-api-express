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
  const result = await csv().fromFile(path.resolve(__dirname, `../../../data-imports/benefits-DE.csv`));
  const result_ES = await csv().fromFile(path.resolve(__dirname, `../../../data-imports/benefits-ES.csv`));
  return [...result, ...result_ES];
}

export const getBenefitsFromJsonFile = async () => {
  // TODO!!!!
  const fileReader = new FileReader();
  const result = await fileReader.getContent(path.resolve(__dirname, `../../../data-imports/benefits-DE.json`));
  return result;
}

export const getMergeBenefits = async () => {
  const benefitsFromDB = await getBenefits();
  const benefitsFromFile = await getBenefitsFromFile();

  benefitsFromFile.forEach((benefit, idx) => {
    const modifiedBenefit = { ...benefit, beneficiary: { name: benefit.name, email: benefit.email } };
    benefitsFromFile[idx] = modifiedBenefit;
    delete modifiedBenefit.age;
    delete modifiedBenefit.email;
  });

  return [...benefitsFromDB, ...benefitsFromFile];
};

export const getBenefitById = async (id) => {
  const mergedBeneftis = await getMergeBenefits();
  return mergedBeneftis.find(benefit => benefit.id === id);
}