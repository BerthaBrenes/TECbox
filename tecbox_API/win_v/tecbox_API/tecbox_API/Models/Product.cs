/* ----------------------------------------------
 * File: Product.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.0
 * last edited by: @estalvgs1999 [25/03/2020]
 *
 * Description: Implementation of a tecbox 
 * product. Products represent what tecbox 
 * sells or buys.
 * 
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

namespace tecbox_API.Models
{
    public class Product
    {

        public string Name { get; set; }
        public string BarCode { get; set; }
        public string Description { get; set; }
        public Seller Seller { get; set; }
        public int OnStock { get; set; }
        public int Price { get; set; }
        public bool Taxes { get; set; }
        public bool Discount { get; set; }
        public string ImageUrl { get; set; }

    }
}