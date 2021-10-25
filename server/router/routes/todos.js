'use strict';

module.exports = (app, db) => {
  app.post('/register', async (req, res)=>{
    // console.log("body = ", req.body)
    if(req.body.username == "" || req.body.password == "") return res.status(400).send("user or passowrd is empty.");
    if(req.body.phone == "" || req.body.id_card == "" || req.body.birthdate == "") return res.status(400).send("form empty.");

    const usernameExists = await db.user.findOne({where: {"username": req.body.username}});
    if(usernameExists) return res.status(400).send("A User account with this username already exists");

    //Build the user object to write to database
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        role: "user",
        phone: req.body.phone,
        id_card: req.body.id_card,
        birthdate: req.body.birthdate,
    }

    //Save the new user object, using the User model we defined in Sequelize. Return the new user ID in JSON
    db.user.create(newUser)
        .then(savedUser => {
            res.status(200).json({ status: "Success", new_user_id: savedUser.id });
        })
        .catch(err => res.status(500).send(err.message));
})

app.post('/login', async (req, res)=>{

  const user = await db.user.findOne({
    where: {
      "username": req.body.username, 
      "password": req.body.password
    }
  });
  
  if(!user) return res.status(400).send("Username or Password is not correct");

  res.status(200).json({ status: "Success", data: user});

})

};
