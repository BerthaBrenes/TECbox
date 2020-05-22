/* ----------------------------------------------
 * File: ClientController.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 5.0
 * last edited by: @estalvgs1999 [16/05/2020]
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
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using tecbox_API.Models;

namespace tecbox_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "GET, PUT, POST, DELETE, OPTIONS")]
    public class PackageController : ApiController
    {
        private const string FilePath = "App_Data/_packages.json";
        private readonly List<Package> _packageList = Util.ReadListFromFile<Package>(FilePath);
        
        
        // GET api/v1/packages
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/v1/packages")]
        public List<Package> GetAllPackages()
        {
            return _packageList;
        }


        // GET api/v1/packages/?packId={id}
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/v1/packages/")]
        public HttpResponseMessage GetPackage([FromUri] string packId)
        {
            var requestPackage = _packageList.Find(package => package.TrackId.Equals(packId));

            return requestPackage == null ? Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage) : Request.CreateResponse(HttpStatusCode.OK, requestPackage);
        }
        
        
        // GET api/v1/packages/report/?routeId={routeId}
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/v1/packages/report")]
        public HttpResponseMessage GetPackagesByRoute([FromUri]int routeId)
        {
            var packagesInRoute = _packageList.FindAll(
                package => package.RouteId.Equals(routeId) && 
                           package.Status.Equals("Listo para Entrega"));
            return Request.CreateResponse(HttpStatusCode.OK, packagesInRoute);
        }
        
        // GET api/v1/packages/report
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/v1/packages/report")]
        public HttpResponseMessage GetDeliveredPackages([FromBody] JObject dates)
        {
            // 1. Get delimiting dates
            DateTime startDate = DateTime.Parse(dates["startDate"].ToString());
            DateTime endDate = DateTime.Parse(dates["endDate"].ToString());
            
            // 2. Filter the "delivered" packages that are in the date range.
            List<Package> deliveredPackages = _packageList.FindAll(pack =>
                pack.Status.Equals("Entregado") && 
                pack.IsOnDateRange(startDate, endDate));
            
            // 3. List the delivery man that delivered the packages. (Only ONE appearance)
            List<string> deliveryManList = new List<string>();
            
            foreach (var pack in deliveredPackages)
            {
                if(!deliveryManList.Contains(pack.DmId))
                    deliveryManList.Add(pack.DmId);
            }
            
            // 4. Create Dictionary {DeliveryMan, Product List}
            var packages = new Dictionary<int,List<Package>>();
            var counter = 0;
            foreach (var deliveryMan in deliveryManList)
            {
                var tmpList = deliveredPackages.Where(pack => pack.DmId == deliveryMan).ToList();
                
                // 5. Sort the list from lowest to highest date.
                tmpList.Sort((p1,p2) => 
                    DateTime.Compare(
                        DateTime.Parse(p1.DeliveryDate), 
                        DateTime.Parse(p2.DeliveryDate))
                    );
                packages.Add(counter,tmpList);
                counter++;
            }
            
            return Request.CreateResponse(HttpStatusCode.OK, packages);
        }
        

        // POST api/v1/packages
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/v1/packages")]
        public HttpResponseMessage AddPackage([FromBody]Package newPackage)
        {
            if (_packageList.Exists(package => package.TrackId.Equals(newPackage.TrackId)))
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingObjectMessage);

            _packageList.Add(newPackage);
            Util.WriteListInFile<Package>(_packageList, FilePath);
            return Request.CreateResponse(HttpStatusCode.Created, newPackage);
        }


        // PUT api/v1/packages/?packId={id}
        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("api/v1/packages/")]
        public HttpResponseMessage EditPackage([FromUri] string packId, [FromBody]Package editedPackage)
        {
            Package requestPackage = _packageList.Find(package => package.TrackId.Equals(packId));

            if (requestPackage == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            int packageIndex = _packageList.IndexOf(requestPackage);
            
            requestPackage.EditPackage(editedPackage);
            _packageList[packageIndex] = requestPackage;

            Util.WriteListInFile(_packageList, FilePath);
            return Request.CreateResponse(HttpStatusCode.OK, requestPackage);
        }


        // DELETE api/v1/packages/?packId={id}
        [System.Web.Http.HttpDelete]
        [System.Web.Http.Route("api/v1/packages/")]
        public HttpResponseMessage RemovePackage([FromUri] string packId)
        {
            Package requestPackage = _packageList.Find(package => package.TrackId.Equals(packId));

            if (requestPackage == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            _packageList.Remove(requestPackage);
            Util.WriteListInFile<Package>(_packageList, FilePath);
            return Request.CreateResponse(HttpStatusCode.OK, Util.DeletedMessage);
        }
    }
}
