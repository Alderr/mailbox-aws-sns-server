const EventDataModel = require('../models/eventDataModel');

const saveEventData = (message) => {

  const campaignEventDataId = message.mail.tags['campaign-event-data-id'][0];

    EventDataModel.findById(campaignEventDataId)
        .then((data) => {
            if (data) {
                console.log(data.eventType);
                return saveEventType(data, message);
            }
            else {
                return Promise.reject('Nope.');
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

const saveEventType = (eventDataCampaign, message) => {

    const eventType = message.eventType.toLowerCase();
    const email = message.mail.destination[0];

    if (eventDataCampaign[eventType]) {

      if (eventType === 'click') {

        return saveClickEvent(eventDataCampaign, message, email);

      }

      eventDataCampaign[eventType]['emails'] = [...eventDataCampaign[eventType]['emails'], email];
      return eventDataCampaign.save();

    }

    else {
      return Promise.reject('Nope. no such event type');
    }
}

const saveClickEvent = (eventDataCampaign, message, email) => {
  console.log(message.click.timestamp);
  console.log(message.click.link);
  console.log('-----------message click?---------------');
  // let newClickEvent = {
  //   email,
  //   clickEvents: [{ timestamp: message.click.timestamp[0], link: message.click.link }]
  // };

  // if (true){
  //   eventDataCampaign[eventType]['emails'].select({email: email}).exec()
  //   .then(data => {
  //     console.log('--------DATA-----------');
  //     console.log(data);
  //   });
  // }
  //
  // else {
  //   // eventDataCampaign[eventType]['emails'] = [...eventDataCampaign[eventType]['emails'], email];
  //   // return eventDataCampaign.save();
  //
  //   return 'lol';
  // }


  let alreadySavedEmail = eventDataCampaign['click']['emails'].find(obj => {
    return obj.email === email;
  });


  console.log(alreadySavedEmail);
  console.log('-----------savedEmail?---------------');

  if (alreadySavedEmail) {
    let newClickEvent = {
       timestamp: message.click.timestamp,
       link: message.click.link
    };

    alreadySavedEmail.clickEvents = [...alreadySavedEmail.clickEvents, newClickEvent];
    return eventDataCampaign.save();
  }

  else {

        let newEmail = {
      email: email,
      clickEvents: [{
         timestamp: message.click.timestamp,
         link: message.click.link
      }]
    };

      eventDataCampaign['click']['emails'] = [...eventDataCampaign['click']['emails'], newEmail];
      return eventDataCampaign.save();

  }


}

module.exports = { saveEventData };
