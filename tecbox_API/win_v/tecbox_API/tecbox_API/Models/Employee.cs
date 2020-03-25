/* ----------------------------------------------
 * File: Employee.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.1
 * last edited by: @estalvgs1999 [24/03/2020]
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

namespace tecbox_API.Models
{
    /// <summary>
    /// Employees are responsible for managing other employees, branches, 
    /// suppliers, products, and delivery routes.<br></br>
    /// Employees can take different roles: Administration, Store or Delivery.
    /// </summary>
    public class Employee
    {
        public string Name { get; set; }
        public Identification Id { get; set; }
        public string Role { get; set; }
        public Office BranchOffice { get; set; }
        public string BirthDate { get; set; }
        public string StartDate { get; set; }
        public int SalaryHour { get; set; }
        public int SalaryMonth { get; set; }

        /// <summary>
        /// Calculates monthly salary based on 140 hours worked
        /// </summary>
        public void CalculateSalary()
        {
            SalaryMonth = 140 * SalaryHour;
        }

    }
}