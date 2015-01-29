/**
 * Created by victorcoustenoble on 08/10/14.
 */
var Joi = require('joi');
var client_cas = require('./cassandra');
var fc = require('./functions');
var cassandra =  require('cassandra-driver');

var serviceController = {};


//------------------------------------------------------------------------------------------------------

serviceController.getServices = {
  handler: function(req, reply) {

    cquery = "select * from services";

    client_cas.execute(cquery, function (err, result) {

      if (typeof result === 'undefined')
        return reply('No service found.').code(404);
      else
      {
          AlljsonServices='[';

          for (var i = 0; i < result.rows.length; i++) {

            service = result.rows[i];

            jsonService = '{ '
            + '"service_id" : "'+ service.service_id + '", '
            + '"title" : "'+ service.title + '", '
            + '"description" : "'+ service.description + '", '
            + '"date_creation" : "'+ service.date_creation + '", '
            + '"duration" : "'+ service.duration + '", '
            + '"type" : "'+ service.type + '", '
            + '"usage_date" : "'+ service.usage_date + '", '
            + '"username" : "'+ service.username + '"},';

            AlljsonServices=AlljsonServices+jsonService;
          }

          AlljsonServices=AlljsonServices.slice(0, - 1)+']';

          return reply(AlljsonServices);
      }
    }
    )
  }
};

//------------------------------------------------------------------------------------------------------

serviceController.getServiceId = {
    handler: function(req, reply) {

            cquery = "select * from services where service_id="+req.params.id;

            client_cas.execute(cquery, function (err, result) {

              if (typeof result === 'undefined')
                return reply('No service found for id : '+req.params.id).code(404);
              else {

                  if (result.rows.length === 0)
                      return reply('No service found for id : '+req.params.id).code(404);
                  else
                  {
                    AlljsonServices='[';

                    for (var i = 0; i < result.rows.length; i++) {

                      service = result.rows[i];

                      jsonService = '{ '
                      + '"service_id" : "'+ service.service_id + '", '
                      + '"title" : "'+ service.title + '", '
                      + '"description" : "'+ service.description + '", '
                      + '"date_creation" : "'+ service.date_creation + '", '
                      + '"duration" : "'+ service.duration + '", '
                      + '"type" : "'+ service.type + '", '
                      + '"usage_date" : "'+ service.usage_date + '", '
                      + '"username" : "'+ service.username + '"},';

                      AlljsonServices=AlljsonServices+jsonService;
                    }

                    AlljsonServices=AlljsonServices.slice(0, - 1)+']';

                    return reply(AlljsonServices);
                  }
              }

            })
    },
    validate: {
        params: {
            id: Joi.string().required()
        }
    }
};



//------------------------------------------------------------------------------------------------------

serviceController.postService = {
    handler: function(req, reply) {

        service_id = cassandra.types.uuid();

        cquery = "insert into services (service_id,title,description, date_creation, duration,type) values (?,?,?,?,?,?)";

        client_cas.execute(cquery,[service_id,req.payload.title,req.payload.description,new Date(),req.payload.duration,req.payload.type],

            fc.afterExecution('Error: ', 'Service ' + req.payload.title + ' created with id '+service_id, reply)
        );
    },
    validate: {
      payload: {
            title: Joi.string().required()
            ,description: Joi.string()
            ,duration: Joi.number()
            ,type: Joi.string()
        }
    }
};


//------------------------------------------------------------------------------------------------------

serviceController.updateServiceId = {
  handler: function(req, reply) {

    cquery = "select * from services where service_id="+req.payload.id;

    client_cas.execute(cquery, function (err, result) {

      if (typeof result === 'undefined')
        return reply('No service found.').code(404);
      else {

        if (result.rows.length === 0)
          return reply('No service found for id : '+req.payload.id).code(404);
        else{

          cquery = "insert into services (service_id,usage_date,username) values (?,?,?)";

          client_cas.execute(cquery, [req.payload.id,new Date(),req.payload.user],

          fc.afterExecution('Error: ', 'Service ' +  req.payload.id + ' updated by user ' + req.payload.user, reply)
          )
        }
      }
    }
  )
  },
  validate: {
      payload: {
        id: Joi.string().required()
        ,user: Joi.string().required()
      }
    }
};

//------------------------------------------------------------------------------------------------------

serviceController.deleteService = {
  handler: function(req, reply) {

    cquery = "select * from services where service_id="+req.params.id;

    client_cas.execute(cquery, function (err, result) {

      if (typeof result === 'undefined')
        return reply('No service found.').code(404);
      else {
        cquery = "delete from services where service_id="+req.params.id;

        client_cas.execute(cquery, function (err, result) {
          return reply(true);
        })
      }
    })
  },
  validate: {
    params: {
      id: Joi.string().required()
    }
  }
};



//------------------------------------------------------------------------------------------------------


module.exports = [
    {
      path: '/service/{id}',
      method: 'GET',
      config: serviceController.getServiceId
    },
    {
      path: '/services',
      method: 'GET',
      config: serviceController.getServices
    },
    {
      path: '/service/user',
      method: 'POST',
      config: serviceController.updateServiceId
    },
    {
      path: '/service/create',
      method: 'POST',
      config: serviceController.postService
    },
    {
      path: '/service/delete/{id}',
      method: 'DELETE',
      config: serviceController.deleteService
    }
];
