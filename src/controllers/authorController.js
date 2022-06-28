const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken");


//------------------------regex---------------------------//

let nameRegex = /^[a-zA-Z]{1,20}$/

let emailRegex = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/

let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

//---------------------------------------------------------------//

//...1...Create Author APi.......................................//

//---------------------------------------------------------------//


module.exports.createAuthor = async function (req, res) {
    try {
        let data = req.body
        let { fname, lname, title, password, email } = data

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ Status: false, message: "Please provide all the details 🛑" })
        }
        
        if (!fname || fname == "") {
            return res.status(400).send({ Status: false, message: "Please provide fname 🛑" })
        }
        fname=data.fname=fname.trim()
        if (!nameRegex.test(fname)) {
            return res.status(400).send({ Status: false, message: "Please enter valid fname 🛑" })
        }
        
        if (!lname || lname == "") {
            return res.status(400).send({ Status: false, message: "Please provide lname 🛑" })
        }
        lname=data.lname=lname.trim()
        if (!nameRegex.test(lname)) {
            return res.status(400).send({ Status: false, message: "Please enter valid lname 🛑" })
        }
        
        if (!title || title == "") {
            return res.status(400).send({ Status: false, message: "Please provide title 🛑" })
        }
        title=data.title=title.trim()
        if(title){
            if(!( ["Mr", "Mrs", "Miss"].includes(title))) {
              return res.status(400).send({ Status: false, message: "Please provide valid title 🛑" })
            }
        }

        if (!emailRegex.test(email)) {
            return res.status(400).send({ Status: false, message: "Please enter valid email 🛑" })
        }
        if (email) {
            let checkemail = await authorModel.findOne({ email: email })

            if (checkemail) {
                return res.status(400).send({ Status: false, message: "Please provide another email, this email has been used 🛑" })
            }
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).send({ Status: false, message: "Please provide valid AlphaNumeric password having min character 8 🛑" })
        }

        let savedData = await authorModel.create(data)
        return res.status(201).send({ status : true, msg: savedData })
        
  }
  catch (error) {
    res.status(500).send({ status: false, error: error.message })
  }
}


//......................................................................//

//....7..API for login................................................. //


module.exports.login = async function (req, res) {
  try {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || email == "")
      return res.status(400).send({ Status: false, message: "You have to provide email to login 🛑" })
    else
      email = email.trim()

    if (!password || password == "")
      return res.status(400).send({ Status: false, message: "You have to provide password to login 🛑" })

    let author = await authorModel.findOne({ email: email, password: password });
    if (!author)
      return res.status(401).send({
        status: false,
        msg: "username or the password is not corerct 🛑",
      });

    let token = jwt.sign(
      {
        authorId: author._id
      },

      "functionup-Project-1"
    );

    res.setHeader("x-api-key", token);
    res.status(200).send({ status: true, msg: "Author login successful", token: token });

  }
  catch (error) {
    res.status(500).send({ status: false, error: error.message })
  }
}


//---------------------------------------------------------------//