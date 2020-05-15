/* ----------------------------------------------
 * File: ClientController.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 4.0
 * last edited by: @estalvgs1999 [14/05/2020]
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
        private const string FilePath = "App_Data/_packages.json";
        private readonly List<Package> _packageList = Util.ReadListFromFile<Package>(FilePath);
        List<Package> del_list = new List<Package>();


        // GET api/v1/packages
        [HttpGet]
        [Route("api/v1/packages")]
        public List<Package> GetAllPackages()
        {
            return _packageList;
        }


        // GET api/v1/packages/?packId={id}
        [HttpGet]
        [Route("api/v1/packages/{id}")]
        public HttpResponseMessage GetPackage(string id)
        {
            var requestPackage = _packageList.Find(package => package.TrackId.Equals(id));

            return requestPackage == null ? Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage) : Request.CreateResponse(HttpStatusCode.OK, requestPackage);
        }

        // GET api/v1/packages/report/?routeId={routeId}
        // 
        [HttpGet]
        [Route("api/v1/packages/report")]
        public HttpResponseMessage GetPackagesByRoute([FromUri]int routeId)
        {
            var packagesInRoute = _packageList.FindAll(
                package => package.RouteId.Equals(routeId) && 
                           package.Status.Equals("Listo para Entrega"));
            return Request.CreateResponse(HttpStatusCode.OK, packagesInRoute);
        }

        // POST api/v1/packages
        [HttpPost]
        [Route("api/v1/packages")]
        public HttpResponseMessage AddPackage([FromBody]Package newPackage)
        {
            if (_packageList.Exists(package => package.TrackId.Equals(newPackage.TrackId)))
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingObjectMessage);

            _packageList.Add(newPackage);
            Util.WriteListInFile<Package>(_packageList, FilePath);
            return Request.CreateResponse(HttpStatusCode.Created, newPackage);
        }


        // PUT api/v1/packages/?packId={id}
        [HttpPut]
        [Route("api/v1/packages/{id}")]
        public HttpResponseMessage EditPackage(string id, [FromBody]Package editedPackage)
        {
            Package requestPackage = _packageList.Find(package => package.TrackId.Equals(id));

            if (requestPackage == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            int packageIndex = _packageList.IndexOf(requestPackage);
            
            requestPackage.EditPackage(editedPackage);
            _packageList[packageIndex] = requestPackage;

            Util.WriteListInFile(_packageList, FilePath);
            return Request.CreateResponse(HttpStatusCode.OK, requestPackage);
        }


        // DELETE api/v1/packages/?packId={id}
        [HttpDelete]
        [Route("api/v1/packages/{id}")]
        public HttpResponseMessage RemovePackage(string id)
        {
            Package requestPackage = _packageList.Find(package => package.TrackId.Equals(id));

            if (requestPackage == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            _packageList.Remove(requestPackage);
            Util.WriteListInFile<Package>(_packageList, FilePath);
            return Request.CreateResponse(HttpStatusCode.OK, Util.DeletedMessage);
        }
    }
}
