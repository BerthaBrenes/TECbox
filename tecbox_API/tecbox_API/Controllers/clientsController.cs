/* ----------------------------------------------
 * File: clientsController.cs
 * Dev by: @estalvgs1999
 * Project: TECbox Web Service
 * version: 0.1
 * last edited by: @estalvgs1999 [10/03/2020]
 *
 * Description: 
 *
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace tecbox_API.Controllers
{
    public class ClientsController : Controller
    {
        // How to pass parameters by route? route/{id1}/{id2}...etc
        [Route("client/getClient/{id}")]
        [HttpGet] //Always explicitly state the accepted HTTP method
        public ActionResult<string> GetClient(int id)
        {;
            // TODO Selector de clientes por el id, retornar solo el cliente que cumpla con la restricción 
            Client c1 = new Client();
            string msg = "Nice";
            return Ok(msg);
        }

        [Route("client/getClient/All")]
        [HttpGet]
        public ActionResult<string> GetAllClients()
        {
            // TODO Retornar todos los clientes al cliente
            return Ok();
        }

        [Route("client/addClient")]
        [HttpPost]
        public ActionResult AddNewClient([FromBody] Client newClient)
        {
            string json = JsonConvert.SerializeObject(newClient, Formatting.Indented);
            System.IO.File.WriteAllText("/home/estalvgs1999/Documentos/TEC/1S2020/Bases de Datos/4. Tareas Cortas/Tarea Corta 1/TECbox/tecbox_API/tecbox_API/DB/_clients.json", json);
            return Ok("Client added succesfully!");
            
        }
        
    }
}

