const EventDataModel = require('../models/eventDataModel');

const saveEventData = (eventType, customerEmail, campaignEventDataId) => {
  console.log('CAMPAIGNEVENTDATAID, EVENTTYPE, CUSTOMEREMAIL', campaignEventDataId, eventType, customerEmail)

    // EventDataModel.findById(campaignEventDataId)
    //     .then((data) => {
    //         if (data) {
    //             console.log(data);
    //             // data.campaigns = [...data.campaigns, campaign]
    //             // return data.save();
    //         }
    //         else {
    //             return response.send('Nope.');
    //         }
    //     })
    //     .then(res => {
    //       console.log(res);
    //       return response.status(201).send('Added.');
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
};

module.exports = { saveEventData };
