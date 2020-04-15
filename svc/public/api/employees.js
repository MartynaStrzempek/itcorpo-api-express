import axios from "axios"
import { EMPLOYEES_SVC_URL} from './config';

export const getEmployee = async (id) => {
  const res = await axios.get(`${EMPLOYEES_SVC_URL}/employees/${id}`)
  return res.data
}
