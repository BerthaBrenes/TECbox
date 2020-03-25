/* ----------------------------------------------
 * File: ProductController.cs
 * Dev by: @BerthaBrenes @estalvgs1999
 * Project: TECbox API
 * version: 3.0
 * last edited by: @estalvgs1999 [25/03/2020]
 *
 * Description: Rest API to control product 
 * services. Products represent what tecbox 
 * sells or buys.
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
    
    [EnableCors(origins: "http://localhost:8100", headers: "*", methods: "GET, PUT, POST, DELETE, OPTIONS")]
    public class ProductController : ApiController
    {

        private static string filePath = "App_Data/_products.json";
        private List<Product> productList = Util.ReadListFromFile<Product>(filePath);


        // GET api/v1/products
        // Endpoint that allows consulting all the products registered in the application
        [HttpGet]
        [Route("api/v1/products")]
        public List<Product> GetAllProducts()
        {
            return productList;
        }


        // GET api/v1/products/:id
        // Endpoint that allows consulting a product registered in the application.
        [HttpGet]
        [Route("api/v1/products/{id}")]
        public HttpResponseMessage GetProduct(string id)
        {
            Product requestProduct = productList.Find(product => product.BarCode.Equals(id));

            if (requestProduct == null) 
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);
                
            return Request.CreateResponse(HttpStatusCode.OK, requestProduct);
        }


        // POST api/v1/products
        // Endpoint that allows creating a product in the application.
        [HttpPost]
        [Route("api/v1/products")]
        public HttpResponseMessage AddProduct([FromBody]Product newProduct)
        {
            if (productList.Exists(product => product.BarCode.Equals(newProduct.BarCode)))
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingObjectMessage);

            productList.Add(newProduct);
            Util.WriteListInFile<Product>(productList,filePath);
            return Request.CreateResponse(HttpStatusCode.Created, newProduct);
        }


        // PUT api/v1/products/:id
        // Endpoint that allows to edit a product in the application.
        [HttpPut]
        [Route("api/v1/products/{id}")]
        public HttpResponseMessage EditProduct(string id, [FromBody]Product editedProduct)
        {
            Product requestProduct = productList.Find(product => product.BarCode.Equals(id));
            if (requestProduct == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            int productIndex = productList.IndexOf(requestProduct);
            productList[productIndex] = editedProduct;
            Util.WriteListInFile(productList, filePath);
            return Request.CreateResponse(HttpStatusCode.OK, editedProduct);
        }


        // DELETE api/v1/products/id
        // End point that allows you to delete a product in the application.
        [HttpDelete]
        [Route("api/v1/products/{id}")]
        public HttpResponseMessage RemoveProduct(string id)
        {
            Product requestProduct = productList.Find(product => product.BarCode.Equals(id));

            if (requestProduct == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);
            
            productList.Remove(requestProduct);
            Util.WriteListInFile<Product>(productList,filePath);
            return Request.CreateResponse(HttpStatusCode.OK, Util.DeletedMessage);
        }

    }
}