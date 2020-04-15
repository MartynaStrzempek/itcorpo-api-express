const express = require('express');
const app = express();

import API from './api/index'

// CHAIN OF RESPONSIBILITY // pierwszy który obsłuży - zamyka temat
// middleware // każdy może coś dodać, ale tylko jeden może wysłać odpowiedź

// TODO: npmjs:yargs
const PORT = 4010

app.get('/', (req, res, next) => {
  res.send("facade")
  next() // podaj dalej
})

app.get('/projects/:id', async (req, res, next) => {
  const projectId = req.params.id
  console.log(`received request with projectId:${projectId}`)
  const project = await API.getProjectWithEmployees(projectId)
  res.status(200).send(project)

  next();
})

app.listen(PORT, async () => {
  console.log(`Listening on PORT:${PORT}`)
})

app.get('/benefits', async (req, res, next) => {
  const result = await API.getMergeBenefits();
  res.send(result);
  next();

});

// part 2
app.get('/benefits/:id', async (req, res, next) => {
  const id = req.params.id;
  const result = await API.getBenefitById(id);
  res.send(result);
  next();

});