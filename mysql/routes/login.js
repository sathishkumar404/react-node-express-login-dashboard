var express =  require('express');
var router =  express.Router();
var db   = require('../config/db.js');
var bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const passport = require('passport');
var async = require('async');

router.post('/login',(req,res)=>{
	var query = " SELECT * FROM `user` WHERE `email` LIKE '"+req.body.email+"' AND `password` LIKE '"+req.body.password+"' "; 
	db.query(query,function(err,login){
		if(err){
			res.send({status:0})
		}
		else if (login.length==0){
			res.send({status:0})
		}else if(login.length >0)
		{  
			console.log('verified')
            console.log(login[0].id)
              
                                var jwt_payload = '';
                               
                                    jwt_payload = { 
                                    	id: login[0].id, name: login[0].name, phone: login[0].phone, email : login[0].email
                                    };
                              
                                
                                jwt.sign(jwt_payload,'false',(err,token)=>{
                                    if(token){ 
                                    	console.log(token)
                                        res.json({
                                            Message:"Session ID Created",
                                            token: "Bearer " + token,
                                            user_data : {
                                                id: login[0].id, name: login[0].name, phone: login[0].phone, email : login[0].email
                                            }
                                        })
                                    }else{
                                    	console.log(err)
                                        res.json(err)
                                    }
                                    
                                })
     

		}
	})
}) 


//test authendicate function 
router.post('/test', passport.authenticate("jwt", { session: false, failWithError: true }),function(req,res){
	res.send('reg fine')
},function(err, req, res, next) {
	res.json(err)
    }
    );  




router.post("/register",async function (req, res) {

    var validationStatus = true;
    var Errors = [];
    var responseJson = {};

    if (req.body) {  

      
        if (typeof req.body.EmailKey == null || req.body.EmailKey == undefined || req.body.EmailKey == "") {
            Errors.push("Email is empty or incorrect");
            validationStatus = false
        }
        else {
            req.body.EmailKey
        }
        if (typeof req.body.PasswordKey == null || req.body.PasswordKey == undefined || req.body.PasswordKey == "") {
            Errors.push("Password is empty or incorrect");
            validationStatus = false
        }
        else {
            req.body.PasswordKey
        }

        if (typeof req.body.Namekey == null || req.body.Namekey == undefined || req.body.Namekey == "") {
            Errors.push("Name is empty or incorrect");
            validationStatus = false
        }
        else {
            req.body.Namekey
        }
        if (typeof req.body.PhoneNumberKey == null || req.body.PhoneNumberKey == undefined || req.body.PhoneNumberKey == "") {
            Errors.push("Phone is empty or incorrect");
            validationStatus = false
        }
        else {
            req.body.PhoneNumberKey
        }


    }
    else {
        Errors.push("Request Body is empty");
        validationStatus = false
    }
    if (!validationStatus) {
        responseJson.message = "Invalida Request Body";
        responseJson.status = 400;
        responseJson.payload = Errors;
        return res.send(responseJson);

    } else {  
        var checkPhone = await isPresentPhone(req.body.PhoneNumberKey);
    
    	if(!checkPhone){
    		console.log('failed')
    		return  res.send({ status: 0, msg: "Phone No Already Present" });
    	}
        
         var checkEmail = await isPresentEmail(req.body.EmailKey);
         console.log(checkEmail);
    	if(!checkEmail){
    		console.log('email present')
    		return  res.send({ status: 0, msg: "Email Already Present" });
    	}


        var query = "INSERT INTO `user` (`id`, `name`, `email`, `password`, `phone`, `employeeCount`, `created_at`, `active`) VALUES (NULL, '"+req.body.Namekey+"', '"+req.body.EmailKey+"', '"+req.body.PasswordKey+"', '"+req.body.PhoneNumberKey+"', '1', CURRENT_TIMESTAMP, '1')";
        db.query(query, function (err, response) {
            if (err) {
                console.log(err);
                if (err.errno == 1062) {
                    //mysql errno 1062 represent the duplicate entry in the table
                    res.send({ status: 0, msg: err.sqlMessage, data: [] });
                } else {
                    res.send({ status: 0, msg: "Failed", data: [] });

                }
            }
            else {
                 res.json({ 
                 	status:1,
                 	msg:'User Registered'
                 });
            }
        })
    }
})

function isPresentPhone(phone) {


	return new Promise(resolve => {

		var query = "SELECT id FROM `user` WHERE `phone`="+phone+" ";
        console.log(query);
		db.query(query, function (err, data) {
			
			if (err) {
				 resolve(true)
			} else if(data.length ==0){
				console.log('true')
               resolve(true)
			}else { console.log('false')
				 resolve(false)
			}
		});
	})

}



function isPresentEmail(email) { 

	return new Promise(resolve => {

		var query = "SELECT id FROM `user` WHERE `email`= '"+email+"' ";
        console.log(query)
		db.query(query, function (err, response) {
			 console.log(response)
			if (err) {
				 resolve(true)
			} else if(response.length ==0){
				console.log('illa')
               resolve(true)
			}else { 
				console.log('iruku')
				 resolve(false)
			}
		});
	})
}




module.exports =  router;