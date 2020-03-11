/* ----------------------------------------------
 * File: clientsController.cs
 * Dev by: @estalvgs1999
 * Project: TECbox Web Service
 * version: 0.1
 * last edited by: @estalvgs1999 [10/03/2020]
 *
 * Description: 
 *
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

using Microsoft.AspNetCore.Mvc;
using static tecbox_API.Client;

namespace tecbox_API.Controllers
{
    public class clientsController : Controller
    {
        /*
        Client c1 = new Client("Esteban", "2018108336", "es_josh1989@gmail.com");
        c1.SetAddress("San José","Desamparados", "Gravilias");
        c1.Cellphone = "(+506) 8359-7161";
        c1.Phone = "(+506) 2241-7456";
        c1.SetFullName("Esteban", "Alvarado");
        string msg = c1.GetJson();*/
        
        [Route("client/info")]
        [HttpGet] //Always explicitly state the accepted HTTP method
        public ActionResult<string> All()
        {
            Client c1 = new Client("Esteban", "2018108336", "es_josh1989@gmail.com");
            c1.SetAddress("San José","Desamparados", "Gravilias");
            c1.Cellphone = "(+506) 8359-7161";
            c1.Phone = "(+506) 2241-7456";
            c1.SetFullName("Esteban", "Alvarado");
            string msg = c1.GetJson();
            return Ok(msg);
        }
    }
}