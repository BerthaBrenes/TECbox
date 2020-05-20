/* ----------------------------------------------
 * File: Client.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.0
 * last edited by: @estalvgs1999 [25/03/2020]
 *
 * Description: Implementation of a tecbox 
 * client. Clients can sing in, log in, buy 
 * producs and tracking packages.
 * 
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

using Newtonsoft.Json;

namespace tecbox_API.Models
{
    public class Client
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public Identification Id { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public Address Address { get; set; }

        // Check if the given username and password match those of the user.
        public bool VerifyUser(string email, string password)
        {
            return this.Email.Equals(email) && this.Password.Equals(password);
        }

        // Check if an object has the same values ​​in the key attributes
        public bool KeyConditions(Client compared)
        {
            return Username.Equals(compared.Username) &&
                Id.Number.Equals(compared.Id.Number) &&
                Email.Equals(compared.Email);
        }

        // Check if an object has the key values ​​null
        public bool IsNullKey()
        {
            return Username == null && Id == null && Email == null;
        }

        // Edit values of the object
        public void EditClient(Client employee)
        {
            if (employee.Username != null)
                this.Username = employee.Username;

            if (employee.Name != null)
                this.Name = employee.Name;

            if (employee.Id != null)
                this.Id = employee.Id;

            if (employee.Email != null)
                this.Email = employee.Email;

            if (employee.Phone != null)
                this.Phone = employee.Phone;

            if (employee.Mobile != null)
                this.Mobile = employee.Mobile;

            if (employee.Address != null)
                this.Address = employee.Address;

        }

    }
}