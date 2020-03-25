/* ----------------------------------------------
 * File: Product.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.1
 * last edited by: @estalvgs1999 [24/03/2020]
 *
 * Description: Implementation of a tecbox 
 * product. Products represent what tecbox 
 * sells or buys.
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
    /// Implementation of a tecbox product. 
    /// Products represent what tecbox sells.
    /// </summary>
    public class Product
    {

        public string Name { get; set; } 
        public string BarCode { get; set; }
        public string Description { get; set; }
        public Seller Seller { get; set; }
        public int OnStock { get; set; }
        public int Price { get; set; }
        public bool Taxes { get; set; }
        public bool Discount { get; set; }
        public string image { get; set; }

    }
}