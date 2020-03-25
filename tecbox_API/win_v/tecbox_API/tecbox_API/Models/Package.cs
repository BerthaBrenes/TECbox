/* ----------------------------------------------
 * File: Package.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.1
 * last edited by: @estalvgs1999 [24/03/2020]
 *
 * Description: Implementation of a tecbox package. 
 * A package consists of products that a customer has purchased.
 * 
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace tecbox_API.Models
{
    /// <summary>
    /// Implementation of a tecbox package. 
    /// A package consists of products that a customer has purchased.
    /// </summary>
    public class Package
    {

        public string TrackID { get; set; }
        public Client Client { get; set; }
        public string Description { get; set; }
        public List<Product> Content { set; get; }
        public Route Route { set; get; }
        public string Status { set; get; }
        public string DeliveryDate { set; get; }

    }
}