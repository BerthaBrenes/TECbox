/* ----------------------------------------------
 * File: Address.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.1
 * last edited by: @estalvgs1999 [24/03/2020]
 *
 * Description: Object containing the contact address 
 * information.
 * A customer or branch address provides 
 * distributors the delivery address for a package.
 * 
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

namespace tecbox_API.Models
{
    /// <summary>
    /// Object containing the contact address information.<br></br>
    /// A customer or branch address provides distributors 
    /// the delivery address for a package.
    /// </summary>
    public class Address
    {

        public string Department { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Others { get; set; }

    }
}