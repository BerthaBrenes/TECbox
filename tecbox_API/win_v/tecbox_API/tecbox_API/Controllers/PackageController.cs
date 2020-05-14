/* ----------------------------------------------
 * File: ClientController.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.0
 * last edited by: @estalvgs1999 [26/03/2020]
 *
 * Description: Rest API to control package 
 * services. It allows to enter, validate, edit 
 * and delete packages.
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
    [EnableCors(origins: "*", headers: "*", methods: "GET, PUT, POST, DELETE, OPTIONS")]
    public class PackageController : ApiController
    {
        private static string filePath = "App_Data/_packages.json";
        private List<Package> packageList = Util.ReadListFromFile<Package>(filePath);
        List<Package> del_list = new List<Package>();


        // GET api/v1/packages
        [HttpGet]
        [Route("api/v1/packages")]
        public List<Package> GetAllPackages()
        {
            return packageList;
        }


        // GET api/v1/packages/{id}
        [HttpGet]
        [Route("api/v1/packages/{id}")]
        public HttpResponseMessage GetPackage(string id)
        {
            Package requestPackage = packageList.Find(package => package.TrackId.Equals(id));

            if (requestPackage == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            return Request.CreateResponse(HttpStatusCode.OK, requestPackage);
        }


        // POST api/v1/packages
        [HttpPost]
        [Route("api/v1/packages")]
        public HttpResponseMessage AddPackage([FromBody]Package newPackage)
        {
            if (packageList.Exists(package => package.TrackId.Equals(newPackage.TrackId)))
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingObjectMessage);

            packageList.Add(newPackage);
            Util.WriteListInFile<Package>(packageList, filePath);
            return Request.CreateResponse(HttpStatusCode.Created, newPackage);
        }


        // PUT api/v1/packages/{id}
        [HttpPut]
        [Route("api/v1/packages/{id}")]
        public HttpResponseMessage EditPackage(string id, [FromBody]Package editedPackage)
        {
            Package requestPackage = packageList.Find(package => package.TrackId.Equals(id));

            if (requestPackage == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            int packageIndex = packageList.IndexOf(requestPackage);
            
            requestPackage.EditPackage(editedPackage);
            packageList[packageIndex] = requestPackage;

            Util.WriteListInFile(packageList, filePath);
            return Request.CreateResponse(HttpStatusCode.OK, requestPackage);
        }


        // DELETE api/v1/packages/{id}
        [HttpDelete]
        [Route("api/v1/packages/{id}")]
        public HttpResponseMessage RemovePackage(string id)
        {
            Package requestPackage = packageList.Find(package => package.TrackId.Equals(id));

            if (requestPackage == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            packageList.Remove(requestPackage);
            Util.WriteListInFile<Package>(packageList, filePath);
            return Request.CreateResponse(HttpStatusCode.OK, Util.DeletedMessage);
        }
    }
}
