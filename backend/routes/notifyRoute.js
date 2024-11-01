import express from 'express';
import { Notify } from '../models/notifyModel.js';

const router = express.Router();

//Route for Notification
router.post('/', async (request, response) => {
    try {
      if (
        !request.body.userID ||
        !request.body.actorID ||
        !request.body.actionDetail
      ) {
        return response.status(400).send({
          message: 'Send all required fields: UserID, ActorID, Action Details',
        });
      }
      else{
        const newNotify = {
            userID: request.body.userID,
            actorID: request.body.actorID,
            actionDetail: request.body.actionDetail
          };
          const notify = await Notify.create(newNotify);

          return response.status(201).send(notify);
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

//Route for retrieve list notifications by user id
router.get('/:user_id', async (request, response) => {
    try {
      const { user_id } = request.params;
  
      const notify = await Notify.findOne({ user_id });
  
      return response.status(200).json(notify);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });


export default router;