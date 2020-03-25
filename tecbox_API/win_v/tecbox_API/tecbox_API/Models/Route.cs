/* ----------------------------------------------
 * File: Route.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.1
 * last edited by: @estalvgs1999 [24/03/2020]
 *
 * Description: Implement a route. 
 * The routes are a list of districts that the 
 * delivery person must follow to make deliveries. 
 * A route has a name that identifies it.
 * 
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

namespace tecbox_API.Models
{
    /// <summary>
    /// Implement a route. The routes are a list of districts that 
    /// the delivery person must follow to make deliveries.<br></br> 
    /// A route has a name that identifies it.
    /// </summary>
    public class Route
    {

        public string Name { get; set; }
        public string Districts { get; set; }

    }
}