using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace tecbox_API
{
    public class Products
    {
        /*
         * All the atributes of the entity Products
         */
        
        public string Name { get; set; }
        public string Description { get; set; }
        public string BarCode { get; set; }
        public string Seller { get; set; } 
        public int Price { get; set; }
        public bool Discount { get; set; }
        public bool Taxes { get; set; }
        public string Image { get; set; }
        
        public string GetJson()
        {
            return JsonConvert.SerializeObject(this);
        }   
    }
}