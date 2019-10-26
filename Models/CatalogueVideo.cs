using System;
using System.Collections.Generic;
using System.Text;

namespace knn_hackathon.Models
{
    public class CatalogueVideo
    {
        public string name { get; set; }
        public string id { get; set; }
        public string doctype { get; set; }
        public List<Transcription> transcription { get; set; }
        public string thumbnailUrl { get; set; }
        public string widgetUrl { get; set; }
        public string videoPlayerUrl { get; set; }
        public List<VideoLabel> labels { get; set; }
        public string language { get; set; }
        public List<string> languages { get; set; }
        public int durationInSeconds { get; set; }
        public string thumbnailId { get; set; }

    }
}
