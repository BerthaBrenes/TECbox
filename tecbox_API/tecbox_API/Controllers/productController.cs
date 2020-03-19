using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace tecbox_API.Controllers
{
    public class productController : Controller
    {
        private readonly string _path = Path.Combine(Directory.GetCurrentDirectory(), "DB/_clients.json");


        [Route("producto/getProducts/All")]
        [HttpGet]
        public ActionResult<List<Client>> GetAllProducts()
        {
            List<Client> allClients = this.ReadListFromFile();
            return Ok(allClients);
        }
        private List<Client> ReadListFromFile()
        {
            string fileContent = System.IO.File.ReadAllText(_path);
            return JsonConvert.DeserializeObject<List<Client>>(fileContent);
        }
        
    }
}