const EventDataModel = require('../models/eventDataModel');

const saveEventData = (eventType, customerEmail, campaignEventDataId) => {
  console.log('CAMPAIGNEVENTDATAID, EVENTTYPE, CUSTOMEREMAIL', campaignEventDataId, eventType, customerEmail)

    EventDataModel.findById(campaignEventDataId)
        .then((data) => {
            if (data) {
                console.log(data.eventType);
                return saveEventType(data, eventType, customerEmail);
            }
            else {
                return Promise.reject(response.send('Nope.'));
            }
        })
        .then(res => {
          console.log(res);
          return 'Added event data.';
        })
        .catch((err) => {
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
