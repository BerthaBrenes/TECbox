/* ----------------------------------------------
 * File: Package.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 4.0
 * last edited by: @estalvgs1999 [16/05/2020]
 *
 * Description: Implementation of a tecbox package. 
 * A package consists of products that a customer 
 * has purchased.
 * 
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

using System;

namespace tecbox_API.Models
{
    public class Package
    {

        public string TrackId { get; set; }
        public string Client { get; set; } // Only the client name
        public string Description { get; set; }
        public int RouteId { set; get; }
        public string DeliveryMan { set; get; }
        
        // DeliveryMan ID is what is used for searches as two employees can have the same name
        public string DmId { set; get; }
        public string Status { set; get; }
        
        // Date Format: yy-mm-dd
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
        
        // Indicates if the date of the package is in the given range.
        public bool IsOnDateRange(DateTime startDate, DateTime endDate)
        {
            DateTime pDate = DateTime.Parse(this.DeliveryDate);
            //  DateTime.Compare(d1,d2) -> [ r < 0 if d1 is earlier than d2]
            return DateTime.Compare(startDate, pDate) < 0 && DateTime.Compare(pDate, endDate) < 0;
        }
        
        
    }
}