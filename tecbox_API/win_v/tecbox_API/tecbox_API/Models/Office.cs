/* ----------------------------------------------
 * File: Office.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.0
 * last edited by: @estalvgs1999 [26/03/2020]
 *
 * Description: Object that represents a branch 
 * office of the company.
 * 
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

namespace tecbox_API.Models
{
    // Object that represents a branch office of the company.
    public class Office
    {

        private static int IdCounter = 1;

        public int Id { get; set; }
        public string Name { get; set; }
        public string Admin { get; set; }
        public string Phone { get; set; }
        public Address Address { get; set; }

        // sets office id
        public void SetId()
        {
            this.Id = IdCounter;
            IdCounter++;
        }

        // Edit values of the object
        public void EditOffice(Office office)
        {
            if (office.Name != null)
                this.Name = office.Name;

            if (office.Admin != null)
                this.Admin = office.Admin;

            if (office.Phone != null)
                this.Phone = office.Phone;

            if (office.Address != null)
                this.Address = office.Address;
        }
    }
}