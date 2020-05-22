/* ----------------------------------------------
 * File: SellerController.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.0
 * last edited by: @estalvgs1999 [26/03/2020]
 *
 * Description: Rest API to control seller 
 * services. It allows to enter, validate, edit 
 * and delete sellers.
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
    public class SellerController : ApiController
    {
        private static string filePath = "App_Data/_sellers.json";
        private List<Seller> sellerList = Util.ReadListFromFile<Seller>(filePath);


        // GET api/v1/sellers
        [HttpGet]
        [Route("api/v1/sellers")]
        public List<Seller> GetAllSellers()
        {
            return sellerList;
        }


        // GET api/v1/sellers/?sellerId={id}
        [HttpGet]
        [Route("api/v1/sellers/")]
        public HttpResponseMessage GetSeller([FromUri] string sellerId)
        {
            Seller requestSeller = sellerList.Find(seller => seller.Id.Number.Equals(sellerId));

            if (requestSeller == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            return Request.CreateResponse(HttpStatusCode.OK, requestSeller);
        }


        // POST api/v1/sellers
        [HttpPost]
        [Route("api/v1/sellers")]
        public HttpResponseMessage AddSeller([FromBody] Seller newSeller)
        {
            if (sellerList.Exists(seller => seller.Name.Equals(newSeller.Name)))
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingObjectMessage);

            sellerList.Add(newSeller);
            Util.WriteListInFile<Seller>(sellerList, filePath);
            return Request.CreateResponse(HttpStatusCode.Created, newSeller);
        }


        // PUT api/v1/sellers/?sellerId={id}
        [HttpPut]
        [Route("api/v1/sellers/")]
        public HttpResponseMessage EditSeller([FromUri] string sellerId, [FromBody]Seller editedSeller)
        {
            Seller requestSeller = sellerList.Find(seller => seller.Id.Number.Equals(sellerId));
            if (requestSeller == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            int sellerIndex = sellerList.IndexOf(requestSeller);

            requestSeller.EditSeller(editedSeller);
            sellerList[sellerIndex] = requestSeller;
            Util.WriteListInFile(sellerList, filePath);
            return Request.CreateResponse(HttpStatusCode.OK, requestSeller);
        }


        // DELETE api/v1/sellers/?sellerId={id}
        [HttpDelete]
        [Route("api/v1/sellers/")]
        public HttpResponseMessage RemoveSeller([FromUri] string sellerId)
        {
            Seller requestSeller = sellerList.Find(seller => seller.Id.Number.Equals(sellerId));

            if (requestSeller == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            sellerList.Remove(requestSeller);
            Util.WriteListInFile<Seller>(sellerList, filePath);
            return Request.CreateResponse(HttpStatusCode.OK, Util.DeletedMessage);
        }
    }
}
