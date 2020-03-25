/* ----------------------------------------------
 * File: Client.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.1
 * last edited by: @estalvgs1999 [24/03/2020]
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
    /// <summary>
    /// Implementation of a tecbox client. Clients can sing in, 
    /// log in, buy products and tracking packages.
    /// </summary>
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
        public bool VerifyUser(string username, string password)
        {
            return this.Username.Equals(username) && this.Password.Equals(password);
        }

        public bool KeyConditions(Client compared)
        {
            return Username.Equals(compared.Username) &&
                Id.Number.Equals(compared.Id.Number) &&
                Email.Equals(compared.Email);
        }
    }
}