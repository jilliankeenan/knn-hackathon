using System;
using System.Threading.Tasks;
using System.Configuration;
using System.Collections.Generic;
using System.Net;
using Microsoft.Azure.Cosmos;
using Newtonsoft.Json;

namespace knnFunctions
{
  public class CosmosStorage
  {
    /// The Azure Cosmos DB endpoint for running this GetStarted sample.
    private string EndpointUrl = Environment.GetEnvironmentVariable("EndpointUrl");

    /// The primary key for the Azure DocumentDB account.
    private string PrimaryKey = Environment.GetEnvironmentVariable("PrimaryKey");

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

    public async Task Connect()
    {
      this.cosmosClient = new CosmosClient(EndpointUrl, PrimaryKey);
      this.database = await this.cosmosClient.CreateDatabaseIfNotExistsAsync(databaseId);
      this.container = await this.database.CreateContainerIfNotExistsAsync(containerId, partitionKeyPath);
    }

    public async Task StoreVideoDetails(Object details)
    {
      try {
      ItemResponse<Object> response = await this.container.CreateItemAsync<Object>(details, new PartitionKey("details.id"));
      } catch (CosmosException ex) when (ex.StatusCode == HttpStatusCode.Conflict)
      {
        Console.WriteLine("Item in database with id: {0} already exists\n", "details.id");
      }
    }
  }
}
