/* ----------------------------------------------
 * File: RouteController.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.0
 * last edited by: @estalvgs1999 [26/03/2020]
 *
 * Description: Rest API to control routes 
 * services. It allows to enter, validate, edit 
 * and delete routes.
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
    public class RouteController : ApiController
    {
        private static string filePath = "App_Data/_routes.json";
        private List<Route> routeList = Util.ReadListFromFile<Route>(filePath);


        // GET api/v1/routes
        [HttpGet]
        [Route("api/v1/routes")]
        public List<Route> GetAllRoutes()
        {
            return routeList;
        }


        // GET api/v1/routes/{id}
        [HttpGet]
        [Route("api/v1/routes/{id}")]
        public HttpResponseMessage GetRoute(int id)
        {
            Route requestRoute = routeList.Find(route => route.Id.Equals(id));

            if (requestRoute == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            return Request.CreateResponse(HttpStatusCode.OK, requestRoute);
        }


        // POST api/v1/routes
        [HttpPost]
        [Route("api/v1/routes")]
        public HttpResponseMessage AddRoute([FromBody]Route newRoute)
        {
            if (routeList.Exists(route => route.Name.Equals(newRoute.Name)))
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingObjectMessage);

            newRoute.SetID();
            routeList.Add(newRoute);

            Util.WriteListInFile<Route>(routeList, filePath);
            return Request.CreateResponse(HttpStatusCode.Created, newRoute);
        }


        // PUT api/v1/routes/{id}
        [HttpPut]
        [Route("api/v1/routes/{id}")]
        public HttpResponseMessage EditRoute(int id, [FromBody]Route editedRoute)
        {
            Route requestRoute = routeList.Find(route => route.Id.Equals(id));
            if (requestRoute == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            int routeIndex = routeList.IndexOf(requestRoute);

            requestRoute.EditRoute(editedRoute);
            routeList[routeIndex] = requestRoute;

            Util.WriteListInFile(routeList, filePath);
            return Request.CreateResponse(HttpStatusCode.OK, requestRoute);
        }

        // PUT api/v1/routes/{id}/district
        [HttpPut]
        [Route("api/v1/routes/{id}/{district}")]
        public HttpResponseMessage AddDistrict(int id, string district)
        {
            Route requestRoute = routeList.Find(route => route.Id.Equals(id));
            if (requestRoute == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            int routeIndex = routeList.IndexOf(requestRoute);

            requestRoute.AddDistrict(district);
            routeList[routeIndex] = requestRoute;

            Util.WriteListInFile(routeList, filePath);
            return Request.CreateResponse(HttpStatusCode.OK, requestRoute);
        }

        // DELETE api/v1/routes/{id}
        [HttpDelete]
        [Route("api/v1/routes/{id}")]
        public HttpResponseMessage RemoveRoute(int id)
        {
            Route requestRoute = routeList.Find(route => route.Id.Equals(id));

            if (requestRoute == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            routeList.Remove(requestRoute);
            Util.WriteListInFile<Route>(routeList, filePath);
            return Request.CreateResponse(HttpStatusCode.OK, Util.DeletedMessage);
        }
    }
}
