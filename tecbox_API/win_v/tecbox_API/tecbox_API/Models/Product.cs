/* ----------------------------------------------
 * File: Product.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 2.1
 * last edited by: @estalvgs1999 [21/03/2020]
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
    public class Product
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string BarCode { get; set; }
        public string Seller { get; set; }
        public int Price { get; set; }
        public bool Discount { get; set; }
        public string image { get; set; }

    }
}