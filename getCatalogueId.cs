using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using knnFunctions;

namespace knnfunctions
{
    public static class getCatalogueId
    {
        private static CosmosStorage storage = new CosmosStorage();

        [FunctionName("getCatalogueId")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "getCatalogueId")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Calling Database to Retrieve Specific Information");

            string catID = req.Query["catalogueid"];

            await storage.Connect();
            Console.WriteLine("Successfully Connected to the Database");
            var catalogueItem = storage.FetchSpecificCatalogue(catID);

            Console.WriteLine("Data successfully retrieved. Returning Results.");
            return new OkObjectResult(catalogueItem);
        }
    }
}
