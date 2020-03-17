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

using Microsoft.AspNetCore.Mvc;
using static tecbox_API.Client;

namespace tecbox_API.Controllers
{
    public class clientsController : Controller
    {
        /*
        Client c1 = new Client("Esteban", "2018108336", "es_josh1989@gmail.com");
        c1.SetAddress("San José","Desamparados", "Gravilias");
        c1.Cellphone = "(+506) 8359-7161";
        c1.Phone = "(+506) 2241-7456";
        c1.SetFullName("Esteban", "Alvarado");
        string msg = c1.GetJson();*/
        
        [Route("client/info")]
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