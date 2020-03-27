/* ----------------------------------------------
 * File: Package.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.0
 * last edited by: @estalvgs1999 [27/03/2020]
 *
 * Description: Implementation of a tecbox package. 
 * A package consists of products that a customer 
 * has purchased.
 * 
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

namespace tecbox_API.Models
{
    public class Package
    {

        public string TrackID { get; set; }
        public Client Client { get; set; }
        public string Description { get; set; }
        public Route Route { set; get; }
        public string Status { set; get; }
        public string DeliveryDate { set; get; }

        // Lets you edit a package. Only the status and delivery 
        // date can be edited.
        public void EditPackage(Package package)
        {
            if (package.DeliveryDate != null)
                this.DeliveryDate = package.DeliveryDate;

            if (package.Status != null)
                this.Status = package.Status;
        }
    }
}