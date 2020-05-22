/* ----------------------------------------------
 * File: EmployeeController.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.0
 * last edited by: @estalvgs1999 [25/03/2020]
 *
 * Description: Rest API to control employee 
 * services. It allows to enter, validate, edit 
 * and delete employees.
 *
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using tecbox_API.Models;

namespace tecbox_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "GET, PUT, POST, DELETE, OPTIONS")]
    public class EmployeeController : ApiController
    {
        private static string filePath = "App_Data/_employees.json";
        private List<Employee> employeeList = Util.ReadListFromFile<Employee>(filePath);


        // GET api/v1/employees
        [HttpGet]
        [Route("api/v1/employees")]
        public List<Employee> GetAllEmployees()
        {
            List<Employee> protectedList = new List<Employee>();

            // Hides password when sending to user
            foreach (var employee in employeeList)
            {
                employee.Password = null;
                protectedList.Add(employee);
            }

            return protectedList;
        }


        // GET api/v1/employees/?empId={id}
        [HttpGet]
        [Route("api/v1/employees/")]
        public HttpResponseMessage GetEmployee([FromUri] string empId)
        {
            Employee requestEmployee = employeeList.Find(client => client.Id.Number == empId);

            if (requestEmployee == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            requestEmployee.Password = null; // Hides password when sending to user
            return Request.CreateResponse(HttpStatusCode.OK, requestEmployee);
        }


        // POST api/v1/employees/login
        [HttpPost]
        [Route("api/v1/employees/login")]
        public HttpResponseMessage LogIn([FromBody] Employee data)
        {
            Employee thisEmployee = employeeList.Find(employee => employee.VerifyUser(data.Username, data.Password));
            if (thisEmployee == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.AccessDeniedMessage);

            thisEmployee.Password = null; // Hides password when sending to user
            return Request.CreateResponse(HttpStatusCode.OK, thisEmployee);
        }


        // POST api/v1/employees
        [HttpPost]
        [Route("api/v1/employees")]
        public HttpResponseMessage AddEmployee([FromBody]Employee newEmployee)
        {
            if (employeeList.Exists(client => client.Id.Number.Equals(newEmployee.Id.Number)))
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingObjectMessage);

            else if (employeeList.Exists(client => client.Username.Equals(newEmployee.Username)))
                return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingUsernameMessage);

            newEmployee.CalculateSalary();

            employeeList.Add(newEmployee);
            Util.WriteListInFile<Employee>(employeeList, filePath);

            newEmployee.Password = null; // Hides password when sending to user
            return Request.CreateResponse(HttpStatusCode.Created, newEmployee);
        }


        // PUT api/v1/employees/?empId={id}
        [HttpPut]
        [Route("api/v1/employees/")]
        public HttpResponseMessage EditEmployee([FromUri] string empId, [FromBody]Employee editedEmployee)
        {
            Employee requestEmployee = employeeList.Find(client => client.Id.Number.Equals(empId));

            if (requestEmployee == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            // If the edited object does not maintain the key attributes, it is verified that they are valid
            if (!requestEmployee.KeyConditions(editedEmployee) && !editedEmployee.IsNullKey())
            {
                if (employeeList.Exists(client => client.Id.Number.Equals(empId)))
                    return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingIDMessage);

                else if (employeeList.Exists(client => client.Username.Equals(editedEmployee.Username)))
                    return Request.CreateResponse(HttpStatusCode.BadRequest, Util.ExistingUsernameMessage);
            }


            // So if the object doesn't violate the constraints it can be modified
            int productIndex = employeeList.IndexOf(requestEmployee);

            requestEmployee.EditEmployee(editedEmployee);
            employeeList[productIndex] = requestEmployee;

            Util.WriteListInFile(employeeList, filePath);

            editedEmployee.Password = null; // Hides password when sending to user
            return Request.CreateResponse(HttpStatusCode.OK, requestEmployee);

        }


        // DELETE api/v1/employees/?empId={id}
        [HttpDelete]
        [Route("api/v1/employees/")]
        public HttpResponseMessage RemoveEmployee([FromUri] string empId)
        {
            Employee requestEmployee = employeeList.Find(client => client.Id.Number.Equals(empId));

            if (requestEmployee == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, Util.NotFoundMessage);

            employeeList.Remove(requestEmployee);
            Util.WriteListInFile<Employee>(employeeList, filePath);
            return Request.CreateResponse(HttpStatusCode.OK, Util.DeletedMessage);
        }

    }
}
