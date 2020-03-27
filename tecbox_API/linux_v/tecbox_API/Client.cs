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
        
        public string IdCard { get;}
        public string Email { get;}
        public int Locker { get; set; } // The locker is identified by its id number
        
        public string Cellphone { get; set; }
        public string Phone { get; set; }
        
        // Client Address
        public string Province { set; get; }
        public string City { set; get; }
        public string District { set; get; }

        // Client Shopping List
        private List<string> ShoppingCard { set; get; }

        
        public Client(string name, string idCard, string email)
        {
            this.Name = name;
            this.IdCard = idCard;
            this.Email = email;

            this.AssignLocker();
        }
        
        // Assign new locker numbers to new customers
        private void AssignLocker()
        {
            // TODO Implementar un método que asigne un id de casillero a los nuevos cliente    
            this.Locker = 123;
        }
        
        // It allows you to modify the customer's address part by part
        public void SetAddress(string province, string city, string district)
        {
            this.Province = province;
            this.City = city;
            this.District = district;
        }
        
        // Returns the full address of the customer
        public string GetAddress()
        {
            string template = "{0},{1},{2}.";
            return string.Format(template, District, City, Province);
        }

        public void SetFullName(string name, string lastName)
        {
            this.Name = name;
            this.LastName = lastName;
        }
        
        // Returns the full name of the client
        public string GetName()
        {
            string template = "{0} {1}";
            return string.Format(template, this.Name, this.LastName);
        }
        
        // Serialize customer information in JSON format
        public string GetJson()
        {
            return JsonConvert.SerializeObject(this);
        }

        public void AddToCard()
        {
            // TODO Función que agrega un producto al carrito de compras
        }
        public void BuyProduct()
        {
            // TODO Realizar la función que simula la compra de un producto
        }

        public void PackTracking(int packId)
        {
            // TODO Implementar función de seguimiento de paquetes
        }

    }
}