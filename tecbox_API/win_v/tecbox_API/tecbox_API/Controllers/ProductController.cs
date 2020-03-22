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

using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using tecbox_API.Models;
using System.Web.Http.Cors;

namespace tecbox_API.Controllers
{
    [EnableCors(origins: "http://localhost:8100", headers: "*", methods: "GET, PUT, POST, DELETE, OPTIONS")]
    public class ProductController : ApiController
    {

        private static readonly string _path = "C:/Users/Esteban Alvarado/Documents/TEC/1S 2020/TECbox/tecbox_API/win_v/tecbox_API/tecbox_API/App_Data/_products.json";

        List<Product> productList = ReadListFromFile();

        // GET api/products
        /// <summary>
        /// Returns all Products in stock.
        /// </summary>
        public List<Product> Get()
        {
            return productList;
        }

        // GET api/products/5
        /// <summary>
        /// Returns an individual Product.
        /// </summary>
        /// <param name="id">The Product id.</param>
        /// <returns></returns>
        public string Get(int id)
        {
            return "value";
        }

        // POST api/products
        public void Post([FromBody]string value)
        {
        }

        // PUT api/products/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/products/5
        public void Delete(int id)
        {

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