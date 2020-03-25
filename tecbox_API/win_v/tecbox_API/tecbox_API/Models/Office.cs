/* ----------------------------------------------
 * File: Office.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.1
 * last edited by: @estalvgs1999 [24/03/2020]
 *
 * Description: Object that represents a branch 
 * office of the company.
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
    /// Object that represents a branch office of the company.
    /// </summary>
    public class Office
    {

        public string Name { get; set; }
        public string Admin { get; set; }
        public string Phone { get; set; }
        public Address Address { get; set; }

    }
}