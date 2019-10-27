using System;
using System.Threading.Tasks;
using System.Configuration;
using System.Collections.Generic;
using System.Net;
using System.Linq;
using knn_hackathon.Models;
using Microsoft.Azure.Cosmos;
using Newtonsoft.Json;

namespace KNN_CORE_API.Services
{
    public class CosmosStorage
    {
        /// The Azure Cosmos DB endpoint for running this GetStarted sample.
        private string EndpointUrl = "https://knnstore.documents.azure.com:443/";

        /// The primary key for the Azure DocumentDB account.
        private string PrimaryKey = "ZoKXOb3asXozk6BKjncPhJkVM4JB2uKgSnxXXToSJphXcNB3kxyW8BFg24i79b1cwlMTLnoFjZFtPOfH1gy2vg==";

        // The Cosmos client instance
        private CosmosClient cosmosClient;

        // The database we will create
        private Database database;

        // The container we will create.
        private Container container;

        // The name of the database and container we will create
        private string databaseId = "KnnVideos";
        private string containerId = "VideoDetails";
        private string partitionKeyPath = "/id";

        public CosmosStorage()
        {

        }

        public async Task<CosmosStorage> Connect()
        {
            this.cosmosClient = new CosmosClient("AccountEndpoint=https://knnstore.documents.azure.com:443/;AccountKey=ZoKXOb3asXozk6BKjncPhJkVM4JB2uKgSnxXXToSJphXcNB3kxyW8BFg24i79b1cwlMTLnoFjZFtPOfH1gy2vg==;");
            this.database = await this.cosmosClient.CreateDatabaseIfNotExistsAsync(databaseId);
            this.container = await this.database.CreateContainerIfNotExistsAsync(containerId, partitionKeyPath);
            return this;
        }

        public async Task StoreVideoDetails(CatalogueVideo details)
        {
            try
            {
                ItemResponse<CatalogueVideo> response = await this.container.CreateItemAsync<CatalogueVideo>(details, new PartitionKey(details.id));
            }
            catch (CosmosException ex) when (ex.StatusCode == HttpStatusCode.Conflict)
            {
                Console.WriteLine("Item in database with id: {0} already exists\n", details.id);
            }
        }

        public IEnumerable<allCatalogue> FetchCatalogue()
        {
            return this.container.GetItemLinqQueryable<allCatalogue>(true)
              .AsEnumerable();
        }
        public IEnumerable<CatalogueVideo> FetchSpecificCatalogue(string catID)
        {
            return this.container.GetItemLinqQueryable<CatalogueVideo>(true)
              .Where(video => video.id.Equals(catID))
              .AsEnumerable();
        }
    }
}
