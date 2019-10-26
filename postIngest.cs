using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Threading;
using System.Web;
using System.Net.Http;
using knn_hackathon.Models;

namespace knnFunctions
{
    public static class postIngest
    {
        [FunctionName("postIngest")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "ingest")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Uploading to Microsoft");

            string name = req.Query["name"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name = name ?? data?.name;

            IndexFile(name);

            return name != null
                ? (ActionResult)new OkObjectResult($"Hello, {name}")
                : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
        }

        private static void IndexFile(string videoUrl)
        {
            var apiUrl = "https://api.videoindexer.ai";
            var accountId = "7925d38f-a4d8-4180-9071-c2b8a1298249";
            var location = "trial";
            var apiKey = "8530009f795c4d0dad70c0fbc27f87e7";

            System.Net.ServicePointManager.SecurityProtocol = System.Net.ServicePointManager.SecurityProtocol | System.Net.SecurityProtocolType.Tls12;

            // create the http client
            var handler = new HttpClientHandler();
            handler.AllowAutoRedirect = false;
            var client = new HttpClient(handler);
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);

            // obtain account access token
            var accountAccessTokenRequestResult = client.GetAsync($"{apiUrl}/auth/{location}/Accounts/{accountId}/AccessToken?allowEdit=true").Result;
            var accountAccessToken = accountAccessTokenRequestResult.Content.ReadAsStringAsync().Result.Replace("\"", "");

            client.DefaultRequestHeaders.Remove("Ocp-Apim-Subscription-Key");

            // upload a video
            var content = new MultipartFormDataContent();
            Console.WriteLine("Uploading...");
            // get the video from URL
            videoUrl = HttpUtility.UrlEncode(videoUrl); // replace with the video URL

            // as an alternative to specifying video URL, you can upload a file.
            // remove the videoUrl parameter from the query string below and add the following lines:
            //FileStream video = File.OpenRead("C:\\Users\\sean\\Documents\\Video\\20191025_210512.mp4");
            //byte[] buffer = new byte[video.Length];
            //video.Read(buffer, 0, buffer.Length);
            //content.Add(new ByteArrayContent(buffer));

            string name = "Test3";
            string description = "Test3";

            var uploadRequestResult = client.PostAsync($"{apiUrl}/{location}/Accounts/{accountId}/Videos?accessToken={accountAccessToken}&name={name}&description={description}&privacy=private&partition=TestPartition2&videoUrl={videoUrl}", content).Result;
            var uploadResult = uploadRequestResult.Content.ReadAsStringAsync().Result;

            // get the video id from the upload result
            var videoId = JsonConvert.DeserializeObject<dynamic>(uploadResult)["id"];
            Console.WriteLine("Uploaded");
            Console.WriteLine("Video ID: " + videoId);

            // obtain video access token            
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);
            var videoTokenRequestResult = client.GetAsync($"{apiUrl}/auth/{location}/Accounts/{accountId}/Videos/{videoId}/AccessToken?allowEdit=true").Result;
            var videoAccessToken = videoTokenRequestResult.Content.ReadAsStringAsync().Result.Replace("\"", "");

            client.DefaultRequestHeaders.Remove("Ocp-Apim-Subscription-Key");

            IndexedVideoResponse videoResponse = null;

            // wait for the video index to finish
            while (true)
            {
                Thread.Sleep(10000);

                var videoGetIndexRequestResult = client.GetAsync($"{apiUrl}/{location}/Accounts/{accountId}/Videos/{videoId}/Index?accessToken={videoAccessToken}&language=English").Result;
                var videoGetIndexResult = videoGetIndexRequestResult.Content.ReadAsStringAsync().Result;
                videoResponse = JsonConvert.DeserializeObject<IndexedVideoResponse>(videoGetIndexResult);

                var processingState = JsonConvert.DeserializeObject<dynamic>(videoGetIndexResult)["state"];

                Console.WriteLine("");
                Console.WriteLine("State:");
                Console.WriteLine(processingState);

                // job is finished
                if (processingState != "Uploaded" && processingState != "Processing")
                {
                    Console.WriteLine("");
                    Console.WriteLine("Full JSON:");
                    Console.WriteLine(videoGetIndexResult);
                    break;
                }
            }

            // search for the video
            var searchRequestResult = client.GetAsync($"{apiUrl}/{location}/Accounts/{accountId}/Videos/Search?accessToken={accountAccessToken}&id={videoId}").Result;
            var searchResult = searchRequestResult.Content.ReadAsStringAsync().Result;
            Console.WriteLine("");
            Console.WriteLine("Search:");
            Console.WriteLine(searchResult);

            // get insights widget url
            var insightsWidgetRequestResult = client.GetAsync($"{apiUrl}/{location}/Accounts/{accountId}/Videos/{videoId}/InsightsWidget?accessToken={videoAccessToken}&widgetType=Keywords&allowEdit=true").Result;
            var insightsWidgetLink = insightsWidgetRequestResult.Headers.Location;
            Console.WriteLine("Insights Widget url:");
            Console.WriteLine(insightsWidgetLink);

            // get player widget url
            var playerWidgetRequestResult = client.GetAsync($"{apiUrl}/{location}/Accounts/{accountId}/Videos/{videoId}/PlayerWidget?accessToken={videoAccessToken}").Result;
            var playerWidgetLink = playerWidgetRequestResult.Headers.Location;
            Console.WriteLine("");
            Console.WriteLine("Player Widget url:");
            Console.WriteLine(playerWidgetLink);

            // get player widget url
            var videoCaptionsRequestResult = client.GetAsync($"{apiUrl}/{location}/Accounts/{accountId}/Videos/{videoId}/captions?accessToken={videoAccessToken}").Result;
            var videoCaptionsResponse = videoCaptionsRequestResult.Content.ReadAsStringAsync().Result;
            Console.WriteLine("");
            Console.WriteLine("Video Captions:");
            Console.WriteLine(videoCaptionsResponse);

            var catalogueVideo = MapVideoResponseToCatalogueVideo(videoResponse, insightsWidgetLink.AbsolutePath, playerWidgetLink.AbsolutePath);


        }

        private static CatalogueVideo MapVideoResponseToCatalogueVideo(IndexedVideoResponse response, string widgetLink, string videoPlayerUrl)
        {
            return new CatalogueVideo
            {
                doctype = "catalogueVideo",
                durationInSeconds = response.durationInSeconds,
                id = response.id,
                labels = response.videos[0].insights.labels,
                language = response.videos[0].language,
                languages = response.videos[0].insights.languages,
                name = response.name,
                thumbnailId = response.videos[0].thumbnailId,
                transcription = response.videos[0].insights.transcript,
                videoPlayerUrl = videoPlayerUrl,
                widgetUrl = widgetLink
            };
        }
    }
}
