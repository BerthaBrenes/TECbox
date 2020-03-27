/* ----------------------------------------------
 * File: OfficeController.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.0
 * last edited by: @estalvgs1999 [26/03/2020]
 *
 * Description: Rest API to control offices 
 * services. It allows to enter, validate, edit 
 * and delete offices.
 *
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using tecbox_API.Models;

namespace tecbox_API.Controllers
{
    [EnableCors(origins: "http://localhost:8100", headers: "*", methods: "GET, PUT, POST, DELETE, OPTIONS")]
    public class OfficeController : ApiController
    {
        private static string filePath = "App_Data/_offices.json";
        private List<Office> officeList = Util.ReadListFromFile<Office>(filePath);


        // GET api/v1/offices
        [HttpGet]
        [Route("api/v1/offices")]
        public List<Office> GetAllOffices()
        {
            return officeList;
        }


        // GET api/v1/offices/{id}
        [HttpGet]
        [Route("api/v1/offices/{id}")]
        public HttpResponseMessage GetOffice(int id)
        {
            Office requestOffice = officeList.Find(office => office.Id.Equals(id));

            if (requestOffice == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            return Request.CreateResponse(HttpStatusCode.OK, requestOffice);
        }


        // POST api/v1/offices
        [HttpPost]
        [Route("api/v1/offices")]
        public HttpResponseMessage AddOffice([FromBody]Office newOffice)
        {
            if (officeList.Exists(office => office.Name.Equals(newOffice.Name)))
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingObjectMessage);

            newOffice.SetId();
            officeList.Add(newOffice);
            Util.WriteListInFile<Office>(officeList, filePath);
            return Request.CreateResponse(HttpStatusCode.Created, newOffice);
        }


        // PUT api/v1/offices/{id}
        [HttpPut]
        [Route("api/v1/offices/{id}")]
        public HttpResponseMessage EditOffice(int id, [FromBody]Office editedOffice)
        {
            Office requestOffice = officeList.Find(office => office.Id.Equals(id));
            if (requestOffice == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            int officeIndex = officeList.IndexOf(requestOffice);

            requestOffice.EditOffice(editedOffice);
            officeList[officeIndex] = requestOffice;
            Util.WriteListInFile(officeList, filePath);
            return Request.CreateResponse(HttpStatusCode.OK, requestOffice);
        }


        // DELETE api/v1/offices/{id}
        [HttpDelete]
        [Route("api/v1/offices/{id}")]
        public HttpResponseMessage RemoveOffice(int id)
        {
            Office requestOffice = officeList.Find(office => office.Id.Equals(id));

            if (requestOffice == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            officeList.Remove(requestOffice);
            Util.WriteListInFile<Office>(officeList, filePath);
            return Request.CreateResponse(HttpStatusCode.OK, Util.DeletedMessage);
        }
    }
}
