/* ----------------------------------------------
 * File: Employee.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.0
 * last edited by: @estalvgs1999 [25/03/2020]
 *
 * Description: Implementation of a tecbox 
 * employee. Employees are responsible for managing 
 * other employees, branches, suppliers, products, 
 * and delivery routes. 
 * Employees can take different roles: 
 * Administration, Store or Delivery.
 * 
 * 
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

using Newtonsoft.Json;

namespace tecbox_API.Models
{
    public class Employee
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public Identification Id { get; set; }
        public string Role { get; set; }
        public Office BranchOffice { get; set; }
        public string BirthDate { get; set; }
        public string StartDate { get; set; }
        public double SalaryHour { get; set; }
        public double SalaryMonth { get; set; }

        // Calculates monthly salary based on 140 hours worked
        public void CalculateSalary()
        {
            SalaryMonth = 140 * SalaryHour;
        }

        // Check if the given username and password match those of the user.
        public bool VerifyUser(string username, string password)
        {
            return this.Username == username && this.Password == password;
        }

        // Check if an object has the same values ​​in the key attributes
        public bool KeyConditions(Employee compared)
        {
            return Username.Equals(compared.Username) &&
                Id.Number.Equals(compared.Id.Number);
        }

        // Check if an object has the key values ​​null
        public bool IsNullKey()
        {
            return Username == null && Id == null;
        }

        // Edit values of the object
        public void EditEmployee(Employee employee)
        {
            if (employee.Username != null)
                this.Username = employee.Username;
            
            if (employee.Name != null)
                this.Name = employee.Name;
            
            if (employee.Id != null)
                this.Id = employee.Id;

            if (employee.Role != null)
                this.Role = employee.Role;

            if (employee.BranchOffice != null)
                this.BranchOffice = employee.BranchOffice;

            if (employee.SalaryHour != 0)
                this.SalaryHour = employee.SalaryHour;

            if (employee.StartDate != null)
                this.StartDate = employee.StartDate;

            if (employee.BirthDate != null)
                this.BirthDate = employee.BirthDate;

            CalculateSalary();
        }

    }
}