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
    public class Route
    {

        private static int _idCounter = 1;

        public int Id { get; set; }
        public string Name { get; set; }
        public List<string> Districts { get; set; }

        //
        public void AddDistrict(string district)
        {
            if(! Districts.Exists(dis => dis.Equals(district)))
                Districts.Add(district);
        }

        //
        public void SetId(int currentId)
        {
            // ReSharper disable once RedundantCheckBeforeAssignment
            if (currentId != _idCounter)
                _idCounter = currentId+1;
            this.Id = _idCounter;
            _idCounter++;
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