/* ----------------------------------------------
 * File: Client.cs
 * Dev by: @estalvgs1999
 * Project: TECbox Web Service
 * version: 0.1
 * last edited by: @estalvgs1999 [10/03/2020]
 *
 * Description: Implementation of a tecbox client.
 * A client can be registered, can buy products
 * and track their packages.
 *
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace tecbox_API
{
    public class Client
    {
        // Client Attributes
        
        // Client Name
        public string Name { get; set; }
        public string LastName { get; set; } 
        
        public string IdCard { get; set; }
        public string Email { get; set; }
        public int Locker { get; set; } // The locker is identified by its id number
        
        public string Cellphone { get; set; }
        public string Phone { get; set; }
        
        // Client Address
        public string Province { set; get; }
        public string City { set; get; }
        public string District { set; get; }
        
        public string GetJson()
        {
            return JsonConvert.SerializeObject(this);
        }
        
    }
}