using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using KNN_CORE_API.Services;
using knn_hackathon.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace KNN_CORE_API.Controllers
{
    [Route("api")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [Route("test")]
        [HttpGet]
        public IActionResult Test()
        {
            return Ok("Poop");
        }

        [Route("ingest")]
        [HttpPost]
        public async Task<IActionResult> Ingest()
        {
            var file = Request.Form.Files[0];
            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                byte[] buffer = new byte[file.Length];
                using (var stream = file.OpenReadStream())
                {
                    stream.Read(buffer, 0, buffer.Length);
                }

                await IndexFile(buffer, "qwe", "qwe");

                return Ok();
            }
            else
            {
                return BadRequest();
            }

            
        }

        private static async Task IndexFile(byte[] video, string name, string description)
        {
            CosmosStorage cosmosClient = await new CosmosStorage().Connect();

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
            var accountAccessTokenRequestResult = await client.GetAsync($"{apiUrl}/auth/{location}/Accounts/{accountId}/AccessToken?allowEdit=true");
            var accountAccessToken = await accountAccessTokenRequestResult.Content.ReadAsStringAsync();
            accountAccessToken = accountAccessToken.Replace("\"", "");

            client.DefaultRequestHeaders.Remove("Ocp-Apim-Subscription-Key");

            // upload a video
            var content = new MultipartFormDataContent();
            Console.WriteLine("Uploading...");
            // get the video from URL
            //videoUrl = HttpUtility.UrlEncode(videoUrl); // replace with the video URL

            // as an alternative to specifying video URL, you can upload a file.
            // remove the videoUrl parameter from the query string below and add the following lines:
            //FileStream video = File.OpenRead("C:\\Users\\sean\\Documents\\Video\\20191025_210512.mp4");
            //byte[] buffer = new byte[video.Length];
            //video.Read(buffer, 0, buffer.Length);
            content.Add(new ByteArrayContent(video));
            //&videoUrl={videoUrl}
            var uploadRequestResult = await client.PostAsync($"{apiUrl}/{location}/Accounts/{accountId}/Videos?accessToken={accountAccessToken}&name={name}&description={description}&privacy=private&partition=TestPartition2", content);
            var uploadResult = await uploadRequestResult.Content.ReadAsStringAsync();

            // get the video id from the upload result
            var videoId = JsonConvert.DeserializeObject<dynamic>(uploadResult)["id"];
            Console.WriteLine("Uploaded");
            Console.WriteLine("Video ID: " + videoId);

            // obtain video access token            
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);
            var videoTokenRequestResult = await client.GetAsync($"{apiUrl}/auth/{location}/Accounts/{accountId}/Videos/{videoId}/AccessToken?allowEdit=true");
            var videoAccessToken = await videoTokenRequestResult.Content.ReadAsStringAsync();
            videoAccessToken = videoAccessToken.Replace("\"", "");

            client.DefaultRequestHeaders.Remove("Ocp-Apim-Subscription-Key");

            List<IndexedVideoResponse> videoResponses = new List<IndexedVideoResponse>();

            // wait for the video index to finish
            while (true)
            {
                Thread.Sleep(10000);

                var videoGetIndexRequestResult = client.GetAsync($"{apiUrl}/{location}/Accounts/{accountId}/Videos/{videoId}/Index?accessToken={videoAccessToken}&language=English").Result;
                var videoGetIndexResult = await videoGetIndexRequestResult.Content.ReadAsStringAsync();
                var checkResponse = JsonConvert.DeserializeObject<IndexedVideoResponse>(videoGetIndexResult);

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

                    videoResponses.Add(checkResponse);

                    break;
                }
            }

            List<string> additionalLanguages = new List<string>() { "French", "German", "Italian" };

            foreach (var lang in additionalLanguages)
            {
                var videoGetIndexRequestResult = client.GetAsync($"{apiUrl}/{location}/Accounts/{accountId}/Videos/{videoId}/Index?accessToken={videoAccessToken}&language={lang}").Result;
                var videoGetIndexResult = await videoGetIndexRequestResult.Content.ReadAsStringAsync();
                var checkResponse = JsonConvert.DeserializeObject<IndexedVideoResponse>(videoGetIndexResult);

                while (true)
                {
                    Thread.Sleep(2000);

                    var processingState = JsonConvert.DeserializeObject<dynamic>(videoGetIndexResult)["state"];

                    Console.WriteLine("Getting languages");
                    Console.WriteLine("State:");
                    Console.WriteLine(processingState);

                    // job is finished
                    if (processingState != "Uploaded" && processingState != "Processing")
                    {
                        Console.WriteLine("");
                        Console.WriteLine("Full JSON:");
                        Console.WriteLine(videoGetIndexResult);

                        videoResponses.Add(checkResponse);

                        break;
                    }
                }

            }

            // search for the video
            var searchRequestResult = await client.GetAsync($"{apiUrl}/{location}/Accounts/{accountId}/Videos/Search?accessToken={accountAccessToken}&id={videoId}");
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

            // get player widget url
            var videoPlayerUrlRequestResult = client.GetAsync($"{apiUrl}/{location}/Accounts/{accountId}/Videos/{videoId}/SourceFile/DownloadUrl?accessToken={videoAccessToken}").Result;
            var videoPlayerUrlResponse = videoPlayerUrlRequestResult.Content.ReadAsStringAsync().Result;
            Console.WriteLine("");
            Console.WriteLine("Video Captions:");
            Console.WriteLine(videoPlayerUrlResponse);

            var catalogueVideo = MapVideoResponseToCatalogueVideo(videoResponses, insightsWidgetLink.AbsolutePath, videoPlayerUrlResponse);

            await cosmosClient.StoreVideoDetails(catalogueVideo);
        }

        private static CatalogueVideo MapVideoResponseToCatalogueVideo(List<IndexedVideoResponse> responses, string widgetLink, string videoPlayerUrl)
        {
            var englishIndex = responses[0];

            var cosmosDoc = new CatalogueVideo
            {
                doctype = "catalogueVideo",
                durationInSeconds = englishIndex.durationInSeconds,
                id = englishIndex.id,
                name = englishIndex.name,
                thumbnailId = englishIndex.videos[0].thumbnailId,
                videoPlayerUrl = videoPlayerUrl,
                widgetUrl = widgetLink,
                languages = new List<string>(),
                transcription = new List<LanguageTranscription>(),
                labels = new List<LanguageLabels>()
            };

            foreach (var response in responses)
            {
                cosmosDoc.transcription.Add(new LanguageTranscription()
                {
                    languageCode = response.videos[0].language,
                    transcription = response.videos[0].insights.transcript
                });
                cosmosDoc.labels.Add(new LanguageLabels()
                {
                    languageCode = response.videos[0].language,
                    labels = response.videos[0].insights.labels
                });
                cosmosDoc.languages.Add(response.videos[0].language);
            }

            return cosmosDoc;
        }
    }
}
