/* ----------------------------------------------
 * File: Product.cs
 * Dev by: @estalvgs1999
 * Project: TECbox API
 * version: 3.0
 * last edited by: @estalvgs1999 [25/03/2020]
 *
 * Description: Collection of useful resources 
 * used by all controllers.
 * 
 * TEC 2020 | CE3101 - Bases de Datos
 * --------------------------------------------*/

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace tecbox_API.Models
{
    public class Util
    {

        /* ---------------------------------------------
         * Https protocol custom responses
         * By @estalvgs1999 
         * --------------------------------------------- */

        public static object NotFoundMessage = JsonConvert.DeserializeObject("{\"Code\":\"404\",\"Message\":\"The object was not found in tecbox\"}");
        public static object DeletedMessage = JsonConvert.DeserializeObject("{\"Code\":\"200\",\"Message\":\"The object was successfully removed\"}");
        public static object ErrorMessage = JsonConvert.DeserializeObject("{\"Code\":\"400\",\"Message\":\"The action could not be completed\"}");
        public static object ExistingObjectMessage = JsonConvert.DeserializeObject("{\"Code\":\"400\",\"Message\":\"The object that you tried to create already exists in tecbox\"}");
        public static object AccessDeniedMessage = JsonConvert.DeserializeObject("{\"Code\":\"400\",\"Message\":\"The user or password is incorrect\"}");
        public static object ExistingUsernameMessage = JsonConvert.DeserializeObject("{\"Code\":\"400\",\"Message\":\"Username in use\"}");
        public static object ExistingIDMessage = JsonConvert.DeserializeObject("{\"Code\":\"400\",\"Message\":\"Incorrect ID number, another user already exists with that ID number\"}");
        public static object ExistingEmailMessage = JsonConvert.DeserializeObject("{\"Code\":\"400\",\"Message\":\"The email is already associated with an existing account.\"}");


        /* ---------------------------------------------
         * Read & Write Functions in JSON Files
         * By @estalvgs1999 
         * --------------------------------------------- */

        public static readonly string _basePath = System.AppDomain.CurrentDomain.BaseDirectory;

        // Read the json file and deserialize it in a generic list
        public static List<T> ReadListFromFile <T>(string filePath)
        {
            string _path = Path.Combine(_basePath, filePath);
            string fileContent = File.ReadAllText(_path);
            return JsonConvert.DeserializeObject<List<T>>(fileContent);
           
        }

        // This function receives a generic list and serialize it to the json file
        public static void WriteListInFile<T>(List<T> objectList, string filePath)
        {
            string _path = Path.Combine(_basePath, filePath);
            string jsonList = JsonConvert.SerializeObject(objectList, Formatting.Indented);
            System.IO.File.WriteAllText(_path, jsonList);
        }

        
    }
}