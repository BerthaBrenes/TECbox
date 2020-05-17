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

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json.Linq;
using tecbox_API.Models;

namespace tecbox_API.Controllers
{
    
    [EnableCors(origins: "*", headers: "*", methods: "GET, PUT, POST, DELETE, OPTIONS")]
    public class ProductController : ApiController
    {

        private static string filePath = "App_Data/_products.json";
        private List<Product> productList = Util.ReadListFromFile<Product>(filePath);
        private List<Sale> saleList = Util.ReadListFromFile<Sale>("App_Data/_sales.json");

        // GET api/v1/products
        [HttpGet]
        [Route("api/v1/products")]
        public List<Product> GetAllProducts()
        {
            return productList;
        }


        // GET api/v1/products/{id}
        [HttpGet]
        [Route("api/v1/products/{id}")]
        public HttpResponseMessage GetProduct(string id)
        {
            Product requestProduct = productList.Find(product => product.BarCode.Equals(id));

            if (requestProduct == null) 
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);
                
            return Request.CreateResponse(HttpStatusCode.OK, requestProduct);
        }
        
        // GET api/v1/products/report
        [HttpGet]
        [Route("api/v1/products/bestseller")]
        public HttpResponseMessage GetBestSellers([FromBody] JObject dates)
        {
            // 1. Get delimiting dates
            DateTime startDate = DateTime.Parse(dates["startDate"].ToString());
            DateTime endDate = DateTime.Parse(dates["endDate"].ToString());
            
            // 2. Filter sales by date and store them in a list.
            List<Sale> salesOnDate = saleList.FindAll(sale => sale.IsOnDateRange(startDate, endDate));
            
            Dictionary<string,SubProduct> products = new Dictionary<string, SubProduct>();
            
            foreach (var sale in salesOnDate)
            {
                List<SubProduct> ProdList = sale.Products;
                foreach (var currProduct in ProdList)
                {
                    if (products.ContainsKey(currProduct.BarCode))
                        products[currProduct.BarCode].Qty += currProduct.Qty;
                    else
                    {
                        products.Add(currProduct.BarCode,currProduct);
                    }
                }
            }

            var bestSellerProducts = products.Values.ToList().OrderByDescending(p => p.Qty);
            return Request.CreateResponse(HttpStatusCode.OK, bestSellerProducts);
        }
        
        

        // POST api/v1/products
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


        // PUT api/v1/products/{id}
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


        // DELETE api/v1/products/{id}
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