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

using System.Collections.Generic;

namespace tecbox_API.Models
{
    /// <summary>
    /// Implement a route. The routes are a list of districts that 
    /// the delivery person must follow to make deliveries.<br></br> 
    /// A route has a name that identifies it.
    /// </summary>
    public class Route
    {

        private static int IdCounter = 1;

        public int Id { get; set; }
        public string Name { get; set; }
        public List<string> Districts { get; set; }

        //
        public void AddDistrict(string district)
        {
            Districts.Add(district);
        }

        //
        public void SetID()
        {
            this.Id = IdCounter;
            IdCounter++;
        }

        //
        public void EditRoute(Route route)
        {
            if (route.Name != null)
                this.Name = route.Name;

            if (route.Districts != null)
                this.Districts = route.Districts;
        }
    }
}