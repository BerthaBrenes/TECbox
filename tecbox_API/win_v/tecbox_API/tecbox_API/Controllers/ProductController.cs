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


        // GET api/v1/products/?productId={id}
        [HttpGet]
        [Route("api/v1/products/")]
        public HttpResponseMessage GetProduct([FromUri] string productId)
        {
            Product requestProduct = productList.Find(product => product.BarCode.Equals(productId));

            if (requestProduct == null) 
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);
                
            return Request.CreateResponse(HttpStatusCode.OK, requestProduct);
        }
        
        // POST api/v1/products/report
        [HttpPost]
        [Route("api/v1/products/bestseller")]
        public HttpResponseMessage GetBestSellers([FromBody] JObject dates)
        {
            // 1. Get delimiting dates
            DateTime startDate = DateTime.Parse(dates["startDate"].ToString());
            DateTime endDate = DateTime.Parse(dates["endDate"].ToString());
            
            // 2. Filter sales by date and store them in a list.
            List<Sale> salesOnDate = saleList.FindAll(sale => sale.IsOnDateRange(startDate, endDate));
            
            // 3. In a dictionary enter the product as a key (only once) and the amount of sales (the times it appears).
            Dictionary<string,SubProduct> products = new Dictionary<string, SubProduct>();
            
            foreach (var sale in salesOnDate)
            {
                List<SubProduct> ProdList = sale.Products;
                foreach (var currProduct in ProdList)
                {
                    if (products.ContainsKey(currProduct.BarCode))
                        products[currProduct.BarCode].Qty += currProduct.Qty;
                    else {
                        products.Add(currProduct.BarCode,currProduct);
                    }
                }
            }
            
            // 4. Then, sort the dictionary by best-selling least-selling value.
            List<SubProduct> bestSellerProducts = products.Values.ToList();
            bestSellerProducts = bestSellerProducts.OrderByDescending(p => p.Qty).ToList();

            if (bestSellerProducts.Count() >= 25)
                bestSellerProducts = bestSellerProducts.GetRange(0, 24);
            
            return Request.CreateResponse(HttpStatusCode.OK, bestSellerProducts);
        }
        
        
        // GET api/v1/products/report/emergency
        [HttpGet]
        [Route("api/v1/products/bestseller/emergency")]
        public HttpResponseMessage GetBestSellersEmergency()
        {
            List<SubProduct> bestSellers = Util.ReadListFromFile<SubProduct>("App_Data/_bestSellers.json");
            return Request.CreateResponse(HttpStatusCode.OK, bestSellers);
        }


        // POST api/v1/products
        [HttpPost]
        [Route("api/v1/products/")]
        public HttpResponseMessage AddProduct([FromBody] Product newProduct)
        {
            if (productList.Exists(product => product.BarCode.Equals(newProduct.BarCode)))
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingObjectMessage);

            productList.Add(newProduct);
            Util.WriteListInFile<Product>(productList,filePath);
            return Request.CreateResponse(HttpStatusCode.Created, newProduct);
        }


        // PUT api/v1/products/?productId={id}
        [HttpPut]
        [Route("api/v1/products/")]
        public HttpResponseMessage EditProduct([FromUri] string productId, [FromBody] Product editedProduct)
        {
            Product requestProduct = productList.Find(product => product.BarCode.Equals(productId));
            
            if (requestProduct == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            int productIndex = productList.IndexOf(requestProduct);

            productList[productIndex] = editedProduct;
            Util.WriteListInFile(productList, filePath);
            return Request.CreateResponse(HttpStatusCode.OK, editedProduct);
        }


        // DELETE api/v1/products/?productId={id}
        [HttpDelete]
        [Route("api/v1/products/")]
        public HttpResponseMessage RemoveProduct([FromUri] string productId)
        {
            Product requestProduct = productList.Find(product => product.BarCode.Equals(productId));

            if (requestProduct == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);
            
            productList.Remove(requestProduct);
            Util.WriteListInFile<Product>(productList,filePath);
            return Request.CreateResponse(HttpStatusCode.OK, Util.DeletedMessage);
        }

    }
}