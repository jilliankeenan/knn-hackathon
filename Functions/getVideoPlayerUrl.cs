using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;

namespace knn_hackathon
{
    public static class getVideoPlayerUrl
    {
        [FunctionName("getVideoPlayerUrl")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "getVideoUrl/{videoId}")] HttpRequest req,
            string videoId,
            ILogger log)
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

            //https://api.videoindexer.ai/{location}/Accounts/{accountId}/Videos/{videoId}/SourceFile/DownloadUrl[?accessToken]

            // obtain video access token            
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);
            var videoTokenRequestResult = await client.GetAsync($"{apiUrl}/auth/{location}/Accounts/{accountId}/Videos/{videoId}/AccessToken?allowEdit=true");
            var videoAccessToken = await videoTokenRequestResult.Content.ReadAsStringAsync();
            videoAccessToken = videoAccessToken.Replace("\"", "");

            client.DefaultRequestHeaders.Remove("Ocp-Apim-Subscription-Key");

            // get player widget url
            var videoPlayerUrlRequestResult = client.GetAsync($"{apiUrl}/{location}/Accounts/{accountId}/Videos/{videoId}/SourceFile/DownloadUrl?accessToken={videoAccessToken}").Result;
            var videoPlayerUrlResponse = videoPlayerUrlRequestResult.Content.ReadAsStringAsync().Result;
            Console.WriteLine("");
            Console.WriteLine("Video Captions:");
            Console.WriteLine(videoPlayerUrlResponse);

            return new OkObjectResult(videoPlayerUrlResponse);
        }
    }
}
