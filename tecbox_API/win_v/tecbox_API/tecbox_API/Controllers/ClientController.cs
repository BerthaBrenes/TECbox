/* ----------------------------------------------
 * File: ClientController.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.0
 * last edited by: @estalvgs1999 [25/03/2020]
 *
 * Description: Rest API to control client 
 * services. It allows to enter, validate, edit 
 * and delete clients.
 *
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using tecbox_API.Models;

namespace tecbox_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "GET, PUT, POST, DELETE, OPTIONS")]
    public class ClientController : ApiController
    {
        private static string filePath = "App_Data/_clients.json";
        private List<Client> clientList = Util.ReadListFromFile<Client>(filePath);


        // GET api/v1/clients
        [HttpGet]
        [Route("api/v1/clients")]
        public List<Client> GetAllClients()
        {
            List<Client> protectedList = new List<Client>();

            // Hides password when sending to user
            foreach (var client in clientList)
            {
                client.Password = null;
                protectedList.Add(client);
            }

            return protectedList;
        }


        // GET api/v1/clients/{id}
        [HttpGet]
        [Route("api/v1/clients/{id}")]
        public HttpResponseMessage GetClient(string id)
        {
            Client requestClient = clientList.Find(client => client.Id.Number == id);

            if (requestClient == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            requestClient.Password = null; // Hides password when sending to user
            return Request.CreateResponse(HttpStatusCode.OK, requestClient);
        }


        // GET api/v1/clients/login
        [HttpGet]
        [Route("api/v1/clients/login")]
        public HttpResponseMessage LogIn([FromBody] Client data)
        {
            Client thisClient = clientList.Find(client => client.VerifyUser(data.Username,data.Password));
            if (thisClient == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.AccessDeniedMessage);

            thisClient.Password = null; // Hides password when sending to user
            return Request.CreateResponse(HttpStatusCode.OK, thisClient); 
        }


        // POST api/v1/clients
        [HttpPost]
        [Route("api/v1/clients")]
        public HttpResponseMessage AddClient([FromBody]Client newClient)
        {
            if (clientList.Exists(client => client.Id.Number.Equals(newClient.Id.Number)))
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingObjectMessage);

            else if (clientList.Exists(client => client.Username.Equals(newClient.Username)))
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingUsernameMessage);

            else if (clientList.Exists(client => client.Email.Equals(newClient.Email)))
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingEmailMessage);

            clientList.Add(newClient);
            Util.WriteListInFile<Client>(clientList, filePath);

            newClient.Password = null; // Hides password when sending to user
            return Request.CreateResponse(HttpStatusCode.Created, newClient);
        }


        // PUT api/v1/clients/{id}
        [HttpPut]
        [Route("api/v1/clients/{id}")]
        public HttpResponseMessage EditClient(string id, [FromBody]Client editedClient)
        {
            Client requestClient = clientList.Find(client => client.Id.Number.Equals(id));
            
            if (requestClient == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            // If the edited object does not maintain the key attributes, it is verified that they are valid
            if (! requestClient.KeyConditions(editedClient) && ! editedClient.IsNullKey())
            {
                if (clientList.Exists(client => client.Id.Number.Equals(editedClient.Id.Number)))
                    return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingIDMessage);

                else if (clientList.Exists(client => client.Username.Equals(editedClient.Username)))
                    return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingUsernameMessage);
                
                else if (clientList.Exists(client => client.Email.Equals(editedClient.Email)))
                    return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingEmailMessage);
            }

            

            // So if the object doesn't violate the constraints it can be modified
            int productIndex = clientList.IndexOf(requestClient);

            requestClient.EditClient(editedClient);
            clientList[productIndex] = requestClient;

            Util.WriteListInFile(clientList, filePath);

            requestClient.Password = null; // Hides password when sending to user
            return Request.CreateResponse(HttpStatusCode.OK, requestClient);

        }


        // DELETE api/v1/clients/{id}
        [HttpDelete]
        [Route("api/v1/clients/{id}")]
        public HttpResponseMessage RemoveClient(string id)
        {
            Client requestClient = clientList.Find(client => client.Id.Number.Equals(id));

            if (requestClient == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            clientList.Remove(requestClient);
            Util.WriteListInFile<Client>(clientList, filePath);
            return Request.CreateResponse(HttpStatusCode.OK, Util.DeletedMessage);
        }

    }
}
