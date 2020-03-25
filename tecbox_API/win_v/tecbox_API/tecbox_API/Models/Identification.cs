/* ----------------------------------------------
 * File: Identification.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.1
 * last edited by: @estalvgs1999 [24/03/2020]
 *
 * Description: Models an identification, contains 
 * the type: physical or legal and the id number.
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
    /// Models an identification, contains the type: physical 
    /// or legal and the id number.
    /// </summary>
    public class Identification
    {

        public string Type { get; set; }
        public string Number { get; set; }

    }
}