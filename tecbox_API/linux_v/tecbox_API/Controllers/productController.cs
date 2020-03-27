using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace tecbox_API.Controllers
{
    public class productController : Controller
    {
        private readonly string _path = Path.Combine(Directory.GetCurrentDirectory(), "DB/_products.json");


        [Route("products/getProducts/All")]
        [HttpGet]
        public ActionResult<List<Products>> GetAllProducts()
        {
            List<Products> allProductses = this.ReadListFromFile();
            return Ok(allProductses);
        }
                
        /* ---------------------------------------------
         * Operations on the DB
         * By @estalvgs1999 
         * --------------------------------------------- */
        private bool PostProductToDB(Products newProduct)
        {
            // Obtener Lista de clientes
            List<Products> ProductGlosary = ReadListFromFile();
            // Revisar que el id no se repita en ninguno

            if (!ExitsInFile(newProduct, ProductGlosary))
            {
                // Si funciona se guarda, sino se envía una excepción
                ProductGlosary.Add(newProduct);
                WriteListInFile(ProductGlosary);
                return true;
            }

            return false;
        }
        
        [EnableCors(policyName:"AllowOriginal")]
        [Route("products/postProducts/")]
        [HttpPost]
        public ActionResult PostProduct([FromBody] Products newProduct)
        {

            if (PostProductToDB(newProduct))
                return Ok("Product added succesfully!");
            return Ok("Product already exists!");

        }
        
        private Products GetProductByCode(string id)
        {
            List<Products> productGlosary = ReadListFromFile();

            foreach (Products product in productGlosary)
            {
                if (product.BarCode == id)
                    return product;
            }
            return new Products(); 
            
        }
        /* ---------------------------------------------
         * Read & Write Functions in JSON Files
         * By @estalvgs1999 
         * --------------------------------------------- */
        
        // Read the json file and deserialize it in a generic list
        private List<Products> ReadListFromFile()
        {
            string fileContent = System.IO.File.ReadAllText(_path);
            return JsonConvert.DeserializeObject<List<Products>>(fileContent);
        }
        
        // This function receives a generic list and serialize it to the json file
        private void WriteListInFile(List<Products> productsList)
        {
            string jsonList = JsonConvert.SerializeObject(productsList, Formatting.Indented);
            System.IO.File.WriteAllText(_path, jsonList);
        }
        
        /* ---------------------------------------------
         * Search and verification functions
         * By @estalvgs1999 
         * --------------------------------------------- */

        private bool ExitsInFile(Products newProduct, List<Products> productses)
        {
            foreach (var product in productses)
            {
                if (product.BarCode == newProduct.BarCode)
                    return true;
            }
            return false;
        }

    }
}