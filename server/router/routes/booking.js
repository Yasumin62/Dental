'use strict';
        
// var moment = require('moment');
// var a = moment('1999-01-01').locale('en');
// console.log("moment = ", a)

module.exports = (app, db) => {

  app.post('/getDateTimeBooking', async (req, res)=>{
    // let startD = req.body.start;
    // let endD = new Date(req.body.end);
    // endD.setHours(23);
    // console.log(startD, endD);
    db.sequelize.query("SELECT * FROM `calendars`", { type: db.sequelize.QueryTypes.SELECT})
    .then(function(users) {
      // We don't need spread here, since only the results will be returned for select queries
      res.status(200).send(users);
    })

  //   const start = await db.calendar.findAll({where: {
  //     // start: { [db.eq]: startD }
  //     // "start": startD
  //     start: {
  //       $gte: new Date()
  //     }
  //     // "start": {
  //     //   $gte: startD,
  //     //   $lt: endD
  //     // }
  //   }
  // });
    // if(!start) return res.status(200).send("Free All Time.");

    

  })

  app.post('/booking', async (req, res)=>{

    const newBooking = {
      start: req.body.start,
      end: req.body.end,
      title: req.body.title,
      customer: req.body.customer,
      doctor: req.body.doctor
  }

  db.calendar.create(newBooking)
      .then(savedBooking => {
          res.status(200).json({ status: "Success", booking_id: savedBooking.id });
      })
      .catch(err => res.status(500).send(err.message));

    // res.status(200).send("test");

  })


  app.post('/cancle_booking', async (req, res)=>{
    let id = req.body.id;

  await db.calendar.destroy({where: {"id": id}});

  res.status(200).json({ status: "Delete Success."});


  })

  app.post('/edit_booking', async (req, res)=>{
    let id = req.body.id;
    let doctor_name = req.body.doctor;

  await db.calendar.update(
    {doctor: doctor_name},
    {where: {"id": id}}
  )

  res.status(200).json({ status: "Update Success."});


  })

};
