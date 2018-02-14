const EventDataModel = require('../models/eventDataModel');

const saveEventData = (eventType, customerEmail, campaignEventDataId) => {
  console.log('CAMPAIGNEVENTDATAID, EVENTTYPE, CUSTOMEREMAIL', campaignEventDataId, eventType, customerEmail)

    EventDataModel.findById(campaignEventDataId)
        .then((data) => {
            if (data) {
                console.log(data.eventType);
                saveEventType(data, eventType, customerEmail);
                return data.save();
            }
            else {
                response.send('Nope.');
                return Promise.reject(response.send('Nope.'));
            }
        })
        .then(res => {
          console.log(res);
          return response.status(201).send('Added event data.');
        })
        .catch((err) => {
            response.send(err);
            console.log(err);
        });
};

const saveEventType = (eventDataCampaign, eventType, email) => {

    if (eventDataCampaign[eventType]) {

      eventDataCampaign[eventType]['emails'] = [...eventDataCampaign[eventType]['emails'], email];
      return eventDataCampaign.save();

    }

    else {
      return Promise.reject(response.send('Nope.'));
    }
}
module.exports = { saveEventData };
