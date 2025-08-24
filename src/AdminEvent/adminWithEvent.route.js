import {Router} from "express"
import { createEventController, deleteEventController, getAllEventsController, getEventByIdController, updateEventController } from "./adminWithEvent.controller";
import auth from "../middleware/authenticatetoken";
const event_router = Router()

event_router.post('/event-create',auth,createEventController);


event_router.delete('/event-delete/:id', auth, deleteEventController);

event_router.patch('/event-update/:id', auth, updateEventController)

event_router.get('/event-get/:id', auth, getEventByIdController);

event_router.get('/event-getAll', auth, getAllEventsController);

export{event_router}