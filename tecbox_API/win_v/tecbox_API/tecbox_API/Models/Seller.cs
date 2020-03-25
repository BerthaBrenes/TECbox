/* ----------------------------------------------
 * File: Seller.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.1
 * last edited by: @estalvgs1999 [24/03/2020]
 *
 * Description: A seller is an object that represents 
 * a user outside of tecbox who wants to sell their 
 * products through the platform.
 * 
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
    /// A seller is an object that represents a user outside of 
    /// tecbox who wants to sell their products through the platform.
    /// </summary>
    public class Seller
    {

        public string Name { get; set; }
        public Identification Id { get; set; }

    }
}