/* ----------------------------------------------
 * File: Sale.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 4.0
 * last edited by: @estalvgs1999 [16/05/2020]
 *
 * Description: Represents a sale on tecbox.
 * Stores the SaleId, the date of the sale,
 * the client name, a list of the products
 * [Id-name-amount] that were purchased at the sale.
 * 
 * TEC 2020 | CE3101 - Bases de Datos
 * ----------------------------------------------*/

using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace tecbox_API.Models
{
    public class SubProduct
    {
        public string BarCode { set; get; }
        public string ProductName { set; get; }
        public int Qty { set; get; }
    }
    
    public class Sale
    {
        private static int _idCounter = 1;

        public int SaleId { set; get; }
        public string SaleDate { set; get; }
        public string ClientName { set; get; }
        public List<SubProduct> Products { set; get; }


        public void SetId()
        {
            this.SaleId = _idCounter;
            _idCounter++;
        }
        
        // Indicates if the sale date is in the given range.
        public bool IsOnDateRange(DateTime startDate, DateTime endDate)
        {
            DateTime saleDate = DateTime.Parse(this.SaleDate);
            return DateTime.Compare(startDate,saleDate) < 0 && DateTime.Compare(saleDate,endDate) < 0;
        }
    }
}