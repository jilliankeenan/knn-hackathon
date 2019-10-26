using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Cosmos;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace knnFunctions
{
    public static class getCatalogue
        {
         
        private static CosmosStorage storage = new CosmosStorage();


        [FunctionName("getCatalogue")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "getCatalogue")] HttpRequest req,
            ILogger log)
        {
            Console.WriteLine("Beginning to Retrieve Information from the DB");
          
            await storage.Connect();
            var catalogue = storage.FetchCatalogue();

            return new OkObjectResult(catalogue);
        }
    }

    
      
    }
