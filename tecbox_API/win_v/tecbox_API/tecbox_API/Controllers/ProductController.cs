/* ----------------------------------------------
 * File: ProductController.cs
 * Dev by: @BerthaBrenes @estalvgs1999
 * Project: TECbox API
 * version: 2.1
 * last edited by: @estalvgs1999 [21/03/2020]
 *
 * Description: Rest API to control product 
 * services. Products represent what tecbox 
 * sells or buys.
 *
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using tecbox_API.Models;

namespace tecbox_API.Controllers
{
    /// <summary>
    /// Rest API to control product services.
    /// </summary>
    [EnableCors(origins: "http://localhost:8100", headers: "*", methods: "GET, PUT, POST, DELETE, OPTIONS")]
    public class ProductController : ApiController
    {

        private static readonly string _path = Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory, "App_Data/_products.json");

        private List<Product> productList = ReadListFromFile();
        private object notFoundError = JsonConvert.DeserializeObject("{\"Code\":\"404\",\"Message\":\"The product was not found in tecbox\"}");
        private object deletedSuccess = JsonConvert.DeserializeObject("{\"Code\":\"200\",\"Message\":\"The product was successfully removed\"}");


        // GET api/v1/products
        /// <summary>
        /// Endpoint that allows consulting all the products registered in the application
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/v1/products")]
        public List<Product> GetAllProducts()
        {
            return productList;
        }


        // GET api/v1/products/:id
        /// <summary>
        /// Endpoint that allows consulting a product registered in the application.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/v1/products/{id}")]
        public HttpResponseMessage GetProduct(string id)
        {
            Product requestProduct = productList.Find(product => product.BarCode.Equals(id));

            if (requestProduct == null) 
                return Request.CreateResponse(HttpStatusCode.NotFound, notFoundError);
                
            return Request.CreateResponse(HttpStatusCode.OK, requestProduct);
        }


        // POST api/v1/products
        /// <summary>
        /// Endpoint that allows creating a product in the application.
        /// </summary>
        /// <param name="newProduct"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/v1/products")]
        public HttpResponseMessage AddProduct([FromBody]Product newProduct)
        {
            productList.Add(newProduct);
            WriteListInFile(productList);
            return Request.CreateResponse(HttpStatusCode.OK, newProduct);
        }


        // PUT api/v1/products/:id
        /// <summary>
        /// Endpoint that allows to edit a product in the application.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        [HttpPut]
        [Route("api/v1/products/{id}")]
        public void EditProduct(string id, [FromBody]Product value)
        {
            // TODO: Edit product given by his id
        }


        // DELETE api/v1/products/id
        /// <summary>
        /// End point that allows you to delete a product in the application.
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete]
        [Route("api/v1/products/{id}")]
        public HttpResponseMessage RemoveProduct(string id)
        {
            Product requestProduct = productList.Find(product => product.BarCode.Equals(id));
            if (requestProduct == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, notFoundError);
            
            productList.Remove(requestProduct);
            WriteListInFile(productList);
            return Request.CreateResponse(HttpStatusCode.OK, deletedSuccess);
        }


        /* ---------------------------------------------
         * Read & Write Functions in JSON Files
         * By @estalvgs1999 
         * --------------------------------------------- */

        // Read the json file and deserialize it in a generic list
        private static List<Product> ReadListFromFile()
        {
            string fileContent = File.ReadAllText(_path);
            return JsonConvert.DeserializeObject<List<Product>>(fileContent);
        }

        // This function receives a generic list and serialize it to the json file
        private static void WriteListInFile(List<Product> productsList)
        {
            string jsonList = JsonConvert.SerializeObject(productsList, Formatting.Indented);
            System.IO.File.WriteAllText(_path, jsonList);
        }

    }
}