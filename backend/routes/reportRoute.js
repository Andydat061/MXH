import express from 'express';
import { Report } from '../models/reportModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
      if (
        !request.body.articleID ||
        !request.body.userID ||
        !request.body.reportDetail
      ) {
        return response.status(400).send({
          message: 'Send all required fields: article, user, report detail',
        });
      }
      else{
        const newReport = {
            articleID: request.body.articleID,
            userID: request.body.userID,
            reportDetail: request.body.reportDetail
          };
          const report = await Report.create(newReport);

          return response.status(201).send(report);
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Report.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Report not found' });
      }
  
      return response.status(200).send({ message: 'Report deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  router.get('/article/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Report.find({articleID: id});
  
      return response.status(200).json({
        count: result.length,
        data: result,
        });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.get('/', async (request, response) => {
    try {
  
      const result = await Report.find({});
  
      return response.status(200).json({
        count: result.length,
        data: result,
        });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Report.findById({id});
  
      return response.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
