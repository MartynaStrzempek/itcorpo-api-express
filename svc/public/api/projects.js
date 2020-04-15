import axios from "axios"
import { PROJECTS_SVC_URL } from './config';
import { getEmployee } from './employees';

export const getProject = (id) => {
  return axios.get(`${PROJECTS_SVC_URL}/projects/${id}`)
    .then(res => res.data)
}

export const getProjectWithEmployees = async (projectId) => {
  let projectData = await getProject(projectId)
  const manager = await getEmployee(projectData.manager)

  const promises = projectData.team.map(({ id }) => getEmployee(id))
  const team = await Promise.all(promises)
  const result = {
    ...projectData,
    team,
    manager
  }

  return result
}
