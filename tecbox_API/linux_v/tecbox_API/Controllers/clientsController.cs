/* ----------------------------------------------
 * File: clientsController.cs
 * Dev by: @estalvgs1999
 * Project: TECbox Web Service
 * version: 0.5
 * last edited by: @estalvgs1999 [17/03/2020]
 *
 * Description: 
 *
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

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
    public class ClientsController : Controller
    {

        private readonly string _path = Path.Combine(Directory.GetCurrentDirectory(), "DB/_clients.json");
            //"/home/estalvgs1999/Documentos/TEC/1S2020/Bases de Datos/4. Tareas Cortas/Tarea Corta 1/TECbox/tecbox_API/tecbox_API/DB/_clients.json";
        
        /* ---------------------------------------------
         * Rest Api GET, POST, PUT and DELETE Request
         * By @estalvgs1999 
         * --------------------------------------------- */
        
        // How to pass parameters by route? route/{id1}/{id2}...etc
        [Route("client/getClient/{id}")]
        [HttpGet] //Always explicitly state the accepted HTTP method
        public ActionResult<string> GetClient(string id)
        {
            return Ok(GetClientById(id));
        }

        
        [Route("client/getClient/All")]
        [HttpGet]
        public ActionResult<List<Client>> GetAllClients()
        {
            List<Client> allClients = this.ReadListFromFile();
            return Ok(allClients);
        }

        
        [Route("client/addClient")]
        [HttpPost]
        public ActionResult AddNewClient([FromBody] Client newClient)
        {

            if (AddClientToDb(newClient))
                return Ok("Client added succesfully!");
            return Ok("Client already exists!");

        }
        
        
        /* ---------------------------------------------
         * Operations on the DB
         * By @estalvgs1999 
         * --------------------------------------------- */
        private bool AddClientToDb(Client newClient)
        {
            // Obtener Lista de clientes
            List<Client> clientsGlosary = ReadListFromFile();
            // Revisar que el id no se repita en ninguno

            if (!ExitsInFile(newClient, clientsGlosary))
            {
                // Si funciona se guarda, sino se envía una excepción
                clientsGlosary.Add(newClient);
                WriteListInFile(clientsGlosary);
                return true;
            }
            return false; 
            
        }
        
        private Client GetClientById(string id)
        {
            List<Client> clientsGlosary = ReadListFromFile();

            foreach (Client client in clientsGlosary)
            {
                if (client.IdCard == id)
                    return client;
            }
            return new Client(); 
            
        }
        
        /* ---------------------------------------------
         * Read & Write Functions in JSON Files
         * By @estalvgs1999 
         * --------------------------------------------- */
        
        // Read the json file and deserialize it in a generic list
        private List<Client> ReadListFromFile()
        {
            string fileContent = System.IO.File.ReadAllText(_path);
            return JsonConvert.DeserializeObject<List<Client>>(fileContent);
        }
        
        // This function receives a generic list and serialize it to the json file
        private void WriteListInFile(List<Client> clientList)
        {
            string jsonList = JsonConvert.SerializeObject(clientList, Formatting.Indented);
            System.IO.File.WriteAllText(_path, jsonList);
        }
        
        /* ---------------------------------------------
         * Search and verification functions
         * By @estalvgs1999 
         * --------------------------------------------- */

        private bool ExitsInFile(Client newClient, List<Client> clients)
        {
            foreach (var client in clients)
            {
                if (client.IdCard == newClient.IdCard)
                    return true;
            }
            return false;
        }
        
    }
}

