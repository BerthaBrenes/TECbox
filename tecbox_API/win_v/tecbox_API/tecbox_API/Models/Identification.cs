/* ----------------------------------------------
 * File: Identification.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.0
 * last edited by: @estalvgs1999 [25/03/2020]
 *
 * Description: Models an identification, contains 
 * the type: physical or legal and the id number.
 * 
 * 
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

namespace tecbox_API.Models
{
    public class Identification
    {

        public string Type { get; set; }
        public string Number { get; set; }

    }
}